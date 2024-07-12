import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import './redeem.css'
// import { AddWallet } from '../../store/wallets';
import { useDispatch } from 'react-redux';
import { ShippingForm } from '../../store/shipping';

function Redeem() {
	const [recipient, setRecipient] = useState('');
	const [street_address, setStreetAddress] = useState('')
	const [state, setState] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [isNorthAmerica, setIsNorthAmerica] = useState(true)
	const [tokenId, setTokenId] = useState('')
    const [error, setError] = useState({});
    const { closeModal } = useModal();
	const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}) // Reset errors at the start

        const form_errors = {};

        // Validate wallet address
        if (!recipient)form_errors.recipient = "Please enter a recipient.";
		if (!street_address)form_errors.street_address = "Please enter a street address.";
		if (!state )form_errors.state = "Please enter a state.";
		if (!zipcode )form_errors.zipcode = "Please enter a zipcode.";
		if (!tokenId)form_errors.tokenId = "Please include a tokenId.";


        // Check if there are any errors
        if (Object.keys(form_errors).length > 0) {
            setError(form_errors); // Set errors
            return; // Prevent form submission if there are errors
        }

        const formData = new FormData();
		formData.append('recipient', recipient);
		formData.append('street_address', street_address);
		formData.append('state', state);
		formData.append('zipcode', zipcode);
		formData.append('tokenId', tokenId);
		formData.append('isNorthAmerica',isNorthAmerica);

		try {
			const result = await dispatch(ShippingForm(formData))
			if (result.ok) {
                setRecipient('');
                setStreetAddress('');
                setState('');
                setZipcode('');
                setTokenId('');
				setIsNorthAmerica(true);
                setError({});
                closeModal();
    

            } else {
               
                // const errors = {}
                setError(result.errors)
            }
		} catch (error) {
			return error
		}
    };

    return (
        <div className='main-form-div'>
            <form onSubmit={handleSubmit} className="shipping-form">
			<div>
                    <label>Recipient</label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Recipient"
                        className="form-input"
                    />
                    {/* {error.spell && <p className="error-message">{error.spell}</p>} */}
                </div>
                <div>
                    <label>Mailing Address</label>
                    <input
                        type="text"
                        value={street_address}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Mailing Address"
                        className="form-input"
                    />
                    {/* {error.wallet && <p className="error-message">{error.wallet}</p>} */}
                </div>
                <div>
                    <label>State</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State/Province"
                        className="form-input"
                    />
                    {/* {error.spell && <p className="error-message">{error.spell}</p>} */}
                </div>
                <div>
                    <label>Zipcode</label>
                    <input
                        type="number"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder="zipcode"
                        className="form-input"
                    />
				{/* {error.nft && <p className="error-message">{error.nft}</p>} */}

                </div>
                <div>
                    <label>TokenID:</label>
                    <textarea
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        placeholder="TOKEN ID"
                        className="form-input"
						/>
				{/* {error.reason && <p className="error-message">{error.reason}</p>} */}
                </div>
                <div>
                    <label>Are you in North America?</label>
                    <input
                        type="boolean"
                        value={isNorthAmerica}
                        onChange={(e) => setIsNorthAmerica(e.target.value)}
                        className="form-input"
                    />
				{/* {error.twitter && <p className="error-message">{error.twitter}</p>} */}
                </div>
                <button type="submit" className="submit-btn form">Submit</button>
            </form>
        </div>
    );
}

export default Redeem;