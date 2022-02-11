import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>Recently Played</title>
        <meta name="description" content="What I've been playing recently." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <div className="flex flex-col items-center px-16 py-8 transition-all rounded-xl bg-neutral-50 drop-shadow-xl hover:bg-neutral-100">
          <h1 className="text-2xl font-bold">Next.js + Tailwind CSS</h1>
          <p className="py-1 text-base font-medium text-neutral-600">Starter pack</p>
        </div>
      </main>

    </div>
  )
}

export default Home
