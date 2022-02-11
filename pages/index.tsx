import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Head>
        <title>Recently Played</title>
        <meta name="description" content="What I've been playing recently." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <Header /> 
      <main>
        <div className="flex flex-col gap-4">

        </div>
      </main>

    </div>
  )
}

export default Home
