const { GlitterBridgeSDK, BridgeNetworks, GlitterNetworks } = require('glitter-bridge-sdk');

export default async function handler(req, res) {
    const { network, address } = req.require;

    const sdk = new GlitterBridgeSDK()
        .setEnvironment(GlitterNetworks.testnet)
        .connect([BridgeNetworks.algorand, BridgeNetworks.solana])
    const balance = sdk.algorand.getBalance('NJLG7UCS55ZHLYWACMHQDKGJGHSNIDYJKZNR7CSCWQLC5R3WEMXTSCONVM');
    console.log(await balance);
    res.status(200).json({ name: 'glitter' })
}
