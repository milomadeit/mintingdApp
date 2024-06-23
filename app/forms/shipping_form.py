from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import ShippingForm


def token_burned(form, field):
    # Checking if user exists
    tokenId = field.data
    tokenIdBurned = ShippingForm.query.filter(ShippingForm.tokenId == tokenId).first()
    if tokenIdBurned:
        raise ValidationError('Token Already Burned')


def address_exists(form, field):
    # Checking if username is already in use
    address = field.data
    addressExists = ShippingForm.query.filter(ShippingForm.street_address == address).first()
    if addressExists:
        raise ValidationError('Already shipping to you!')


class Shipping_Form(FlaskForm):
    recipient = StringField('recipient', validators=[DataRequired()])
    street_address = StringField(
        'address', validators=[DataRequired(), address_exists])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    tokenId = StringField('tokenId', validators=[DataRequired(), token_burned])
    isNorthAmerica = BooleanField('isNorthAmerica', validators=[DataRequired()])