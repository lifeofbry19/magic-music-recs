import Image from "next/image";

interface Artist {
  name: string;
  imageUrl: string;
  id: string;
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="flex items-center gap-5 border-t-2 border-b-2 border-white">
      <div>{/* <Image /> */}</div>
      <div>
        <h2>Artist name</h2>
        <button className="rounded-full h-12  flex justify-center items-center bg-indigo-700 text-white text-xl">
          Get Recommendations for Similar Artists
        </button>
      </div>
    </div>
  );
}
