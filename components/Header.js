import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Header() {
    const router = useRouter()
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { isConnected } = useAccount();
    const { switchNetwork } = useSwitchNetwork()
    const { chain } = useNetwork();

    return (
        <div className="navbar text-neutral-content border-solid border-b-2 bg-base-content">
            <div className="flex-1 ml-3">
                <ul className='flex flex-row justify-between gap-6'>
                    <li className="cursor-pointer">
                        <Link className={styles.logo} href="/"><Image src="/logo-lockup.svg" width={100} height={35} /></Link>
                    </li>
                    <li>
                        <Link href="https://twitter.com/coffiasse">
                            <a rel="noreferrer" target="_blank" className={styles.leftToRight} href="https://twitter.com/coffiasse">
                                <FaTwitter size="1.2rem" className='m-1' />twitter
                            </a>
                        </Link>
                    </li>
                    <li >
                        <Link href="https://github.com/coffiasd">
                            <a rel="noreferrer" target="_blank" className={styles.leftToRight}>
                                <FaGithub size="1.2rem" className='m-1' />github
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.youtube.com/channel/UCqrS4kOJuUor52EYROcfXuw">
                            <a rel="noreferrer" target="_blank" className={styles.leftToRight}>
                                <FaYoutube size="1.2rem" className='m-1' />youtube
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex-none">
                {/* <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="input an address" className="input input-bordered input-group-lg" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div> */}
            </div>

            <div className="navbar-end">
                {isConnected && chain.id != 5001 && <button className="btn btn-sm btn-warning ml-3 normal-case" onClick={() => switchNetwork(5001)}>switch net</button>}

                {!isConnected && (<button className="btn btn-sm btn-warning ml-3 normal-case" onClick={openConnectModal}>connect wallet</button>)}

                {isConnected && chain && chain.id == 5001 &&
                    (<><button className="btn btn-sm btn-primary ml-3 normal-case" onClick={openAccountModal}>Profile</button><button className="btn btn-sm btn-primary ml-3 normal-case " onClick={openChainModal}>Chain</button><button className="btn btn-sm btn-primary mx-3 normal-case " onClick={() => { router.push('/profile') }}>Info</button></>)
                }
            </div>
        </div >
    )
}