import Image from "next/image";

export default function TopArtistsDisplay({ artists }: { artists: any[] }) {
  return (
    <div className="flex flex-col max-w-7xl lg:flex-row gap-5 mt-10 flex-wrap">
      {artists.map((artist) => {
        return (
          <div
            className="flex flex-col justify-center items-start gap-2"
            key={artist.id}
          >
            <img
              src={artist.images[0].url}
              className="h-48 w-44 "
              alt={artist.name}
            />
            <h3 className="font-bold text-lg">{artist.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
