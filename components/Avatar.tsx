import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Image from 'next/image';

export default function Avatar() {
  const { data, error } = useSWR<any, Error>('/api/user', fetcher);

  if (error) return <div className="w-6 h-6 rounded-full bg-neutral-300" />;
  if (!data)
    return (
      <div className="w-6 h-6 rounded-full animate-pulse bg-neutral-100" />
    );
  const imageAlt = `${data.user.name}'s Spotify profile picture`;
  return (
    <Link href={data.user.url} passHref>
      <a>
        <div className="w-6 h-6 transition-all hover:saturate-[1.3] hover:brightness-[1.05] relative">
          <Image
            src={data.user.image}
            alt={imageAlt}
            layout="fill"
            className="rounded-full"
          />
        </div>
      </a>
    </Link>
  );
}
