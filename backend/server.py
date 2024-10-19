from flask import jsonify, request
from config import app, db
from models import Contact, Finances
import os
from werkzeug.utils import secure_filename
from datetime import date
import yfinance as yf
from prophet import Prophet
from prophet.plot import plot_plotly
import pandas as pd
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import time
from pdfminer.high_level import extract_text
from PyPDF2 import PdfReader
import statsmodels.api as sm
import re
import csv

app.config['JWT_SECRET_KEY'] = 'key'
jwt = JWTManager(app)

import os
#hi
# Configure the upload folder to be in the same directory as server.py
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'UPLOAD_FOLDER')

# Ensure the UPLOAD_FOLDER directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Route to handle file uploads
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return "No Selected file", 400
    if file:
        filename = secure_filename(file.filename)
        print("This is the file ", filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "File uploaded successfully", 200

@app.route('/get_stock', methods=["GET"])
def get_stock():
    """
    Retrieves stock data and makes prediction on future stock prices

    :param a: a stock ticker
    :param b: number of years of predicton
    :return: JSON with graph of stock prediction, the current price, and the latest prediction
    """

    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")

    stock_ticker = request.args.get('stock')
    n_years = int(request.args.get('years'))
    period = n_years * 365

    data = yf.download(stock_ticker,START, TODAY)
    data.reset_index(inplace=True)

    df_train = data[['Date','Close']]
    df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

    m = Prophet()
    m.fit(df_train)

    future = m.make_future_dataframe(periods=period)
    forecast = m.predict(future)

    fig1 = plot_plotly(m, forecast)
    graph_json = fig1.to_json()

    latest_prediction = forecast.iloc[-1]['yhat']
    stock_info = yf.Ticker(stock_ticker)
    current_price = stock_info.history(period="1d")['Close'].iloc[-1]
    response = {
        "latest_prediction": latest_prediction,
        "current_price": current_price,
        "graph": graph_json
    }
    return jsonify(response)


# Path to the transactions.csv file in the same directory as server.py
@app.route('/get_transaction_data', methods=["GET"])
def getTransactionData():
    csv_file_path = os.path.join(os.getcwd(), "transactions.csv")  # Path to transactions.csv
    print(csv_file_path)
    while not os.path.exists(csv_file_path):
        print("Waiting for the csv file")
        time.sleep(10)
    df = pd.read_csv(csv_file_path)
    groupedElements = df.groupby(["Month", "Category"])["Amount"].sum().unstack(fill_value=0).stack().reset_index(name="Amount")
    result = groupedElements.groupby("Month").apply(lambda x: x[["Category", "Amount"]].to_dict('records')).to_dict()
    return jsonify(result)

# Function to process and save financial data to CSV
@app.route("/final-submit", methods=["POST"])
def createTheCSVFile():
    dir = app.config['UPLOAD_FOLDER']
    response = {}
    for filename in os.listdir(dir):
        if filename.lower().endswith(".pdf"):
            filepath = os.path.join(dir, filename)
            pdf_text = extractTextFromPDF(filepath)
            if pdf_text:
                datePattern = r'^(\d{2}/\d{2}/\d{2})'
                dateMatches = re.findall(datePattern, pdf_text, re.MULTILINE)
                pattern = r'\$(\d{1,3}(?:,\d{3})*\.\d{2})([A-Za-z /]+)'
                matches = re.findall(pattern, pdf_text)
                if len(matches) == 0:
                    pattern = r'\$\s*(-?\d{1,3}(?:,\d{3})*\.\d{2})\s+([A-Za-z/ ]+)'
                    matches = re.findall(pattern, pdf_text)
                addMatchesToCsvFile(filename, matches, dateMatches)
                response[filename] = {
                    "amounts_categories": matches,
                    "dates": dateMatches
                }
            else:
                response[filename] = "No text extracted"
    return jsonify(response)

# Path to the CSV in the same directory
def addMatchesToCsvFile(filename, matches, dateMatches):
    dir = app.config['UPLOAD_FOLDER']
    csvFilename = "transactions.csv"
    csvFilePath = os.path.join(os.getcwd(), csvFilename)  # Same directory as server.py
    writeHeader = not os.path.exists(csvFilePath)
    with open(csvFilePath, "a", newline='') as file:
        writer = csv.writer(file)
        if writeHeader:
            writer.writerow(['Month', "Date", "Amount", "Category"])
        filename = filename[0:len(filename)-4]
        month = getMonth(filename)
        for (amount, category), date in zip(matches, dateMatches):
            if category != "Payments and Credits":
                try:
                    category = customizeCategory(category)
                    amount = float(amount.replace(',', ''))
                    writer.writerow([month, date, amount, category])
                except ValueError:
                    print(f"Skipping invalid amount: {amount}")

# Make sure the rest of your code is aligned with these paths

def addMatchesToCsvFile(filename, matches, dateMatches):
    dir = "Your path to UPLOAD_FOLDER"
    if not os.path.exists(dir):
        os.makedirs(dir)
    csvFilename = "transactions.csv"
    csvFilePath = os.path.join(dir, csvFilename)
    writeHeader = not os.path.exists(csvFilePath)
    with open(csvFilePath, "a", newline='') as file:
        writer = csv.writer(file)
        if writeHeader:
            writer.writerow(['Month', "Date", "Amount", "Category"])
        filename = filename[0:len(filename)-4]
        month = getMonth(filename)
        for (amount, category), date in zip(matches, dateMatches):
            if category != "Payments and Credits":
                try:
                    category = customizeCategory(category)
                    amount = float(amount.replace(',', ''))
                    writer.writerow([month, date, amount, category])
                except ValueError:
                    print(f"Skipping invalid amount: {amount}")

def customizeCategory(category):
    category = category.strip()
    categories = {
        "Travel/ Entertainment": "Travel/Entertainment",
        "Supermarkets": "Supermarkets",
        "Restaurants": "Restaurants",
        "Merchandise": "Merchandise",
        "Gasoline": "Gasoline",
        "Home Improvement": "Home Improvement",
        "Services": "Services"
    }
    for key, value in categories.items():
        if category.startswith(key):
            return value
    return category

@app.route("/get_predicted_data", methods=["GET"])
def getPredictedData():
    # Path to transactions.csv in the same directory as server.py
    csv_file_path = os.path.join(os.getcwd(), "transactions.csv")
    
    # Check if the file exists before proceeding
    if not os.path.exists(csv_file_path):
        return jsonify({"error": "CSV file not found"}), 404
    
    # Read the CSV file
    df = pd.read_csv(csv_file_path)
    
    # Convert categorical variable 'Category' to dummy/indicator variables
    dummies = pd.get_dummies(df['Category'])
    df = pd.concat([df, dummies], axis=1)
    
    # Drop unnecessary columns
    df.drop(['Date', 'Category', "Month"], axis=1, inplace=True)
    
    # Prepare independent variables (X) and dependent variable (y)
    X = df.drop('Amount', axis=1)
    X = sm.add_constant(X)  # Add constant for the model
    y = df['Amount']
    
    # Fit the Ordinary Least Squares (OLS) model
    model = sm.OLS(y, X).fit()
    
    # Create a dictionary for categories, initializing with 0
    catDict = {cat: 0 for cat in X.columns if cat != 'const'}
    catDict['const'] = 1
    
    predictions = {}
    
    # Loop through each category, predict the amount, and store in predictions
    for category in catDict:
        if category == 'const':
            continue
        catDict[category] = 1
        new_data = pd.DataFrame([catDict])
        predicted_amount = model.predict(new_data)
        predictions[category] = predicted_amount.iloc[0]
        catDict[category] = 0  # Reset category value for next iteration
    
    print(predictions)
    
    # Return the predictions as JSON response
    return jsonify(predictions)


def getMonth(fileName):
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for i, month in enumerate(months, 1):
        if fileName.startswith(month):
            return i
    return 12

def extractTextFromPDF(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Failed to process {pdf_path}: {str(e)}")
        return ""

@app.route("/get_contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route('/create_contact', methods=['POST'])
def create_contact():
    data = request.json
    new_contact = Contact(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        password=data['password']
    )
    if Contact.query.filter_by(email=new_contact.email).first():
        return jsonify({"message": "Email already exists"}), 400
    try:
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({"message": "User created"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.password = data.get("password", contact.password)
    db.session.commit()
    return jsonify({"message": "User updated."}), 200

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "User deleted!"}), 200

@app.route('/loginpage', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    contact = Contact.query.filter_by(email=email).first()
    if contact and contact.password == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Wrong email or password"}), 401

def csv_to_db(csv_path):
    try:
        df = pd.read_csv(csv_path)
        print("DataFrame Columns:", df.columns)
        print(df.head())
        for index, row in df.iterrows():
            new_entry = Finances(
                month=row['Month'],
                date=row['Date'],
                amount=row['Amount'],
                category=row['Category']
            )
            db.session.add(new_entry)
        db.session.commit()
        return "Data uploaded to DB"
    except Exception as e:
        db.session.rollback()
        print(e)
        return str(e)

@app.route('/process_finances', methods=['POST'])
def process_finances():
    csv_path = os.path.join(app.config['UPLOAD_FOLDER'], 'transactions.csv')
    if os.path.exists(csv_path):
        result = csv_to_db(csv_path)
        if result == "Data uploaded to DB":
            return jsonify({"message": result}), 200
        else:
            return jsonify({"error": result}), 500
    else:
        return jsonify({"error": "CSV file not found"}), 404



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)