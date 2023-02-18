import Head from 'next/head'
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import React from "react";
import { Alert } from '../components/alert.jsx';
import TransactionInfo from '../components/TransactionInfo';

const Header = dynamic(() => import('../components/Header'), {
    ssr: false,
})

export default function Transaction() {
    return (
        <div className="min-h-screen bg-slate-100" data-theme="wireframe">
            <Head>
                <title>Mantle dashboard Account</title>
                <meta name="description" content="Mantle dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Alert />
            <Header />

            <div className='min-h-screen'>
                <TransactionInfo />
            </div>

            <Footer />
        </div >
    )
}