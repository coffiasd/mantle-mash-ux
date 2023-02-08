# Algo-bridge-aggregator

## Overview

![alt ""](/public/demo/overview.png)

This is Greenhouse Hacks 3 project。 We build a front-end UI to help user transfer their assets to wherever network they want。 This project is built with wormhole bridge SDK, we originally planned to gather glitter as well。 Unfortunately, glitter's front-end sdk is not ready at this stage。 By the way, I will explain how to assemble a new bridge SDK for this project below

### how to add a new bridge SDK ?

- add new bridge sdk config in "utils/bridge_config"
  ![alt ""](/public/demo/bridges.png)
- add transfer && redeem with new SDK in "bridges"
  ![alt ""](/public/demo/SDK.png)

### document tree

```
├── LICENSE
├── README.md
├── bridges (add some new SDKs here)
├── components
├── next.config.js
├── package-lock.json
├── package.json
├── pages
├── postcss.config.js
├── public
├── services
├── styles
├── tailwind.config.js
├── utils
└── yarn.lock
```

## Flowchart

![alt ""](/public/demo/flowchart.jpg)

## Links

- demo : <https://algo-bridge-aggregator.vercel.app/>
- youtube: <https://youtu.be/nJyiXdsyfOs>

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
- wormhole
- myalgo

## Reference

- [1] tailwindcss <https://tailwindcss.com/>
- [2] dasyUi <https://daisyui.com/>
- [3] next.js <https://nextjs.org/>
- [4] ether.js <https://docs.ethers.org/v6/>
- [5] wormhole <https://wormhole.com/>
- [6] myalgo <https://wallet.myalgo.com/>

## License

SPDX short identifier: MIT
