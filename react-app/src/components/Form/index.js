import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import './Form.css'
import { AddWallet } from '../../store/wallets';
import { useDispatch } from 'react-redux';

function Form() {
    const [wallet, setWallet] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [lastNFT, setLastNFT] = useState('');
    const [reason, setReason] = useState('');
    const [twitterHandle, setTwitterHandle] = useState('');
    const [error, setError] = useState({});
    const { closeModal } = useModal();
	const dispatch = useDispatch();

    // Define your secret passphrase here
    const secretPassphrase = "secret";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}) // Reset errors at the start

        // wallet check
        const bech32Regex = /^bc1[a-z0-9]{39,59}$/i;

        const form_errors = {};

        // Validate wallet address
        if (!wallet) {
            form_errors.wallet = "Please enter a wallet.";
        }

        // Validate passphrase
        // if (passphrase !== secretPassphrase) {
        //     form_errors.spell = "Incorrect 💀 Try again";
        // }

		if (!reason || reason.length < 10) form_errors.reason = "Please give a better reason"
		if (!twitterHandle) form_errors.twitter = "Please include your twitter @handle"
		if (!lastNFT) form_errors.nft = "You haven't bought any NFTs?!"

        // Check if there are any errors
        if (Object.keys(form_errors).length > 0) {
            setError(form_errors); // Set errors
            return; // Prevent form submission if there are errors
        }


        const formData = new FormData();
		formData.append('wallet', wallet);
		formData.append('twitter', twitterHandle);
		formData.append('why', reason);
		formData.append('secret', passphrase);
		formData.append('nft', lastNFT);

		try {
			const result = await dispatch(AddWallet(formData))
			if (result.ok) {
                setWallet('');
                setPassphrase('');
                setLastNFT('');
                setReason('');
                setTwitterHandle('');
                setError({});
                closeModal();
                console.log(result, 'result')

            } else {
               
                const errors = {}
                if (result.error.wallet) {errors.wallet = result.error.wallet[0]}
                if (result.error.twitter) {errors.twitter = result.error.twitter[0]}
                setError(errors)
            }
		} catch (error) {
			return error
		}
    };

    return (
        <div className='form-div'>
            <form onSubmit={handleSubmit} className="occult-form">
                <div>
                    <label>Wallet Address</label>
                    <input
                        type="text"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="BTC Wallet Address"
                        className="form-input"
                    />
                    {error.wallet && <p className="error-message">{error.wallet}</p>}
                </div>
                <div>
                    <label>Secret:</label>
                    <input
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Secret Spell"
                        className="form-input"
                    />
                    {error.spell && <p className="error-message">{error.spell}</p>}
                </div>
                <div>
                    <label>Last NFT Bought:</label>
                    <input
                        type="text"
                        value={lastNFT}
                        onChange={(e) => setLastNFT(e.target.value)}
                        placeholder="Last NFT"
                        className="form-input"
                    />
				{error.nft && <p className="error-message">{error.nft}</p>}

                </div>
                <div>
                    <label>Why You Should Be Considered:</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Your reason"
                        className="form-input"
						/>
				{error.reason && <p className="error-message">{error.reason}</p>}
                </div>
                <div>
                    <label>Twitter Handle</label>
                    <input
                        type="text"
                        value={twitterHandle}
                        onChange={(e) => setTwitterHandle(e.target.value)}
                        placeholder="@yourhandle"
                        className="form-input"
                    />
				{error.twitter && <p className="error-message">{error.twitter}</p>}
                </div>
                <button type="submit" className="submit-btn form">Submit</button>
            </form>
        </div>
    );
}

export default Form;
