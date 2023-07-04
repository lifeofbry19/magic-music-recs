import Image from "next/image";
import Link from "next/link";

interface Artist {
  name: string;
  images: [{ url: string }];
  id?: string;
}

export default function ArtistCard({ artist }: { artist: any }) {
  return (
    <div className="rounded-lg">
      <Link className="rounded-lg" href={`/discover/${artist.id}`}>
        <div className="flex shadow-sm group cursor-pointer hover:bg-[#2c2c2c] flex-col w-full max-w-[300px] items-center gap-5 p-4  bg-[#252525] bg-opacity-60 rounded-lg">
          <img
            width={200}
            height={200}
            alt="artist"
            className="shadow-lg rounded-lg max-h-[200px]"
            src={artist.images[0]?.url}
          />
          <div></div>
          <div className="flex flex-col h-full justify-end gap-4 items-start">
            <h2 className="text-lg text-white">{artist.name}</h2>
            <p className="flex text-white">
              discover related artist{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-right group-hover:translate-x-1 transition-all duration-300"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </p>

            {/* <button className="rounded-md h-12 p-1 px-2 flex justify-center items-center bg-indigo-700 text-white text-xl">
              Find Similar Artists
            </button> */}
          </div>
        </div>{" "}
      </Link>
    </div>
  );
}
