"use client";
import Image from "next/image";
import { useState } from "react";
import TrackPreview from "./TrackPreview";

export default function TracksDisplay({ tracks }: { tracks: any[] }) {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(null);
  return (
    <div className="flex flex-col max-w-7xl lg:flex-row gap-5 mt-10 flex-wrap">
      {tracks.map((track, idx) => {
        return (
          <>
            {selectedTrackIdx === idx && (
              <TrackPreview
                selectedTrack={track}
                setSelectedTrackIdx={setSelectedTrackIdx}
              />
            )}
            <div
              className="flex flex-col justify-center items-start gap-2 cursor-pointer"
              key={track.id}
              //@ts-ignore
              onClick={() => setSelectedTrackIdx(idx)}
            >
              <img src={track.image} className="h-48 w-44 " alt={track.name} />
              <h3 className="font-bold text-lg">{track.name}</h3>
            </div>
          </>
        );
      })}
    </div>
  );
}
