import { useState ,useEffect} from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Balance({bridge,network,addrs,del}) {
    console.log(bridge,network,addrs);
    
    const [balance,setBalance] = useState(0);

    const getBalance = async ()=>{
        const url = "/api/"+bridge+"/balance?network="+network+"&address="+addrs
        axios.get(url).then(function(res){
            if(res.status != 200){
                console.log("fetch");
                return 
            }
            if(res.data.data != undefined){
                setBalance(res.data.data);
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const hideAddress = (address) => {
        if(address == ""|| address == undefined){
            return "connect to show"
        }
        return address.substring(0, 8) + "****" + address.slice(-4)
    }

    const delAddrs = ()=>{
        console.log("del addrs");
        del("");
    }

    if(addrs != ""){
        getBalance();
    }

    return (
        <div className="flex flex-row border border-primary rounded-2xl border-dotted m-3">
            <div className="flex">
                <input type="text" placeholder="connect to show" value={hideAddress(addrs)} className="font-bold text-base text-primary input input-ghost w-full max-w-xs focus:outline-0 focus:bg-inherit focus:text-primary" onChange={()=>{ }} />
            </div>
            <div className="flex-auto text-base text-primary font-bold mt-3 mr-3">
                ${balance}
            </div>
            <div className="flex w-10 my-auto cursor-pointer" onClick={delAddrs}><RiDeleteBin5Line size="1.3rem" /></div>
        </div>
    )
}