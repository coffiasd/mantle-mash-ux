import { useAccount } from 'wagmi'
import Blockies from 'react-blockies';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { IoIosCopy } from "react-icons/io";

export default function Account() {
    let { address, isConnected } = useAccount()
    const [balance, setBalance] = useState(0);
    const [tokenNumber, setTokenNumber] = useState(0);
    const [blocks, setBlocks] = useState(0);
    //fetching user profile.

    //?module=account&action=balance&address={addressHash}
    //?module=account&action=tokentx&address={addressHash}
    //?module=account&action=getminedblocks&address={addressHash}
    //?module=account&action=tokenlist&address={addressHash}
    address = "0x69C2f5947A2FF61B8814A74940470C4fe6AB9931";

    useEffect(() => {
        if (!address) {
            return
        }

        fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=balance&address=` + address)
            .then((res) => res.json())
            .then((data) => {
                if (data.message == 'OK') {
                    setBalance(parseInt(ethers.utils.formatEther(data.result)));
                }
                // setEthsupply(parseInt(ethers.utils.formatEther(data.result)));
            })

        fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=getminedblocks&address=` + address)
            .then((res) => res.json())
            .then((data) => {
                console.log("tokentx", data);
                if (data.message == 'OK') {
                    setBlocks(data.result.length);
                }
            });

        fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=tokenlist&address=` + address)
            .then((res) => res.json())
            .then((data) => {
                console.log("tokenlist:", data);
                if (data.message == 'OK') {
                    setTokenNumber(data.result.length);
                }
            });

        // fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=totalfees&date=2023-02-17`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //     });
    }, [address])


    return (
        <>
            <div className="w-full lg:w-5/6 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 flex justify-center">
                                <div className="flex relative mt-3">
                                    <Blockies color='#dfe' bgcolor='#aaa' seed={address} size={30} scale={3} />
                                </div>

                                <div className='flex'>
                                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                    </h3>
                                </div>

                            </div>
                            <div className="w-full px-4 text-center mt-5">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            {balance}(BIT)
                                        </span>
                                        <span className="text-sm text-blueGray-400">Balance</span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            {tokenNumber}
                                        </span>
                                        <span className="text-sm text-blueGray-400">Tokens</span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            {blocks}
                                        </span>
                                        <span className="text-sm text-blueGray-400">Mint Blocks</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                {address}
                            </h3>
                            {/* 
                            <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                Solution Manager - Creative Tim Officer
                            </div>
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                University of Computer Science
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}