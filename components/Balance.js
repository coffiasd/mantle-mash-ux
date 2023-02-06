import { RiDeleteBin5Line } from "react-icons/ri";

export default function Balance({ balance, bridge, network, addrs, del }) {
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
        <div className="flex flex-row border border-primary rounded-2xl border-dotted m-3">
            <div className="flex">
                <input type="text" placeholder="connect to show" value={hideAddress(addrs)} className="font-bold text-base text-primary input input-ghost w-full max-w-xs focus:outline-0 focus:bg-inherit focus:text-primary" onChange={() => { }} />
            </div>
            <div className="flex-auto text-base text-primary font-bold mt-3 mr-3">
                ${balance}
            </div>
            <div className="flex w-10 my-auto cursor-pointer" onClick={delAddrs}><RiDeleteBin5Line size="1.3rem" /></div>
        </div>
    )
}