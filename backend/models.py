#Contains SQLAlchemy model definitions

from config import db

class Contact(db.Model):
    """
    Represents a specific contact with personal details in the database.

    Attributes:
        id (int): The primary key.
        first_name (str): The first name.
        last_name (str): The last name.
        email (str): The contact's email address.
        password (str): The contact's password.
    """
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)    #email will act as username
    password = db.Column(db.String(15), unique=False, nullable=False)


    def to_json(self):
        """
        Converts the contact to JSON.

        Returns:
            dict: A dictionary containing all the contact info.
        """
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "password": self.password,
        }


class Finances(db.Model):
    """
    Financial records associated with a contact.

    Attributes:
        id (int): The primary key.
        month (str): The month of the record.
        date (str): The date of the transaction.
        amount (float): The amount of the transaction.
        category (str): The category of the transaction.
    """
    id = db.Column(db.Integer, primary_key=True)
    # contact_id = db.Column(db.Integer, db.ForeignKey('contact.id'), nullable=False)
    month = db.Column(db.String(2), nullable=False)
    date = db.Column(db.String(8), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)

    #one to many (one contact linked to many finances)
    #contact = db.relationship('Contact', backref=db.backref('finances', lazy=True))

    def to_json(self):
        return {
            "id": self.id,
         #   "contact_id": self.contact_id,
            "Month": self.month,
            "Date": self.date,
            "Amount": self.amount,
            "Category": self.category,
        }
    
    