import { BiSortAlt2, BiCog } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { ethers } from 'ethers'
import bridgeConfig from "../utils/bridge_config.json";
import tokensConfig from "../utils/token_config.json";
import { useEffect, useState } from "react";

import styles from '../styles/Home.module.css';
import Image from "next/image";

//alert
import { alertService } from '../services';

import MyAlgoConnect from '@randlabs/myalgo-connect';

import Balance from "./Balance";

import Solflare from '@solflare-wallet/sdk';
import { Transaction } from '@solana/web3.js';

import { AlgoTransfer, ETHRedeemHandle } from "../bridges/wormhole";

export default function Swap() {

    const [rpc, setRpc] = useState(bridgeConfig[0].rpc);
    // const [tokenlist, setTokenlist] = useState(tokensConfig[bridgeConfig[0].value]);

    //current bridge.
    const [currentBridge, setcurrentBridge] = useState("Glitter");

    const [signedVAA,setSignedVAA] = useState("");
    //button loading
    const [loading, setLoading] = useState("");

    // modal
    const [modal, setModal] = useState("");
    const [modalNetwork, setModalNetwork] = useState("");
    const [modalToken, setModalToken] = useState("");
    const [modalToken1, setModalToken1] = useState("");

    //token option
    const [token0, setToken0] = useState(null);
    const [token1, setToken1] = useState(null);

    //token address
    const [token0Addrs, setToken0Addrs] = useState("");
    const [token1Addrs, setToken1Addrs] = useState("");

    //swap amount
    const [swapAmount,setSwapAmount] = useState(0);

    const provider = new ethers.providers.JsonRpcProvider(rpc);
    //hyper options
    const hyperProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = hyperProvider.getSigner();

    var myInterval = null;

    //alert options
    const options = {
        autoClose: true,
        keepAfterRouteChange: false
    }

    const buildUrl = (path, params) =>
    `solflare://ul/${path}?${params.toString()}`;

    async function connectWallet(network,type) {
        console.log("clicking ... ");
        switch (network) {
            case "Algo":
                const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
                const settings = {
                    shouldSelectOneAccount: false,
                    openManager: true
                };
                const accounts = await myAlgoConnect.connect(settings);
                if(type == 0) {
                    setToken0Addrs(accounts[0].address);
                }else{
                    setToken1Addrs(accounts[0].address);
                }
                break;
            case "Solana":
                const wallet = new Solflare();
                wallet.on('connect', () => {
                    if(type == 0) {
                        setToken0Addrs(wallet.publicKey.toString());
                    }else{
                        setToken1Addrs(wallet.publicKey.toString());
                    }
                });
                await wallet.connect();

                break;
            default:

        }
    }

    // get token0 and token1 exchange rate.
    async function getTokenExRate() {

    }

    //token0 change event.
    async function selectToken0ChangeHandle(index) {
        myModal5ClickHandle();
        setToken0(index);
    }

    //token1 change event.
    async function selectToken1ChangeHandle(index) {
        myModal6ClickHandle();
        setToken1(index);
    }

    /// control modal
    const modalClick = () => {
        if (modal == "") {
            setModal("modal-open");
        } else {
            setModal("");
        }
    }

    const myModal5ClickHandle = () => {
        if (modalToken == "") {
            setModalToken("modal-open");
        } else {
            setModalToken("");
        }
    }

    const myModal6ClickHandle = () => {
        if (modalToken1 == "") {
            setModalToken1("modal-open");
        } else {
            setModalToken1("");
        }
    }

    const openTarget = () => {
        modalClick();
        window.open("")
    }

    function buttonHtml() {
        return (
            <>
                <button onClick={()=>AlgoTransfer(setSignedVAA)} className="btn btn-primary w-full normal-case my-5 rounded-xl">transfer</button>
                <button onClick={()=>ETHRedeemHandle(signedVAA)} className="btn btn-primary w-full normal-case my-5 rounded-xl">redeemt</button>
            </>
        )
    }

    //switch network
    const networkChange = (netKey) => {
    }

    return (
        <div className="">
            
            <div className={`modal ${modal}`} id="my-modal-2">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">congrats!!</h3>
                    <p className="py-4">Remote chain swap transaction is created</p>
                    <div className="modal-action">
                        <a href="#" className="btn" onClick={() => modalClick()}>Okay</a>
                        <a href="#" className="btn" onClick={openTarget}>Detail Explorer</a>
                    </div>
                </div>
            </div>

            <div className={`modal ${modalNetwork} cursor-pointer ${styles.modalSelf}`} id="my-modal-4">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Bridges</h3>
                    <div className="divider"></div>
                    <div className="flex flex-col">
                        {bridgeConfig.map((item, key) => (
                            <div className="flex flex-row h-10 cursor-pointer hover:bg-primary-focus p-2 rounded-2xl" key={key} onClick={() => networkChange(key)}>
                                <div className="w-1/12 align-middle">
                                    <Image src={item.path} width={25} height={25} />
                                </div>
                                <div className="w-9/12 mb-4">
                                </div>
                                <div className="w-2/12 text-ml font-bold text-right">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`modal ${modalToken} cursor-pointer ${styles.modalSelf}`} id="my-modal-5">
                <div className="modal-box bg-base-100">
                    <h3 className="text-lg font-bold">Select Token</h3>
                    <div className="divider"></div>
                    <div className="flex flex-col">

                        {tokensConfig.map((item, key) => (
                            <div className="flex flex-row cursor-pointer hover:bg-success rounded-2xl p-1" key={key} onClick={() => selectToken0ChangeHandle(key)}>
                                <div>
                                    <Image src={item.path} width={25} height={25} />
                                </div>
                                <div className="ml-3 text-base">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`modal ${modalToken1} cursor-pointer ${styles.modalSelf}`} id="my-modal-6">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Select Network</h3>
                    <div className="divider"></div>
                    <div className="flex flex-col">
                        {tokensConfig.map((item, key) => (
                            <div className="flex flex-row h-10 cursor-pointer hover:bg-primary-focus p-2 rounded-2xl" key={key} onClick={() => selectToken1ChangeHandle(key)}>
                                <div className="w-1/12 align-middle">
                                    <Image src={item.path} width={25} height={25} />
                                </div>
                                <div className="w-9/12 mb-4">
                                    <div>{item.name}</div>
                                </div>
                                <div className="w-2/12">
                                    -
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-60 m-auto mt-40">
                <select className="select select-primary w-full max-w-xs" onChange={() => { }}>
                    <option value="Glitter" defaultValue>Glitter</option>
                </select>
            </div>

            <div className="w-1/4 min-w-max h-auto mt-10 border-solid border-2 rounded-2xl m-auto p-1 font-mono text-sm bg-slate-50">

                <div className="w-full px-6 py-4">
                    <span className="font-black">
                        Algo Swap
                    </span>
                    <BiCog className="cursor-pointer float-right" size="1.5rem" />
                </div>

                <div className="flex flex-col px-5 py-2">
                    <div className="h-auto border-solid border-2 rounded-2xl my-5 p-2">
                        <span className="font-black">
                            From
                        </span>
                        <div className="w-96 flex flex-row p-2 gap-x-32 border border-primary rounded-2xl border-dotted m-3">
                            <div className="w-1/2">
                                {token0 != null ? (<div className="w-auto p-2 flex flex-row border-solid border-2 rounded-2xl cursor-pointer" onClick={myModal5ClickHandle}>
                                    <div className="flex"
                                    ><Image src={tokensConfig[token0].path} width={20} height={20}></Image>
                                    </div>
                                    <div className="flex-auto text-center mx-1">{tokensConfig[token0].name}</div>
                                    <div className="flex"><FaAngleDown size="1rem" />
                                    </div>
                                </div>) : (<div className="w-auto p-2 flex flex-row border-solid border-2 rounded-2xl px-2 cursor-pointer" onClick={myModal5ClickHandle}>
                                    <div className="flex-auto text-center">select</div>
                                    <div className="flex"><FaAngleDown size="1rem" /></div>
                                </div>)}
                            </div>

                            <div className="w-1/2">
                                {token0 != null ? (<div className="p-2 flex flex-row border-solid border-2 rounded-2xl cursor-pointer" onClick={() => connectWallet(tokensConfig[token0].name,0)}>
                                    <div className="flex w-6"
                                    ><Image src={"/wallet/"+tokensConfig[token0].wallet} width={20} height={20}></Image>
                                    </div>
                                    <div className="flex text-center mx-1">Wallet</div>
                                    <div className="flex"><FaAngleDown size="1rem" />
                                    </div>
                                </div>) : ("")}
                            </div>

                        </div>

                        {token0 != null && token0Addrs ? (<Balance bridge={currentBridge} network={tokensConfig[token0].name} addrs={token0Addrs} del={setToken0Addrs} />):""}
                        

                    </div>
                    <div className="m-auto">
                        <BiSortAlt2 className="cursor-pointer" size="1.4rem" />
                    </div>
                    <div className="h-auto border-solid border-2 rounded-2xl my-5 p-2">
                        <span className="font-black">
                            To
                        </span>
                        <div className="flex flex-row p-2 gap-x-32 border border-primary rounded-2xl border-dotted m-3">
                            <div className="w-1/2">
                                {token1 != null ? (<div className="w-auto p-2 flex flex-row border-solid border-2 rounded-2xl cursor-pointer" onClick={myModal6ClickHandle}>
                                    <div className="flex"
                                    ><Image src={tokensConfig[token1].path} width={20} height={20}></Image>
                                    </div>
                                    <div className="flex-auto text-center mx-1">{tokensConfig[token1].name}</div>
                                    <div className="flex"><FaAngleDown size="1rem" />
                                    </div>
                                </div>) : (<div className="w-auto p-2 flex flex-row border-solid border-2 rounded-2xl px-2 cursor-pointer" onClick={myModal6ClickHandle}>
                                    <div className="flex-auto text-center">select</div>
                                    <div className="flex"><FaAngleDown size="1rem" /></div>
                                </div>)}
                            </div>

                            <div className="w-1/2">
                                {token1 != null ? (<div className="w-auto p-2 flex flex-row border-solid border-2 rounded-2xl cursor-pointer" onClick={() => connectWallet(tokensConfig[token1].name,1)}>
                                    <div className="flex w-6"
                                    ><Image src={"/wallet/"+tokensConfig[token1].wallet} width={20} height={20}></Image>
                                    </div>
                                    <div className="flex-auto text-center mx-1">Connect</div>
                                    <div className="flex"><FaAngleDown size="1rem" />
                                    </div>
                                </div>) : ("")}
                            </div>
                        </div>

                        {token1 != null && token1Addrs ? (<Balance bridge={currentBridge} network={tokensConfig[token1].name} addrs={token1Addrs} del={setToken1Addrs} />):""}

                    </div>

                    <div className="h-auto border-solid border-2 rounded-2xl my-5 p-2">
                        <input type="text" placeholder="Input amount" value={swapAmount} className="font-bold text-primary input input-ghost w-full max-w-xs focus:outline-0 focus:bg-inherit focus:text-primary"  onChange={(event) => { setSwapAmount(event.target.value)}} />
                    </div>

                    <div>
                        {buttonHtml()}
                    </div>
                </div>

            </div>
        </div >
    )
}