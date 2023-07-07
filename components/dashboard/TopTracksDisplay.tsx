"use client";
import Image from "next/image";
import { useState } from "react";
import TrackPreview from "../TrackPreview";

// TO DO: pass in audio player ref to play the track on click
export default function TracksDisplay({ tracks }: { tracks: any[] }) {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(null);
  return (
    <div className="flex flex-col lg:flex-row gap-5 flex-wrap">
      {tracks.map((track, idx) => {
        console.log(track);
        return (
          <>
            {/* {selectedTrackIdx === idx && (
              <TrackPreview
                selectedTrack={track}
                setSelectedTrackIdx={setSelectedTrackIdx}
              />
            )} */}
            <div
              className="flex flex-col justify-center items-start gap-2 cursor-pointer"
              key={track.id}
              //@ts-ignore
              onClick={() => setSelectedTrackIdx(idx)}
            >
              <img
                src={track.album?.images[0].url || ""}
                className="h-48 w-44 "
                alt={track.name}
              />
              <h3 className="font-bold text-lg">{track.name}</h3>
            </div>
          </>
        );
      })}
    </div>
  );
}
