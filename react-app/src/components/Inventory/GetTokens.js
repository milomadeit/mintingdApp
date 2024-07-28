import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './Inventory.css';
import loading from './loading.gif';
import GetCosmosAddress from '../../utills/evm_to_cosmos';
import FetchNFTs from '../../utills/FetchNfts';

function GetTokens({ contractAddress }) {
    const [nfts, setNfts] = useState([]);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [loadingGif, setLoadingGif] = useState(true);
    const [cosmosAddress, setCosmosAddress] = useState("");
    const [yrrrrrBeaterInfo, setYrrrrrBeaterInfo] = useState({});

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
                const network = await _provider.getNetwork();
                if (network.chainId !== 1329) {
                    window.alert('Please connect to the SEI network.');
                    throw new Error('Please connect to the SEI network.');
                }
                setProvider(_provider);
                const _signer = _provider.getSigner();
                setSigner(_signer);
                const _account = await _signer.getAddress();
                setAccount(_account);

                console.log(`Ethereum account: ${_account}`);
                const cosmos = await GetCosmosAddress(_account);
                setCosmosAddress(cosmos);
                console.log(`Cosmos address: ${cosmos}`);

            } catch (error) {
                console.error('User denied account access or other error:', error);
                setError(error.message);
            }
        } else {
            console.error('No Ethereum provider found. Install MetaMask.');
            setError('No Ethereum provider found. Install MetaMask.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (cosmosAddress) {
                const NFTInfo = await FetchNFTs(cosmosAddress);
                setYrrrrrBeaterInfo(NFTInfo);
                setLoadingGif(false); 
            }
        };

        fetchData();
    }, [cosmosAddress]);

    return (
        <div className="get-tokens-div">
            {!account ? (
                <button onClick={connectWallet} className="connect-wallet-button">
                    Connect Wallet
                </button>
            ) : (
                <>
                    <h2>Connected Account: {account}, {cosmosAddress}</h2>
                    {error && <p className="error-message">Error: {error}</p>}
                    {loadingGif ? (
                        <div className="loading-div">
                            <img className='loading' src={loading} alt="Loading" />
                        </div>
                    ) : (
                        yrrrrrBeaterInfo && !yrrrrrBeaterInfo.error ? (
                            <div className="card-div">
                                <div className="nft-div">
                                    <img className="nft-img" src={yrrrrrBeaterInfo?.image} alt={yrrrrrBeaterInfo?.name} />
                                    <p className="nft-name">{yrrrrrBeaterInfo?.name}</p>
                                    <p className="nft-description">{yrrrrrBeaterInfo?.description}</p>
                                    {yrrrrrBeaterInfo?.external_url && (
                                        <a href={yrrrrrBeaterInfo?.external_url} target="_blank" rel="noopener noreferrer" className="nft-external-url">
                                            View on Market
                                        </a>
                                    )}
                                    {yrrrrrBeaterInfo?.attributes && yrrrrrBeaterInfo?.attributes.map((attr, idx) => (
                                        <p key={idx} className="nft-attribute">{attr.trait_type}: {attr.value}</p>
                                    ))}
                                <button className="opt-in-button">REDEEM</button>
                                </div>
                            </div>
                        ) : (
                            <p>{yrrrrrBeaterInfo.error || "No NFTs found in your wallet."}</p>
                        )
                    )}
                </>
            )}
        </div>
    );
}

export default GetTokens;
