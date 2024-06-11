const ADD_WALLET = 'wallets/ADD_WALLET'

export const AddWallet = (signup) => async (dispatch) => {
	const response = await fetch(`/api/new`, {
		method: 'POST',
		body: signup
	});

	if (response.ok) {
		const user_data = await response.json();
		return { ok: true, data: user_data };
	} else {
		const error = await response.json();
		return {ok: false, error: error}
	}

}