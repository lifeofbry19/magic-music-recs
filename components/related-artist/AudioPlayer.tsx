"use client";
import { set } from "lodash";
import "./Player.css";
import { useRef, useState, useEffect, forwardRef } from "react";

type Track = {
  preview_url: string;
  name: string;
  album: {
    images: { url: string }[];
  };
};

type Props = {
  selectedTrack: Track;
  setSelectedTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

const AudioPlayer = forwardRef(
  (
    { selectedTrack, setSelectedTrack, isPlaying, setIsPlaying }: Props,
    ref
  ) => {
    const rangeRef = useRef<HTMLInputElement | null>(null);
    const [rangeWidth, setRangeWidth] = useState(0);

    useEffect(() => {
      // if track is playing, update range input
      if (ref.current) {
        ref.current.addEventListener("timeupdate", (e) => {
          const { duration, currentTime } = e.srcElement;
          if (isNaN(duration) || isNaN(currentTime)) return;
          const progressPercent = Math.floor((currentTime / duration) * 100);
          setRangeWidth(progressPercent);
        });
      }
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("timeupdate", () => {});
        }
      };
    }, [ref.current]);

    return (
      <div className="w-screen z-50   fixed  p-5 bg-opacity-60 bottom-0 left-0 sm:justify-center gap-4 sm:gap-12 sm:h-16 h-32 bg-neutral-800 flex flex-col sm:flex-row items-center">
        <h3 className="text-xl">{selectedTrack?.name || ""}</h3>
        <audio ref={ref} src=""></audio>
        <div className="flex gap-2 flex-col justify-center items-center">
          <div>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-pause cursor-pointer"
                onClick={() => {
                  if (ref.current.paused) {
                    ref.current.play();
                    setIsPlaying(true);
                  } else {
                    ref.current.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                <rect width="4" height="16" x="6" y="4" />
                <rect width="4" height="16" x="14" y="4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke=" #fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-play cursor-pointer "
                onClick={() => {
                  if (ref.current.paused) {
                    ref.current.play();
                    setIsPlaying(true);
                  } else {
                    ref.current.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </div>{" "}
          <div className="bg-[#141516] rounded-[5px] h-[0.5rem] w-[15rem]">
            <div
              className={`rounded-[5px] h-full relative  z-10 bg-white`}
              style={{
                width: `${rangeWidth}%`,
              }}
            ></div>
          </div>
          {/* <input
              type="range"
              className=""
              value={rangeWidth}
              ref={rangeRef}
            /> */}
        </div>
      </div>
    );
  }
);

export default AudioPlayer;
