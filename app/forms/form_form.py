from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Form

    
def wallet_exists(form, field):
    # Checking if user exists
    wallet = field.data
    user = Form.query.filter(Form.wallet_address == wallet).first()
    if user:
        raise ValidationError('Wallet address is already in use.')

def twitter_exists(form, field):
    # Checking if user exists
    twitter = field.data
    user = Form.query.filter(Form.twitter == twitter).first()
    if user:
        raise ValidationError('Twitter is already in use.')

class FormWallet(FlaskForm):
    wallet = StringField('wallet', validators=[DataRequired(), wallet_exists])
    twitter = StringField('twitter', validators=[twitter_exists])
    nft = StringField('nft')
    why = StringField('why')
    secret = StringField('secret')
    