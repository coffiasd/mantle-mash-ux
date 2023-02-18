import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function Block() {
    const [ethsupply, setEthsupply] = useState(0);
    const [coinsupply, setCoinsupply] = useState(0);
    const [ethsupplyexchange, setEthsupplyexchange] = useState(0);
    const [totalfees, setTotalfees] = useState(false)

    useEffect(() => {
        const ethsupply = fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=ethsupply`)
            .then((res) => res.json())
            .then((data) => {
                setEthsupply(parseInt(ethers.utils.formatEther(data.result)));
            })

        const coinsupply = fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=coinsupply`)
            .then((res) => res.text())
            .then((data) => {
                setCoinsupply(parseInt(data));
            });

        const ethsupplyexchange = fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=ethsupplyexchange`)
            .then((res) => res.json())
            .then((data) => {
                setEthsupplyexchange(parseInt(ethers.utils.formatEther(data.result)));
            });

        const totalfees = fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=totalfees&date=2023-02-17`)
            .then((res) => res.json())
            .then((data) => {
                setTotalfees(parseInt(data.result));
            });

    }, [])

    return (
        <div className="bg-secondary w-5/6 m-auto rounded-2xl mt-6">
            <div className="stats w-full rounded-2xl h-52 text-center">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">ethsupply</div>
                    <div className="stat-value">
                        <CountUp
                            start={0}
                            end={ethsupply}
                            duration={2}
                            separator=","
                            decimals={0}
                            decimal=","
                        /></div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">coinsupply</div>
                    <div className="stat-value">
                        <CountUp
                            start={0}
                            end={coinsupply}
                            duration={2}
                            separator=","
                            decimals={0}
                            decimal=","
                        /></div>
                    <div className="stat-desc">21% more than last month</div>
                </div>


                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">ethsupplyexchange</div>
                    <div className="stat-value">
                        <CountUp
                            start={0}
                            end={ethsupplyexchange}
                            duration={2}
                            separator=","
                            decimals={0}
                            decimal=","
                        />
                    </div>
                    <div className="stat-desc">21% more than last month</div>
                </div>


                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">totalfees</div>
                    <div className="stat-value">
                        <CountUp
                            start={0}
                            end={totalfees}
                            duration={2}
                            separator=","
                            decimals={0}
                            decimal=","
                        />
                    </div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
            </div>
        </div>
    )
}


export default Block;