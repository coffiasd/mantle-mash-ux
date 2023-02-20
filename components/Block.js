import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { IoLogoUsd } from "react-icons/io";
import { FaBitcoin } from "react-icons/fa";

function Block() {
    const [ethsupply, setEthsupply] = useState(0);
    const [coinsupply, setCoinsupply] = useState(0);
    const [price, setPrice] = useState(0);
    const [totalfees, setTotalfees] = useState(false)

    useEffect(() => {
        fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=ethsupply`)
            .then((res) => res.json())
            .then((data) => {
                setEthsupply(parseInt(ethers.utils.formatEther(data.result)));
            })

        fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=coinsupply`)
            .then((res) => res.text())
            .then((data) => {
                setCoinsupply(parseInt(data));
            });

        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitdao&vs_currencies=usd`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPrice(data.bitdao.usd);
                // setEthsupplyexchange(parseInt(ethers.utils.formatEther(data.result)));
            });

        const myDate = new Date();
        const month = (myDate.getMonth() >= 1 && myDate.getMonth() <= 9) ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
        const ys = new Date();
        ys.setDate(myDate.getDate() - 1);
        const day = (ys.getDate() <= 9) ? '0' + ys.getDate() : ys.getDate();
        const today = myDate.getFullYear() + '-' + (month) + '-' + day;
        console.log(today);
        fetch(`https://explorer.testnet.mantle.xyz/api?module=stats&action=totalfees&date=` + today)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTotalfees(parseInt(data.result));
            });
    }, [])

    return (
        <div className="bg-secondary w-5/6 m-auto rounded-2xl mt-6">
            <div className="stats w-full rounded-2xl h-auto text-center lg:stats-horizontal md:stats-vertical">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <Image src="/ethereum-original.svg" width={30} height={30} />
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
                    <div className="stat-desc">Get total supply in Wei</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <Image src="/bitdao.png" width={30} height={30} />
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
                    <div className="stat-desc">total coin supply </div>
                </div>


                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <IoLogoUsd size="2rem" />
                    </div>
                    <div className="stat-title">coinprice</div>
                    <div className="stat-value">
                        <CountUp
                            start={0}
                            end={price}
                            duration={2}
                            separator=","
                            decimals={4}
                            decimal="."
                        />
                    </div>
                    <div className="stat-desc">Get latest price of native coin in USD</div>
                </div>


                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBitcoin size="2rem" />
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
                    <div className="stat-desc">total transaction fees yesterday</div>
                </div>
            </div>
        </div>
    )
}


export default Block;