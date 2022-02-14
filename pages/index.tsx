import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Tracks from "../components/Tracks";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen transition-colors bg-stone-100 dark:bg-neutral-900">
      <Head>
        <title>Recently Played</title>
        <meta name="description" content="What I've been playing recently." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <div className="flex flex-col w-screen gap-5 px-6 py-6">
          <Tracks />
        </div>
      </main>
    </div>
  );
};

export default Home;
