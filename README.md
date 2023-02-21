# Mantle Mash UX

## Links

- dapp demo : <https://mantle-mash-ux.vercel.app/>
- youtube: <https://youtu.be/JNReJNJPkyc>

## Overview

This is a project built for gitcoin mantle mash hackathon。I build a front-end page with nextjs and daisyUI to display on-chain data。User have to login using metamask wallet to show his/her transaction list。When the user scrolls to the end of the page we gonna request some more transaction information until the end of his/her transaction。What's more ? we track the coin price and marketcap within month by line chart。And the stat of the following index:

- ethsupply
- coinsupply
- currentprice
- totalfee

We use [ethereum blockies](https://github.com/ethereum/blockies) to generate identicons for Ethereum addresses。So that user could more easily check if an address he wants to interact with is the correct one。
For connect wallet we use rainbow kit and wagmi hook to make the user interact with metamask wallet process more user-friendly。

![alt ""](/public/overview.png)

![alt ""](/public/wallet.png)

### document tree

```
mantle-mash-ux
├── LICENSE             (LICENSE file)
├── README.md
├── components          (react components)
├── next.config.js      (nextjs config file)
├── node_modules
├── package-lock.json
├── package.json
├── pages                (pages)
├── postcss.config.js
├── public
├── services
├── styles
├── tailwind.config.js  (tailwindcss config file)
└── yarn.lock

```

## Install

```shell
npm install
```

```shell
npm run dev
```

```shell
npm run build
```

## Tech Stack

- tailwindcss
- dasyUi
- next.js
- ether.js
- wagmi

## Reference

- [1] mantle-api <https://explorer.testnet.mantle.xyz/>
- [1] tailwindcss <https://tailwindcss.com/>
- [2] dasyUi <https://daisyui.com/>
- [3] next.js <https://nextjs.org/>
- [4] ether.js <https://docs.ethers.org/v6/>
- [5] wagmi <https://wagmi.sh/>
- [6] ethereum-blockies <https://www.npmjs.com/package/ethereum-blockies>
- [7] rainbowKit <https://www.rainbowkit.com/>

## License

SPDX short identifier: MIT
