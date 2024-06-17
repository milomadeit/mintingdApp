from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Form(db.Model): 
    __tablename__ = "forms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
    

    id = db.Column(db.Integer, primary_key=True)
    wallet_address = db.Column(db.String(64), nullable=False, unique=True)
    last_nft = db.Column(db.String(64))
    why = db.Column(db.String(250))
    twitter = db.Column(db.String(100))
    secret = db.String(db.String(100))


    def to_dict(self):
        return {
            'id': self.id,
            'wallet_address': self.wallet_address,
            'twitter': self.twitter
        }
    

class Token(db.Model): 
    __tablename__ = "tokens"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
    

    id = db.Column(db.Integer, primary_key=True)
    tokenDna = db.Column(db.String(64), nullable=False, unique=True)


    def to_dict(self):
        return {
            'id': self.id,
            'tokenDna': self.tokenDna,
 
        }
    
class ShippingForm(db.Model): 
    __tablename__ = "shipping_forms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
    

    id = db.Column(db.Integer, primary_key=True)
    recipient = db.Column(db.String(250), nullable=False)
    street_address = db.Column(db.String(64), nullable=False, unique=True)
    state = db.Column(db.String(64), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    tokenId = db.Column(db.Integer, nullable=False, unique=True)
    isNorthAmerica = db.Column(db.Boolean(True), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'recipient': self.recipient,
            'street_address': self.wallet_address,
            'state': self.state,
            'zipcode': self.zipcode,
            'tokenId': self.tokenId,
        }
    