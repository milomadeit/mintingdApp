import React from 'react';
import { WalletConnectButton } from '@sei-js/react';
import GetTokens from './GetTokens';

function Inventory() {
	const contractAddress = "sei1lqsrwexmpve6ltu8pga8ss0jzvgx9r88n6ys9fedjk6dqny72h3q7myv5d"

	return (
		<div>
		  <h1>My NFT Collection</h1>
		  <WalletConnectButton />
		  <GetTokens contractAddress={contractAddress} />
		</div>
	  );
}

export default Inventory;