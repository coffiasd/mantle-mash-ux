import { useAccount } from 'wagmi'
import Blockies from 'react-blockies';

export default function Account() {

    const { address, isConnected } = useAccount()

    return (
        <>
            <div className="w-full lg:w-10/12 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 flex justify-center">
                                <div className="flex relative mt-3">
                                    <Blockies color='#dfe' bgcolor='#aaa' seed={address} size={30} scale={3} />
                                </div>
                                <div className='flex'>
                                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                        {/* {address} */}
                                    </h3>
                                </div>

                            </div>
                            <div className="w-full px-4 text-center mt-5">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            22
                                        </span>
                                        <span className="text-sm text-blueGray-400">Balance</span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            10
                                        </span>
                                        <span className="text-sm text-blueGray-400">Tokens</span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            89
                                        </span>
                                        <span className="text-sm text-blueGray-400">Transactions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                {address}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                Los Angeles, California
                            </div>
                            <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                Solution Manager - Creative Tim Officer
                            </div>
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                University of Computer Science
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}