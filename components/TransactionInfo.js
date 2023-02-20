import { TiInfo } from "react-icons/ti";
import { IoIosCopy } from "react-icons/io";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function TransactionInfo() {
    const router = useRouter();
    const { txhash } = router.query;
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [shake, setShake] = useState(false);
    const [shake1, setShake1] = useState(false);
    const [shake2, setShake2] = useState(false);

    const animate = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }

    const animate1 = () => {
        setShake1(true);
        setTimeout(() => setShake1(false), 500);
    }

    const animate2 = () => {
        setShake2(true);
        setTimeout(() => setShake2(false), 500);
    }

    const hideAddress = (input) => {
        if (input.length < 100) {
            return input;
        }
        return input.substring(0, 50) + "...." + input.slice(-50)
    }

    useEffect(() => {
        if (!txhash) {
            return
        }

        const fetchTransaction = async () => {
            fetch(`https://explorer.testnet.mantle.xyz/api?module=transaction&action=gettxinfo&txhash=` + txhash)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message == "OK") {
                        setInfo(data.result);
                    }
                })
        }
        fetchTransaction();
    }, [txhash])

    return (
        <div className="flex flex-col w-5/6 m-auto">
            <div className="flex mt-10">
                <div className="badge badge-warning gap-2">
                    overview
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg my-6 p-6">
                <div className="flex mb-3">
                    <h3>Transaction Details</h3>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Transaction information">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Transaction Hash</div>
                    <div className="flex">{txhash}</div>
                    <div className="flex my-auto cursor-pointer">
                        <div onClick={animate} className={`tooltip tooltip-secondary ${shake ? "shake" : ""}`} data-tip="click to copy">
                            <CopyToClipboard text={txhash}>
                                <IoIosCopy />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Rsult">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Result</div>
                    <div className="flex">{info && info.success ? (<div className="badge badge-success gap-2">
                        success
                    </div>) : (<div className="badge badge-warning gap-2">
                        failed
                    </div>)}</div>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Block">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Block</div>
                    <div className="flex">{info && info.blockNumber}</div>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Timestamp">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Timestamp</div>
                    <div className="flex">{info && info.timeStamp}</div>
                </div>

                <div className="divider">I'm a lonely divider</div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="From">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">From</div>
                    <div className="flex">{info && info.from}</div>
                    <div className="flex my-auto cursor-pointer">
                        <div onClick={animate1} className={`tooltip tooltip-secondary ${shake1 ? "shake" : ""}`} data-tip="click to copy">
                            <CopyToClipboard text={info && info.from}>
                                <IoIosCopy />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="To">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">To</div>
                    <div className="flex">{info && info.to}</div>
                    <div className="flex my-auto cursor-pointer">
                        <div onClick={animate2} className={`tooltip tooltip-secondary ${shake2 ? "shake" : ""}`} data-tip="click to copy">
                            <CopyToClipboard text={info && info.to}>
                                <IoIosCopy />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>

                <div className="divider">I'm a lonely divider</div>


                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Value">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Value</div>
                    <div className="flex">{info && info.value} BIT</div>
                </div>

                <div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Transaction Fee">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Transaction Fee</div>
                    <div className="flex">{info && info.gasUsed}</div>
                </div>

            </div>

            <div className="flex mt-10">
                <div className="badge badge-warning gap-2">
                    detail
                </div>
            </div>

            <div className="flex flex-col bg-white rounded-lg my-6 p-6">

                {show && (<div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Gas Fee">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40 my-auto">Input:</div>
                    <div className="flex w-5/6 text-xs rounded-md border-2 p-2">
                        <p className="w-full break-words text-second">
                            {info && hideAddress(info.input)}
                        </p>
                    </div>
                </div>
                )}

                {show && (<div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Gas Fee">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Gas Limit</div>
                    <div className="flex">{info && info.gasLimit}</div>
                </div>)}

                {show && (<div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Gas Fee">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Gas Price</div>
                    <div className="flex">{info && info.gasPrice}</div>
                </div>)}

                {show && (<div className="flex flex-row my-3">
                    <div className="flex w-4 my-auto">
                        <div className="tooltip tooltip-secondary" data-tip="Gas Fee">
                            <TiInfo />
                        </div>
                    </div>
                    <div className="flex w-40">Confirmations:</div>
                    <div className="flex">{info && info.confirmations}</div>
                </div>)}


                <div className="flex flex-row my-3">
                    <div className="flex w-44">More Details:</div>
                    <div className="flex cursor-pointer text-cyan-600" onClick={() => { setShow(!show) }}>{show ? ("- click to show less") : ("+ click to show more")}</div>
                </div>


            </div>

        </div>
    )
}