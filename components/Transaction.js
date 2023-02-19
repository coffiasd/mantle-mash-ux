import { useState, useEffect } from 'react';
import Blockies from 'react-blockies';
import { ethers } from 'ethers';
import { Bars } from 'react-loading-icons'
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { TiInfo } from "react-icons/ti";
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

export default function Transactions() {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [isend, setIsend] = useState(false);

    let { address, isConnected } = useAccount()

    //testnet set a specicfic address.
    address = "0x69C2f5947A2FF61B8814A74940470C4fe6AB9931";

    useEffect(() => {
        fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=` + address)
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data.result);
            })
    }, [address])

    const getFunc = (input) => {
        return input.slice(0, 10);
    }

    const hideAddress = (address) => {
        return address.substring(0, 20) + "...." + address.slice(-20)
    }

    const calValue = (v) => {
        return parseInt(ethers.utils.formatEther(v));
    }

    const handleScroll = (e) => {
        if (isend) {
            return
        }
        setLoading(true);
        //fetching data...
        fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=` + address + `&page` + page)
            .then((res) => res.json())
            .then((data) => {
                let currentPage = page + 1;
                let tmp = transactions;
                tmp.push(...data.result);
                setTransactions(tmp);
                setPage(currentPage);
                //test set end.
                console.log("currentPage:", currentPage);
                if (currentPage == 3) {
                    setIsend(true);
                }
            }).finally(() => {
                console.log("currentPage:", page);
                setLoading(false);
            })
    }

    const calTime = (t) => {
        const now = Date.parse(new Date()) / 1000;
        const diff = now - t;
        const min = parseInt(diff / 60);
        if (min <= 0) {
            return "0 minutes ago";
        } else {
            if (min < 60) {
                //minutes
                return min + ' minutes ago';
            } else if (min > 60 && min < 24 * 60) {
                //hours
                return parseInt(min / 60) + ' hours ago';
            } else {
                //days
                return parseInt(min / 3600) + ' days ago';
            }
        }
    }

    return (
        <div className="w-5/6 m-auto rounded-2xl my-6">

            <BottomScrollListener onBottom={handleScroll} />

            {!isConnected ? (<div className='p-5 border border-gray-100 rounded-lg bg-gray-50 '>
                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Result">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Private Note:</div>
                    <div className="flex">To access the Private Note feature, you must be <span className='text-cyan-600 mx-2 cursor-pointer'>Logged in</span></div>
                </div>
            </div>)
                : (<div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="text-lg text-gray-900 dark:text-white">Transaction Timeline</div>

                    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                        {transactions.map((item, key) => (
                            <li key={key}>
                                <div className="items-center flex flex-row p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700 h-24">
                                    <div className="flex-1">
                                        <div className="badge badge-warning  gap-2">
                                            info
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        from
                                        <div className='flex'>
                                            <Blockies color='#dfe' bgcolor='#aaa' seed={item.from} size={15} scale={3} />
                                        </div>
                                    </div>


                                    <div className="flex-1">
                                        to
                                        <div className='flex'>
                                            <Blockies color='#dfe' bgcolor='#aaa' seed={item.to} size={15} scale={3} />
                                        </div>
                                    </div>

                                    <div className='flex-1 flex-col'>

                                        <div className="flex badge badge-outline my-1">Value:{calValue(item.value)} BIT</div>
                                        <div className="flex badge badge-outline my-1">Cost:{item.gasUsed} Gas</div>
                                        <div className="flex badge badge-outline">Method:{getFunc(item.input)}</div>
                                    </div>

                                    <div className="flex flex-auto">
                                        <div className="flex flex-col text-sm font-light m-auto">
                                            <a className='link cursor-pointer' href={'/transaction?txhash=' + item.hash}>{hideAddress(item.hash)}</a>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="flex flex-col">
                                            <div className="">
                                                #{item.blockNumber}
                                            </div>
                                            <div className="font-light text-xs">
                                                {calTime(item.timeStamp)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    {
                        loading && (<div className='flex flex-col'>
                            <div className='flex m-auto'>
                                <Bars stroke="transparent" fill="#06bcee" height='3em' />
                            </div>
                            <div className='flex m-auto'>
                                loading...
                            </div>
                        </div>)
                    }
                </div >)
            }

            {isend && <div className="divider">I'm a the end of the world!!</div>}
        </div >
    )
}