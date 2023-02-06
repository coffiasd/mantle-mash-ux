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

import { signSendAndConfirmAlgorand } from './utils/signSendAndConfirmAlgorand';
import { getSignedVAAWithRetry } from "./utils/getSignedVAAWithRetry";
import { BigNumber, ethers } from "ethers";

const getTokenBridgeAddressForChain = (chainId) =>
  CONTRACTS["TESTNET"][
    coalesceChainName(chainId)
  ].token_bridge || "";

async function fetchSignedVAA(
  chainId,
  emitterAddress,
  sequence,
) {
  const { vaaBytes, isPending } = await getSignedVAAWithRetry(
    chainId,
    emitterAddress,
    sequence
  );
  return uint8ArrayToHex(vaaBytes)
}

export async function algoTransferHandle(setSignedVAAHex, amount, token, senderAddr, receiverAddr) {
  // const amount = '0.02';
  const decimals = token.decimals;
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
  const recipientChain = 2;
  const ALGORAND_TOKEN_BRIDGE_ID = BigInt(86525641);
  const ALGORAND_BRIDGE_ID = BigInt(86525623);

  const txs = await transferFromAlgorand(
    algodClient,
    ALGORAND_TOKEN_BRIDGE_ID,
    ALGORAND_BRIDGE_ID,
    senderAddr,
    BigInt(tokenAddress),
    transferAmountParsed.toBigInt(),
    '000000000000000000000000' + receiverAddr.substring(2, receiverAddr.length),
    recipientChain,
    feeParsed.toBigInt()
  );

  const result = await signSendAndConfirmAlgorand(algodClient, txs);
  const sequence = parseSequenceFromLogAlgorand(result);
  const emitterAddress = getEmitterAddressAlgorand(ALGORAND_TOKEN_BRIDGE_ID);
  const SignedVAAHex = await fetchSignedVAA(
    chainId,
    emitterAddress,
    sequence,
  );
  setSignedVAAHex(SignedVAAHex);
}

export async function algoBalance(addrs) {
  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );
  const info = await algodClient.accountInformation(addrs).do();
  const balance = info.amount / 10 ** 6;
  return balance;
}

export async function algoRedeemHandle(signedVAA) {
  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );
  const txs = await redeemOnAlgorand(
    algodClient,
    ALGORAND_TOKEN_BRIDGE_ID,
    ALGORAND_BRIDGE_ID,
    signedVAA,
    senderAddr
  );
  const result = await signSendAndConfirmAlgorand(algodClient, txs);
  console.log(result);
}

export async function evmRedeemHandle(signedVAA, token, sender, receiver) {
  signedVAA = hexToUint8Array(signedVAA);
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = Provider.getSigner();

  const receipt = await redeemOnEth(
    getTokenBridgeAddressForChain(2),
    signer,
    signedVAA,
    {}
  );
  console.log(receipt);
}

export async function evmTransferHandle() {
  const baseAmountParsed = parseUnits(amount, decimals);
  const feeParsed = parseUnits(relayerFee || "0", decimals);
  const transferAmountParsed = baseAmountParsed.add(feeParsed);
  const receipt = await transferFromEth(
    getTokenBridgeAddressForChain(chainId),
    signer,
    tokenAddress,
    transferAmountParsed,
    recipientChain,
    recipientAddress,
    feeParsed,
    {}
  );

  const sequence = parseSequenceFromLogEth(
    receipt,
    getBridgeAddressForChain(chainId)
  );
  const emitterAddress = getEmitterAddressEth(
    getTokenBridgeAddressForChain(chainId)
  );
  await fetchSignedVAA(
    chainId,
    emitterAddress,
    sequence,
  );
}

export async function transferHandle(setSignedVAA, swapAmount, token, sender, receiver) {
  switch (token.name) {
    case "Algo":
      algoTransferHandle(setSignedVAA, swapAmount, token, sender, receiver);
      break;
    case "Ether":
      break;
    default:
      break;
  }
}

export async function redeemHandle(signedVAA, token, sender, receiver) {
  switch (token.name) {
    case "Algo":
      break;
    case "Ether":
      evmRedeemHandle(signedVAA, token, sender, receiver);
      break;
    default:
      break;
  }
} 