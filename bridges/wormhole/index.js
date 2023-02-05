import algosdk from "algosdk";
// import { useDispatch, useSelector } from "react-redux";
import { parseUnits, zeroPad } from "ethers/lib/utils";
import {
  getEmitterAddressAlgorand,
  parseSequenceFromLogAlgorand,
  transferFromAlgorand,
  uint8ArrayToHex,
  hexToUint8Array,
  redeemOnEth,
  CONTRACTS,
  coalesceChainName
} from "@certusone/wormhole-sdk";

import {signSendAndConfirmAlgorand} from './utils/signSendAndConfirmAlgorand';
import { getSignedVAAWithRetry } from "./utils/getSignedVAAWithRetry";
import { ethers } from "ethers";

const getTokenBridgeAddressForChain = (chainId) =>
  CONTRACTS["TESTNET"][
    coalesceChainName(chainId)
  ].token_bridge || "";

  async function fetchSignedVAA(
    chainId,
    emitterAddress,
    sequence,
  ) {
    console.log("fetchSignedVAA...");
    const { vaaBytes, isPending } = await getSignedVAAWithRetry(
      chainId,
      emitterAddress,
      sequence
    );
    console.log("fetchSignedVAA done...");
    // console.log(vaaBytes,isPending);
    console.log(uint8ArrayToHex(vaaBytes));
    return uint8ArrayToHex(vaaBytes)
    // if (vaaBytes !== undefined) {
    //   dispatch(setSignedVAAHex(uint8ArrayToHex(vaaBytes)));
    //   dispatch(setIsVAAPending(false));
    //   enqueueSnackbar(null, {
    //     content: <Alert severity="success">Fetched Signed VAA</Alert>,
    //   });
    // } else if (isPending) {
    //   dispatch(setIsVAAPending(isPending));
    //   enqueueSnackbar(null, {
    //     content: <Alert severity="warning">VAA is Pending</Alert>,
    //   });
    // } else {
    //   throw new Error("Error retrieving VAA info");
    // }
  }

  export async function AlgoTransfer(setSignedVAAHex){
    // const dispatch = useDispatch();
    const amount = '0.02';
    const decimals = 6;
    const baseAmountParsed = parseUnits(amount, decimals);
    const feeParsed = parseUnits("0", decimals);
    const transferAmountParsed = baseAmountParsed.add(feeParsed);
    const algodClient = new algosdk.Algodv2(
      "",
      "https://testnet-api.algonode.cloud",
      ""
    );
    
    const chainId = 8;
    const tokenAddress = '0';
    //ayden address.
    const senderAddr = 'NJLG7UCS55ZHLYWACMHQDKGJGHSNIDYJKZNR7CSCWQLC5R3WEMXTSCONVM';
    const recipientChain = 2;
    const ALGORAND_TOKEN_BRIDGE_ID = BigInt(86525641);

    const txs = await transferFromAlgorand(
      algodClient,
      BigInt(86525641),
      BigInt(86525623),
      senderAddr,
      BigInt(tokenAddress),
      transferAmountParsed.toBigInt(),
      '00000000000000000000000052bf58425cad0b50ffca8dbe5447dce9420a2610',
      recipientChain,
      feeParsed.toBigInt()
    );
    console.log(algodClient);
    console.log(BigInt(86525641),
    BigInt(86525623),
    senderAddr,
    BigInt(tokenAddress),
    transferAmountParsed.toBigInt(),
    '00000000000000000000000052bf58425cad0b50ffca8dbe5447dce9420a2610',
    recipientChain,
    feeParsed.toBigInt());
    const result = await signSendAndConfirmAlgorand(algodClient, txs);
    const sequence = parseSequenceFromLogAlgorand(result);
    const emitterAddress = getEmitterAddressAlgorand(ALGORAND_TOKEN_BRIDGE_ID);
    console.log("emitterAddress:",emitterAddress);
    const SignedVAAHex = await fetchSignedVAA(
      chainId,
      emitterAddress,
      sequence,
    );
    // return SignedVAAHex;
    setSignedVAAHex(SignedVAAHex);
  }

  export async function ETHRedeemHandle(signedVAA){
    signedVAA = hexToUint8Array(signedVAA);
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = Provider.getSigner();

    const receipt =  await redeemOnEth(
          getTokenBridgeAddressForChain(2),
          signer,
          signedVAA,
          {}
    );
    console.log(receipt);
  }