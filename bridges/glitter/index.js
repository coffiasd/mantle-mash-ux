import React from 'react'
const { GlitterBridgeSDK, BridgeNetworks, GlitterNetworks } = require('glitter-bridge-sdk');

export function Glitter({ data }) {
    console.log(data);

    return (
        <>
            Balance:12111
        </>
    )
}

export async function getServerSideProps(context) {
    const data = new GlitterBridgeSDK()
        .setEnvironment(GlitterNetworks.testnet)
        .connect([BridgeNetworks.algorand, BridgeNetworks.solana])

    return {
        props: { data }, // will be passed to the page component as props
    }
}