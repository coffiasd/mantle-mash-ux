import { FaBitcoin, FaTwitter, FaGithub, FaYoutube, FaAngleDown } from "react-icons/fa";
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import algoIcon from "cryptocurrency-icons/128/color/algo.png";

import algoSmallIcon from "cryptocurrency-icons/svg/color/algo.svg";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

import { useEffect, useState } from "react";

export default function Header() {

    const [account, setAccount] = useState(null);

    const disconnect = async () => {
        localStorage.removeItem("walletconnect");
        setAccount(null);
    }

    const connectWallet = async () => {
        // Create a connector
        const connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
        });

        // Check if connection is already established
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        setAccount(connector.accounts[0]);

        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }

            // Get provided accounts
            const { accounts } = payload.params[0];
            setAccount(accounts[0]);
        });

        connector.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            // Get updated accounts 
            const { accounts } = payload.params[0];
            setAccount(accounts[0]);
        });
    }

    const hideAddress = (address) => {
        return address.substring(0, 4) + "...." + address.slice(-4)
    }

    useEffect(() => {
        const loginInfo = localStorage.getItem("walletconnect");
        if (loginInfo != null) {
            const accounts = JSON.parse(loginInfo);
            console.log("aaa", accounts);
            setAccount(accounts.accounts[0]);
        }
    }, [])


    return (
        <div className="navbar text-neutral-content border-solid border-b-2 bg-base-content">
            <div className="flex-1 ml-3">
                <ul className='flex flex-row justify-between gap-6'>
                    <li><a className={styles.logo} href="#"><Image src={algoIcon} width={30} height={30} /></a></li>
                    <li><a className={styles.leftToRight} href="https://twitter.com/coffiasd"><FaTwitter size="1.2rem" className='m-1' />twitter</a></li>
                    <li><a className={styles.leftToRight} href="https://github.com/coffiasd"><FaGithub size="1.2rem" className='m-1' />github</a></li>
                    <li><a className={styles.leftToRight} href="https://www.youtube.com/channel/UCqrS4kOJuUor52EYROcfXuw"><FaYoutube size="1.2rem" className='m-1' />youtube</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                {account ?
                    (<div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost rounded-btn"><Image src={algoSmallIcon} width={20} height={20} />&nbsp;&nbsp;{hideAddress(account)}<FaAngleDown size="1rem" className="ml-2" /></label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li><button className="btn" onClick={disconnect}>Disconnect</button></li>
                        </ul>
                    </div>)
                    :
                    <button className="btn btn-primary btn-sm bg-base ml-3 normal-case" onClick={connectWallet}>connect wallet</button>
                }
            </div>
        </div >
    )
}