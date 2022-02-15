// @ts-nocheck

import Link from "next/link";
import useSWR from "swr";
import fetcher from "../lib/fetcher";


export default function Avatar() {
  const { data, error } = useSWR('/api/user', fetcher)
  
  if (error) return <div className="w-6 h-6 rounded-full bg-neutral-300" />
  if (!data) return <div className="w-6 h-6 rounded-full animate-pulse bg-neutral-100" />
  return (
    <Link href={data.user.url} passHref>
      <a>
        <img src={data.user.image} className="w-6 h-6 transition-all rounded-full hover:saturate-150 hover:brightness-105"/>
      </a>
    </Link>
 
  )
}

