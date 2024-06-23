const ADD_SHIPPING_FORM = 'shipping/ADD_SHIPPING_FORM'

export const ShippingForm = (form) => async (dispatch) => {
	const response = await fetch(`/api/shipping/redeem`, {
		method: 'POST',
		body: form
	});

	if (response.ok) {
		const user_data = await response.json();
		return { ok: true, data: user_data };
	} else {
		const error = await response.json();
		return {ok: false, error: error}
	}

}