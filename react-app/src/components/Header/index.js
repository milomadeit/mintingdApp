import React, { useState } from "react";
import { useWallet } from '../../context/WalletProvider';
import './Header.css';

function Header() {
  const { signer, handleConnectWallet } = useWallet();
  const [hasNFT, setHasNFT] = useState(false);

  const handleHomeClick = () => {
    // Home button logic (if needed)
  };

  const handleWalletConnect = async () => {
    try {
      await handleConnectWallet();
      // Further actions after wallet is connected (if needed)
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <header className="header" style={{ backgroundColor: 'black', height: '60px' }}>
      <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', alignItems: 'center' }}>
        <button onClick={handleWalletConnect} className="connect-wallet-btn" aria-label="Connect Wallet">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}

export default Header;
