const  {attestFromSolana,attestFromAlgorand} =  require('@certusone/wormhole-sdk');
const {
    Account,
    Algodv2,
    assignGroupID,
    makePaymentTxnWithSuggestedParamsFromObject,
    Transaction,
    waitForConfirmation,
    parseSequenceFromLogAlgorand
  } = require("algosdk");


  const ALGO_TOKEN = {
    'X-API-key': 'gJWfuOySBlaRxSj2FaGaW1atYvehwkSg3eI0ZEqo',
  };
  const ALGOD_ADDRESS = "https://testnet-algorand.api.purestake.io/ps2";
  const ALGOD_PORT = "";
  const algodClient = new Algodv2(ALGO_TOKEN, ALGOD_ADDRESS, ALGOD_PORT);
  const TOKEN_BRIDGE_ID = BigInt(8);
  const CORE_ID = BigInt(86525641);
  const AlgoIndex = BigInt(0);
  const AmountToTransfer = BigInt(1);

async function getAccountInfo(){
    let accountInfo = await algodClient.accountInformation("NJLG7UCS55ZHLYWACMHQDKGJGHSNIDYJKZNR7CSCWQLC5R3WEMXTSCONVM").do();
    console.log(accountInfo);
}

async function signSendAndConfirmAlgorand(
    algodClient,
    txs,
    wallet
  ) {
    assignGroupID(txs.map((tx) => tx.tx));
    const signedTxns = [];
    for (const tx of txs) {
      if (tx.signer) {
        signedTxns.push(await tx.signer.signTxn(tx.tx));
      } else {
        // signedTxns.push(tx.tx.signTxn(wallet.sk));
      }
    }
    await algodClient.sendRawTransaction(signedTxns).do();
    const result = await waitForConfirmation(
      algodClient,
      txs[txs.length - 1].tx.txID(),
      4
    );
    return result;
  }


async function getTxs(){
    let txs = await attestFromAlgorand(algodClient,TOKEN_BRIDGE_ID,CORE_ID,"NJLG7UCS55ZHLYWACMHQDKGJGHSNIDYJKZNR7CSCWQLC5R3WEMXTSCONVM",AlgoIndex);
    console.log(txs);
    const result = await signSendAndConfirmAlgorand(algodClient, txs, {sk:"NJLG7UCS55ZHLYWACMHQDKGJGHSNIDYJKZNR7CSCWQLC5R3WEMXTSCONVM"});
    const sn = parseSequenceFromLogAlgorand(result);
}

// async function transfer(){
//     const hexStr = nativeToHexString(
//         await signer.getAddress(),
//         CHAIN_ID_ETH
//       );

//     const transferTxs = await transferFromAlgorand(
//         client,
//         TOKEN_BRIDGE_ID,
//         CORE_ID,
//         wallet.addr,
//         AlgoIndex,
//         BigInt(AmountToTransfer),
//         hexStr,
//         CHAIN_ID_ETH,
//         BigInt(0)
//       );
// }

// getAccountInfo();
getTxs();
// transfer();