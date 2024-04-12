#Contains the server logic and routes

from flask import jsonify, request
from config import app, db
from models import Contact
import os
from werkzeug.utils import secure_filename


# upload folder stuff
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




# new stuff - trevor

    
# Retrieve a contact
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})


# Create a contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201


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

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200


# Delete a contact
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
    