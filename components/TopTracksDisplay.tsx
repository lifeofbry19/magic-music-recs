import Image from "next/image";

export default function PlaylistsDisplay({ tracks }: { tracks: any[] }) {
  return (
    <div className="flex flex-col max-w-7xl lg:flex-row gap-5 mt-10 flex-wrap">
      {tracks.map((track) => {
        return (
          <div
            className="flex flex-col justify-center items-start gap-2"
            key={track.id}
          >
            <img
              src={track.album.images[0].url}
              className="h-48 w-44 "
              alt={track.name}
            />
            <h3 className="font-bold text-lg">{track.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
