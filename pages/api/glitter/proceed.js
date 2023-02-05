const { GlitterBridgeSDK, BridgeNetworks, GlitterNetworks } = require('glitter-bridge-sdk');

export default async function handler(req, res) {
    const { network, address } = req.query;
    // if (network == undefined || address == undefined) {
    //     return res.status(200).json({ code: 1, msg: 'params invalid' })
    // }

    // init sdk
    const sdk = new GlitterBridgeSDK()
        .setEnvironment(GlitterNetworks.testnet)
        .connect([BridgeNetworks.algorand, BridgeNetworks.solana])

    var balance = 0;

    switch (network) {
        case "ALGO":
            console.log(sdk.algorandAccount);
            // await sdk.algorand.optinToken(algorandAccount, "xSOL");
            // await algorand.waitForBalanceChange(algorandAccount.addr, startingBalance);
            break;
        case "SOL":
            balance = await sdk.solana.getBalance(address);
            break;
        default:
            balance = undefined;

    }

    res.status(200).json({ code: 0, data: balance, msg: '' })
}
