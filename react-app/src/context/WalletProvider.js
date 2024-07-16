import React, { createContext, useContext, useState } from 'react';
import { connectWallet } from '../utills/ConnectWallet';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    const handleConnectWallet = () => connectWallet(setProvider, setSigner, setAccount, setError);

    return (
        <WalletContext.Provider value={{ provider, signer, account, error, handleConnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
