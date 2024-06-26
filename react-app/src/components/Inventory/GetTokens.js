import React, { useEffect, useState } from 'react';
import { useWallet } from '@sei-js/react';
import { useCosmWasmClient } from "@sei-js/react";
import './Inventory.css'

function GetTokens({contractAddress}) {
	const { cosmWasmClient } = useCosmWasmClient();
  	const { connectedWallet, accounts } = useWallet();
  	const [nfts, setNfts] = useState([]);

	  useEffect(() => {
		const fetchNFTs = async () => {
		  if (!connectedWallet || accounts.length === 0) return;
	
		  const ownerQueryMsg = {
			tokens: {
			  owner: accounts[0].address,
			},
		  };
	
		  try {
			const tokensResponse = await cosmWasmClient.queryContractSmart(contractAddress, ownerQueryMsg);
			const metadataPromises = tokensResponse.tokens.map(async token_id => {
			  const nftInfoQueryMsg = { nft_info: { token_id } };
			  const nftInfo = await cosmWasmClient.queryContractSmart(contractAddress, nftInfoQueryMsg);
			  if (nftInfo.token_uri) {
				const metadataResponse = await fetch(nftInfo.token_uri);
				const metadata = await metadataResponse.json();
				return { ...metadata, token_id };	
			  }
			  return null;
			});
	
			const nftDetails = (await Promise.all(metadataPromises)).filter(nft => nft !== null);
			setNfts(nftDetails);
		  } catch (error) {
			console.error("Error fetching NFTs:", error);
		  }
		};
	
		fetchNFTs();
	  }, [connectedWallet, accounts, cosmWasmClient, contractAddress]);
	
	  return (
		<div className='get-tokens-div'>
		  {nfts.map((nft, index) => (
			<div className='card-div' key={index}>
			  <div className='nft-div'>
				<img className='nft-img' src={nft.image} alt={nft.name} />
				<p className='nft-name'>{nft.name}</p>
			  </div>
			  <button className='opt-in-button'>REDEEM</button>
			</div>
		  ))}
		</div>
	  );
	};

export default GetTokens;