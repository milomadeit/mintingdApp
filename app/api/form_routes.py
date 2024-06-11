from flask import Blueprint, jsonify, session, request
from app.models import db, Form
from app.forms import FormWallet

form_routes = Blueprint('forms', __name__)

@form_routes.route('/new', methods=['POST'])
def new_wallet():
	form =  FormWallet()   # Initialize form with combined data
	form['csrf_token'].data = request.cookies['csrf_token']

	if form.validate_on_submit():

		new_wallet = Form(
			wallet_address=request.form.get('wallet'),	
			last_nft=request.form.get('nft'),
			why=request.form.get('why'),
			twitter=request.form.get('twitter'),
			secret=request.form.get('secret')
		)
		db.session.add(new_wallet)
		db.session.commit()
		response_data = new_wallet.to_dict()
		print(response_data)
		return (jsonify(response_data), 200)
	if form.errors:
			return jsonify(form.errors), 401
