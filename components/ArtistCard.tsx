import Image from "next/image";

interface Artist {
  name: string;
  image: string;
  id?: string;
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="flex items-center gap-5 border-t-2 p-4 border-2 border-white">
      <Image width={200} height={200} alt="artist" src={artist.image} />
      <div></div>
      <div className="flex flex-col h-full justify-between items-start">
        <h2 className="text-2xl ">{artist.name}</h2>
        <button className="rounded-md h-12 p-2  flex justify-center items-center bg-indigo-700 text-white text-xl">
          Get Recommendations for Similar Artists
        </button>
      </div>
    </div>
  );
}
