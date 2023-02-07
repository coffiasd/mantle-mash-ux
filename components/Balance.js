import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";
import tokensConfig from "../utils/token_config.json";

export default function Balance({ index, balance, bridge, network, addrs, del }) {
    console.log(bridge, network, addrs);

    const hideAddress = (address) => {
        if (address == "" || address == undefined) {
            return "connect to show"
        }
        return address.substring(0, 8) + "****" + address.slice(-4)
    }

    const delAddrs = () => {
        del("");
    }

    return (
        <div className="flex flex-row justify-between border border-primary rounded-2xl border-dotted m-3">
            <div className="flex">
                <input type="text" placeholder="connect to show" value={hideAddress(addrs)} className="font-bold text-base text-primary input input-ghost w-full max-w-xs focus:outline-0 focus:bg-inherit focus:text-primary" onChange={() => { }} />
            </div>
            <div className="flex flex-row text-base text-primary font-bold mt-3 mr-3">
                <div className="mt-0.5 mr-1"><Image src={tokensConfig[index].path} width={18} height={18}></Image></div>
                <div>{balance}</div>
            </div>
            <div className="flex w-10 my-auto cursor-pointer" onClick={delAddrs}><RiDeleteBin5Line size="1.3rem" /></div>
        </div>
    )
}