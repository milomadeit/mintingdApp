import { ethers } from 'ethers';

export const connectWallet = async (setProvider, setSigner, setAccount, setError) => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
            const network = await _provider.getNetwork();
            if (network.chainId !== 1329) {
                console.log(network.chainId);
                window.alert('Please connect to the SEI network.')
            	throw new Error('Please connect to the SEI network.');
            }
            setProvider(_provider);
            const _signer = _provider.getSigner();
            setSigner(_signer);
            const _account = await _signer.getAddress();
			window.alert(`thanks for connecting ${_account}`)
            setAccount(_account);
        } catch (error) {
            console.error('User denied account access or other error:', error);
            setError(error.message);
        }
    } else {
        console.error('No Ethereum provider found. Install MetaMask.');
        setError('No Ethereum provider found. Install MetaMask.');
    }
};