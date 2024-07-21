import React, { useState } from 'react';
import './redeem.css';
import { useDispatch } from 'react-redux';
import { ShippingForm } from '../../store/shipping';
import { useWallet } from '../../context/WalletProvider';
import { ethers } from 'ethers';
function Redeem() {
    const [recipient, setRecipient] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [isNorthAmerica, setIsNorthAmerica] = useState(true);
    const [tokenId, setTokenId] = useState('');
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const { signer, handleConnectWallet } = useWallet();

    // const handleBurnNFT = async () => {
    //     if (!signer) {
    //         setError({ burn: 'Please connect your wallet first.' });
    //         return;
    //     }
    //     const contract = new ethers.Contract(yourNFTContractAddress, yourNFTContractABI, signer);
    //     try {
    //         const tx = await contract.burn(tokenId);
    //         await tx.wait(); 
    //         console.log("NFT burned successfully");
    //     } catch (error) {
    //         console.error("Error burning NFT", error);
    //         setError({ burn: "Failed to burn NFT. Please try again." });
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); 

        const form_errors = {};

      
        if (!recipient) form_errors.recipient = "Please enter a recipient.";
        if (!street_address) form_errors.street_address = "Please enter a street address.";
        if (!state) form_errors.state = "Please enter a state.";
        if (!zipcode) form_errors.zipcode = "Please enter a zipcode.";
        if (!tokenId) form_errors.tokenId = "Please include a tokenId.";

   
        if (Object.keys(form_errors).length > 0) {
            setError(form_errors); 
            return; 
        }

        try {
            // await handleBurnNFT();

            const formData = new FormData();
            formData.append('recipient', recipient);
            formData.append('street_address', street_address);
            formData.append('state', state);
            formData.append('zipcode', zipcode);
            formData.append('tokenId', tokenId);
            formData.append('isNorthAmerica', isNorthAmerica);

            const result = await dispatch(ShippingForm(formData));
            if (result.ok) {
                setRecipient('');
                setStreetAddress('');
                setState('');
                setZipcode('');
                setTokenId('');
                setIsNorthAmerica(true);
                setError({});
                // closeModal();
                new alert('submitted form!')
            } else {
                setError(result.errors);
            }
        } catch (error) {
            console.error("Error in handleSubmit", error);
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
                    {error?.recipient && <p className="error-message">{error.recipient}</p>}
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
                    {error.street_address && <p className="error-message">{error.street_address}</p>}
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
                    {error.state && <p className="error-message">{error.state}</p>}
                </div>
                <div>
                    <label>Zipcode</label>
                    <input
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder="Zipcode"
                        className="form-input"
                    />
                    {error.zipcode && <p className="error-message">{error.zipcode}</p>}
                </div>
                <div>
                    <label>TokenID</label>
                    <input
                        type="text"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        placeholder="Token ID"
                        className="form-input"
                    />
                    {error.tokenId && <p className="error-message">{error.tokenId}</p>}
                </div>
                <div>
                    <label>Are you in North America?</label>
                    <input
                        type="checkbox"
                        checked={isNorthAmerica}
                        onChange={(e) => setIsNorthAmerica(e.target.checked)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit">Burn to Confirm</button>
                {error.burn && <p className="error-message">{error.burn}</p>}
            </form>
          
        </div>
    );
}

export default Redeem;
