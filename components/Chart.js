import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart() {

    const [label, setLable] = useState([]);
    const [price, setPrice] = useState([]);

    const [label2, setLable2] = useState([]);
    const [marketcap, setMarketcap] = useState([]);

    //https://api.coingecko.com/api/v3/coins/bitdao/market_chart?vs_currency=usd&days=1

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/bitdao/market_chart?vs_currency=usd&days=30&interval=daily`)
            .then((res) => res.json())
            .then((data) => {
                //price 
                let price = data.prices;
                let labels = [];
                let prices = [];
                for (let i = 0; i < price.length; i++) {
                    labels.push(getDate(price[i][0]));
                    prices.push(price[i][1]);
                }
                setLable(labels);
                setPrice(prices);
                //market_cap
                let cap = data.market_caps;
                let label2 = [];
                let caps = [];
                for (let i = 0; i < cap.length; i++) {
                    label2.push(getDate(cap[i][0]));
                    caps.push(cap[i][1]);
                }
                setLable2(label2);
                setMarketcap(caps);
            })
    }, [])

    const options = {
        elements: {
            point: {
                radius: 0
            }
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'BitDao Montly Price Track',
            },
        },
    };

    const options2 = {
        elements: {
            point: {
                radius: 0
            }
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'BitDao Montly Marketcap Track',
            },
        },
    };

    const data = {
        labels: label,
        datasets: [{
            data: price,
            label: "",
            borderColor: "#3e95cd",
            fill: false
        }
        ]
    };

    const data2 = {
        labels: label2,
        datasets: [{
            data: marketcap,
            label: "",
            borderColor: "#3e95cd",
            fill: false
        }
        ]
    };

    const getDate = (timestamp) => {
        const d = new Date(timestamp);

        const DD = String(d.getDate()).padStart(2, '0');
        const MM = String(d.getMonth() + 1).padStart(2, '0');
        return MM + '-' + DD;
    }

    return (
        <div className="w-5/6 m-auto rounded-2xl bg-base-100 h-auto mt-6">

            <div className="flex lg:flex-row md:flex-col">

                <div className="lg:w-1/2 p-6 md:w-full">
                    <Line options={options} data={data} />
                </div>

                <div className="lg:w-1/2 p-6 md:w-full">
                    <Line options={options2} data={data2} />
                </div>

            </div>

        </div>
    )
}