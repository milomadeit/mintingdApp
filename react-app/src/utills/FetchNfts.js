const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

const rpcEndpoint = 'https://sei-m.rpc.n0ok.net/';
const contractAddress =  "sei1v5zq9ryh4ukgfa4cyaelg8ze22tfcjdr65chkhjevg75ymrua7ss76qmfh";

export default async function FetchNFTs(account) {
    try {
        const client = await CosmWasmClient.connect(rpcEndpoint);
        const TokenId = "1";
        
        const result = await client.queryContractSmart(contractAddress, { balance_of: { token_id: TokenId, "owner": account } });
        const balance = result.balance;

        if (balance === "1") {
            const resultTokenInfo = await client.queryContractSmart(contractAddress, {
                "token_info": {
                    "token_id": TokenId
                }
            });

            const metadataResponse = await fetch(resultTokenInfo.token_uri);
            if (!metadataResponse.ok) {
                throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`);
            }

            const metadata = await metadataResponse.json();
            return metadata;
        } else {
            return {"error": "you do not own any yrrrrr-beaters"};
        }
    } catch (error) {
        console.error("Error fetching NFT metadata:", error);
        return {"error": error.message};
    }
}


