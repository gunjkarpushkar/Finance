from flask import Flask, jsonify, request
from flask_cors import CORS  # If you're using CORS
from flask_sqlalchemy import SQLAlchemy #for database

import os
from werkzeug.utils import secure_filename
import sqlite3



app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

app.config['UPLOAD_FOLDER'] = 'UPLOAD_FOLDER'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])



@app.route('/upload', methods = ['POST'])
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
    
# updated create_contact code, which returns contact information from frontend
@app.route('/ceate_contact', methods = ['POST'])
def get_user_details():
    contact = request.json.get('contact')
    print("contact is:", contact)
    return jsonify({"message": "Received", "contact": contact}), 200



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

if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)
    

# need to GET contacts
    # create contacts (post)
    # update contacts (patch)
    # delete contacts (delete)