from flask import Blueprint, jsonify, session, request
from app.models import db, ShippingForm
from app.forms import Shipping_Form

shipping_form_routes = Blueprint('forms', __name__)

@shipping_form_routes.route('/new', methods=['POST'])
def new_address():
	shipping_form =  Shipping_Form()   # Initialize form with combined data
	shipping_form['csrf_token'].data = request.cookies['csrf_token']

	if shipping_form.validate_on_submit():

		new_shipping_form = ShippingForm(
			recipient=request.recipient,
			street_address=request.form.get('address'),
			state=request.state,
			zipcode=request.zipcode,
			tokenId=request.tokenId,
			isNorthAmerica=request.isNorthAmerica,
		)
		db.session.add(new_shipping_form)
		db.session.commit()
		response_data = new_shipping_form.to_dict()
		print(response_data)
		return (jsonify(response_data), 200)
	if shipping_form.errors:
			return jsonify(shipping_form.errors), 401



@shipping_form_routes.route('/all_addresses', methods=['POST'])
def all_addresses():
	all_addresses = ShippingForm.query.all()

	if not all_addresses:
		return jsonify({"error": "no addresses"})

# may have to iterate through list first
	return jsonify(all_addresses)