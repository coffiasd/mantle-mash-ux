import {
    ChainId,
    ChainName,
    getGovernorIsVAAEnqueued,
    getSignedVAA,
  } from "@certusone/wormhole-sdk";
//   import { WORMHOLE_RPC_HOSTS } from "./consts";

const WORMHOLE_RPC_HOSTS = ["https://wormhole-v2-testnet-api.certus.one"];
  
//   export interface GetSignedVAAWithRetryResult {
//     vaaBytes: Uint8Array | undefined;
//     isPending: boolean;
//   }
  
  export const getSignedVAAWithRetry = async (
    emitterChain,
    emitterAddress,
    sequence,
    retryAttempts
  ) => {
    let currentWormholeRpcHost = -1;
    const getNextRpcHost = () =>
      ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
    let attempts = 0;
    while (true) {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
      const results = await Promise.allSettled([
        getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence),
        getGovernorIsVAAEnqueued(rpcHost, emitterChain, emitterAddress, sequence),
      ]);
      if (results[0].status === "fulfilled") {
        return { vaaBytes: results[0].value.vaaBytes, isPending: false };
      }
      if (results[1].status === "fulfilled" && results[1].value.isEnqueued) {
        return { vaaBytes: undefined, isPending: true };
      }
      if (retryAttempts !== undefined && attempts > retryAttempts) {
        throw new Error(results[0].reason);
      }
    }
  };
  