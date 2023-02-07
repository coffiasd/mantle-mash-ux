import { FaBitcoin, FaTwitter, FaGithub, FaYoutube, FaAngleDown } from "react-icons/fa";
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import algoIcon from "cryptocurrency-icons/128/color/algo.png";
import algoSmallIcon from "cryptocurrency-icons/svg/color/algo.svg";

export default function Header() {

    const hideAddress = (address) => {
        return address.substring(0, 4) + "...." + address.slice(-4)
    }

    return (
        <div className="navbar text-neutral-content border-solid border-b-2 bg-base-content">
            <div className="flex-1 ml-3">
                <ul className='flex flex-row justify-between gap-6'>
                    <li><a className={styles.logo} href="#"><Image src={algoIcon} width={30} height={30} /></a></li>
                    <li><a className={styles.leftToRight} href="https://twitter.com/coffiasse"><FaTwitter size="1.2rem" className='m-1' />twitter</a></li>
                    <li><a className={styles.leftToRight} href="https://github.com/coffiasd"><FaGithub size="1.2rem" className='m-1' />github</a></li>
                    <li><a className={styles.leftToRight} href="https://www.youtube.com/channel/UCqrS4kOJuUor52EYROcfXuw"><FaYoutube size="1.2rem" className='m-1' />youtube</a></li>
                </ul>
            </div>

            <div className="navbar-end">

            </div>
        </div >
    )
}