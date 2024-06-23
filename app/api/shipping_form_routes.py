from flask import Blueprint, jsonify, session, request
from app.models import db, ShippingForm
from app.forms import Shipping_Form

shipping_form_routes = Blueprint('shipping', __name__)

@shipping_form_routes.route('/redeem', methods=['POST'])
def new_address():
	shipping_form =  Shipping_Form()   # Initialize form with combined data
	shipping_form['csrf_token'].data = request.cookies['csrf_token']

	isNA = ""

	if shipping_form.validate_on_submit():
		if request.form.get('isNorthAmerica') == "true":
			isNA = True
		else:
			isNA = False

		new_shipping_form = ShippingForm(
			recipient=request.form.get('recipient'),
			street_address=request.form.get('street_address'),
			state=request.form.get('state'),
			zipcode=request.form.get('zipcode'),
			tokenId=request.form.get('tokenId'),
			isNorthAmerica=isNA,
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