import { useEffect, useRef } from "react";

type Track = {
  name: string;
  album: { images: [{ url: string }] };
  id: string;
};

export default function TrackPreview({
  selectedTrack,
  setSelectedTrackIdx,
}: {
  selectedTrack: Track;
  setSelectedTrackIdx: any;
}) {
  useEffect(() => {
    // if a user clicks outside the div, setSelectedTrackIdx to null
  });
  return (
    <>
      <div className="min-h-screen min-w-full absolute bg-black opacity-30 "></div>
      <div
        className="flex flex-col gap-2 absolute -mt-32 left-1/4 justify-center opacity-100  items-center"
        key={selectedTrack.id}
      >
        <img
          //@ts-ignore
          src={selectedTrack.image}
          className="h-[600px] w-[550px] "
          alt={selectedTrack.name}
        />
        <h3 className="font-bold text-lg">{selectedTrack.name}</h3>
        <button className="bg-indigo-700 p-4 rounded-lg">
          Get Recommendations for Similar Artists
        </button>
      </div>
    </>
  );
}
