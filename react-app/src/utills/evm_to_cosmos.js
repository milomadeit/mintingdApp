export default async function GetCosmosAddress(wallet) {
    try {
        console.log(`getting cosmos address for wallet: ${wallet}`);
        const request = await fetch(`https://v2.seipex.fi/convert-address?address=${wallet}`);
        const data = await request.json();

        console.log(`data: ${JSON.stringify(data)}`);
        if (typeof (data.addresses) !== 'undefined') {
            const sei_wallet = data.addresses.cosmos;
            return sei_wallet;
        }
        
        console.log('No cosmos address found');
        return data;
    } catch (error) {
        console.log(error);
    }
}
