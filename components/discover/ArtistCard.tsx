import Image from "next/image";
import Link from "next/link";

interface Artist {
  name: string;
  images: [{ url: string }];
  id?: string;
}

export default function ArtistCard({ artist }: { artist: any }) {
  return (
    <div className="flex flex-col w-full max-w-[300px] items-center gap-5 p-4 border bg-gray-900 bg-opacity-60 rounded-lg">
      <img width={200} height={200} alt="artist" src={artist.images[0]?.url} />
      <div></div>
      <div className="flex flex-col h-full justify-end gap-4 items-start">
        <h2 className="text-2xl ">{artist.name}</h2>
        <Link href={`/discover/${artist.id}`}>
          <button className="rounded-md h-12 p-1 px-2 flex justify-center items-center bg-indigo-700 text-white text-xl">
            Find Similar Artists
          </button>
        </Link>
      </div>
    </div>
  );
}