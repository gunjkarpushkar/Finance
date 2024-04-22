from flask import jsonify, request
from config import app, db
from models import Contact, Finances
import os
from werkzeug.utils import secure_filename
#import sqlite3
from datetime import date
import yfinance as yf
from prophet import Prophet
from prophet.plot import plot_plotly
import pandas as pd
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app.config['JWT_SECRET_KEY'] = 'heyyy'
jwt = JWTManager(app)

# upload folder stuff
app.config['UPLOAD_FOLDER'] = 'UPLOAD_FOLDER'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

#@app.route('/upload', methods = ['POST'])
#def upload_file():
#    if 'file' not in request.files:
#        return 'No file part', 400
#    file = request.files['file']
#    if file.filename == '':
#        return "No Selected file", 400
#    if file:
#        filename = secure_filename(file.filename)
#        print("This is the file ", filename)
#        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#        return "File uploaded successfully", 200
    
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        try:
            # Read the CSV file
            df = pd.read_csv(filepath)
            # Insert each row into the Finances table
            for index, row in df.iterrows():
                new_entry = Finances(
                    contact_id=row['contact_id'],
                    month=row['month'],
                    day=row['day'],
                    amount=row['amount'],
                    category=row['category']
                )
                db.session.add(new_entry)
            db.session.commit()
            return "Data uploaded and inserted successfully", 200
        except Exception as e:
            db.session.rollback()
            return str(e), 500

    return "File uploaded successfully", 200


    



# def get_data():
    # data = {"message": "Hello from the Python backend!"}
    # return jsonify(data)

@app.route('/message', methods=['GET', 'POST'])
def get_data():
    if request.method == "GET":
        return jsonify({"message": ["Member 1", "Member2", "Member3"]}), 200
        #return {"message": "Member1, Member2, Member3"}

    elif request.method == "POST":
        name = request.json.get('name')
        print("name is:", name)
        return jsonify({"message": "Received", "name": name}), 200
    

@app.route('/get_stock', methods=["GET"])
def get_stock():
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



@app.route('/get_transaction_data', methods=["GET"])
def getTransationData():
    
    df = pd.read_csv("/Users/trevorschool/Desktop/SDFINAL/03-ai-finance-assistant/backend/UPLOAD_FOLDER/transactions.csv")
    groupedElements = df.groupby(["Month", "Category"])["Amount"].sum().unstack(fill_value=0).stack().reset_index(name="Amount")
    result = groupedElements.groupby("Month").apply(lambda x: x[["Category", "Amount"]].to_dict('records')).to_dict()
    
    return jsonify(result)


@app.route("/get_income", methods=["POST"])

def getUserIncome():
    data = request.get_json()
    print("Income:", data['income'])
    print("Period:", data['period'])
    return jsonify({"status": "success", "message": "Income received"}), 200
    

   
# Retrieve a contact
@app.route("/get_contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})






# Create a contact
@app.route('/create_contact', methods=['POST'])
def create_contact():
    data = request.json
    new_contact = Contact(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        password=data['password']
    )

    # Check if the email already exists
    if Contact.query.filter_by(email=new_contact.email).first():
        return jsonify({"message": "Email already exists"}), 400

    try:
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({"message": "User created!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400



# Update a contact
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


# Delete a contact
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



@app.route('/stocks', methods=['GET'])
@jwt_required()
def stock_page():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/finances', methods=['GET'])
def get_finances():
    finances = Finances.query.all()
    result = [{'id': finance.id, 'contact_id': finance.contact_id, 'month': finance.month, 'day': finance.day, 'amount': finance.amount, 'category': finance.category} for finance in finances]
    return jsonify(result)




if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
    
