import Head from 'next/head'
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import React from "react";
import { Alert } from '../components/alert.jsx';

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

const Swap = dynamic(() => import('../components/Swap'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100" data-theme="wireframe">
      <Head>
        <title>Algo Bridge Aggregator</title>
        <meta name="description" content="Algo Bridge Aggregator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert />
      <Header />

      <div className='min-h-screen'>
        <Swap />
      </div>
      <Footer />
    </div >
  )
}
