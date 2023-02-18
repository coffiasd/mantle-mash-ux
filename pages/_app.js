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

// const bssctestChain = {
//   id: 97,
//   name: 'BSC Testnet',
//   network: 'BSC Testnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'tBNB',
//     symbol: 'tBNB',
//   },
//   rpcUrls: {
//     default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://testnet.bscscan.com' },
//   },
//   testnet: true,
// }

const { chains, provider } = configureChains([chain.goerli, chain.polygonMumbai, chain.localhost], [publicProvider()])
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
