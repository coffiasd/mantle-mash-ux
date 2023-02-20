# Algo-bridge-aggregator

## Links

- dapp demo :
- youtube:

## Overview

![alt ""](/public/overview.png)
![alt ""](/public/account.png)
This is a project build for gitcoin mantle mash hackathon。I build a front-end page with nextjs and daisyUI to display on-chain data。User have to login using like metamask wallet to show his/her transaction list。When user scroll to the end of the page we gonna request some more transaction information until the end of his/her transaction。What's more ? we track the coin price and marketcap within month by line chart。And the stat of the following index:

- ethsupply
- coinsupply
- coinprice
- totalfee

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

- [1] tailwindcss <https://tailwindcss.com/>
- [2] dasyUi <https://daisyui.com/>
- [3] next.js <https://nextjs.org/>
- [4] ether.js <https://docs.ethers.org/v6/>
- [5] wagmi <https://wagmi.sh/>

## License

SPDX short identifier: MIT
