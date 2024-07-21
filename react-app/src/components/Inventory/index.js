import React from 'react';

import GetTokens from './GetTokens';
import './Inventory.css'

function Inventory() {
	// const contractAddress = "sei1lqsrwexmpve6ltu8pga8ss0jzvgx9r88n6ys9fedjk6dqny72h3q7myv5d" // og
	const contractAddress = "0x4f449569F9CfD517EacBC3e3302d45970812aBb7" // ahoy

	return (
		<div>
		  <h1 className='inventory-div'>Current Inventory</h1>

		  <GetTokens contractAddress={contractAddress} />
		</div>
	  );
}

export default Inventory;