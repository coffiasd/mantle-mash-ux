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
  coalesceChainName,
  getEmitterAddressEth,
  transferFromEthNative,
  parseSequenceFromLogEth,
  redeemOnAlgorand
} from "@certusone/wormhole-sdk";

import { signSendAndConfirmAlgorand } from './utils/signSendAndConfirmAlgorand';
import { getSignedVAAWithRetry } from "./utils/getSignedVAAWithRetry";
import { BigNumber, ethers } from "ethers";

const getTokenBridgeAddressForChain = (chainId) =>
  CONTRACTS["TESTNET"][
    coalesceChainName(chainId)
  ].token_bridge || "";

const getBridgeAddressForChain = (chainId) =>
  CONTRACTS["TESTNET"][
    coalesceChainName(chainId)
  ].core || "";

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

export async function algoTransferHandle(setSignedVAAHex, amount, token, senderAddr, receiverAddr, alertService, setStage, setLoading) {
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
  setStage(2);
  setLoading("");
  alertService.info("transfer success");
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

export async function algoAssetBalance(addrs, index) {
  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );
  // const info = await algodClient.accountInformation(addrs).do();
  const info = await algodClient.accountAssetInformation(addrs, 86782447).do();
  const balance = info["asset-holding"].amount / 10 ** 8;
  return balance;
}

export async function algoRedeemHandle(signedVAA, token, sender, receiver, alertService, setStage, setLoading) {
  const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
  );

  const ALGORAND_TOKEN_BRIDGE_ID = BigInt(86525641);
  const ALGORAND_BRIDGE_ID = BigInt(86525623);

  const txs = await redeemOnAlgorand(
    algodClient,
    ALGORAND_TOKEN_BRIDGE_ID,
    ALGORAND_BRIDGE_ID,
    signedVAA,
    senderAddr
  );

  const result = await signSendAndConfirmAlgorand(algodClient, txs);
  alertService.info("redeem success");
  setLoading("");
  setStage(0);
}

export async function evmRedeemHandle(signedVAA, token, sender, receiver, alertService, setStage, setLoading, swapAmount, setToken0Balance, setToken1Balance, token0Balance, token1Balance) {
  signedVAA = hexToUint8Array(signedVAA);
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = Provider.getSigner();

  const receipt = await redeemOnEth(
    getTokenBridgeAddressForChain(2),
    signer,
    signedVAA,
    {}
  );
  alertService.info("redeem success");
  setLoading("");
  setStage(0);
  console.log(token0Balance, token1Balance, swapAmount);
  setToken0Balance(Number(token0Balance - swapAmount).toFixed(4));
  setToken1Balance(Number((+token1Balance) + (+swapAmount)).toFixed(4));
  console.log(receipt);
}

export async function evmTransferHandle(setSignedVAAHex, amount, token, sender, receiver, alertService, setStage, setLoading) {
  const baseAmountParsed = parseUnits(amount, token.decimals);
  const feeParsed = parseUnits("0", token.decimals);
  const transferAmountParsed = baseAmountParsed.add(feeParsed);
  const recipientChain = 8;
  const chainId = 2;

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = Provider.getSigner();

  const receipt = await transferFromEthNative(
    getTokenBridgeAddressForChain(chainId),
    signer,
    transferAmountParsed,
    recipientChain,
    hexToUint8Array("6a566fd052ef7275e2c0130f01a8c931e4d40f09565b1f8a42b4162ec776232f"),
    feeParsed,
    {}
  )

  const sequence = parseSequenceFromLogEth(
    receipt,
    getBridgeAddressForChain(chainId)
  );
  const emitterAddress = getEmitterAddressEth(
    getTokenBridgeAddressForChain(chainId)
  );
  const SignedVAAHex = await fetchSignedVAA(
    chainId,
    emitterAddress,
    sequence,
  );

  setSignedVAAHex(SignedVAAHex);
  setStage(2);
  setLoading("");
  alertService.info("transfer success");
}

export async function transferHandle(setSignedVAA, swapAmount, token, sender, receiver, alertService, setStage, setLoading) {
  alertService.info("starting transfer...");
  setLoading("loading");

  switch (token.name) {
    case "Algo":
      algoTransferHandle(setSignedVAA, swapAmount, token, sender, receiver, alertService, setStage, setLoading);
      break;
    case "Ether":
      evmTransferHandle(setSignedVAA, swapAmount, token, sender, receiver, alertService, setStage, setLoading);
      break;
    default:
      break;
  }
}

export async function redeemHandle(signedVAA, token, sender, receiver, alertService, setStage, setLoading, swapAmount, setToken0Balance, setToken1Balance, token0Balance, token1Balance) {
  alertService.info("starting redeem...");
  setLoading("loading");

  switch (token.name) {
    case "Algo":
      algoRedeemHandle(signedVAA, token, sender, receiver, alertService, setStage, setLoading, swapAmount, setToken0Balance, setToken1Balance, token0Balance, token1Balance);
      break;
    case "Ether":
      evmRedeemHandle(signedVAA, token, sender, receiver, alertService, setStage, setLoading, swapAmount, setToken0Balance, setToken1Balance, token0Balance, token1Balance);
      break;
    default:
      break;
  }
} 