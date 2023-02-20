import '../styles/globals.css'
// switchNetwork(bssctestChain);
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/Home.module.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const mantlectestChain = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BIT',
    symbol: 'BIT',
  },
  rpcUrls: {
    default: 'https://explorer.testnet.mantle.xyz',
  },
  testnet: true,
}

const { chains, provider } = configureChains([mantlectestChain, chain.goerli, chain.localhost], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )

}

export default MyApp
