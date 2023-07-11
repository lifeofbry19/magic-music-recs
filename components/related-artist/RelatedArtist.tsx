//@ts-nocheck
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useRef, forwardRef } from "react";
import debounce from "lodash/debounce";
import Link from "next/link";
import { getRandomArtist } from "@/lib/getRandomArtist";
import { carouselData } from "@/lib/carouselData";
import AudioPlayer from "./AudioPlayer";
import SkeletonRelatedArtist from "./SkeletonRelatedArtist";
import { useQuery } from "react-query";

type Id = string;

type Artist = {
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  name: string;
} | null;

type Track = {
  preview_url: string;
  name: string;
};

type Tracks = Track[] | null;

export default function RelatedArtist({ id }: { id: Id }) {
  const { data: session, status } = useSession();
  // const [artist, setArtist] = useState<Artist>(null);
  // const [tracks, setTracks] = useState<Tracks>(null);
  // const [relatedArtistId, setRelatedArtistId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  async function getRelatedArtists(id: string) {
    if (!id) return;
    const relatedArtistsEndpoint = `https://api.spotify.com/v1/artists/${id}/related-artists`;
    const res = await fetch(relatedArtistsEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    const randomArtist = getRandomArtist(json.artists);
    // setArtist(randomArtist);
    // setRelatedArtistId(randomArtist?.id);
    return randomArtist;
  }

  async function getArtistTracks(id: string) {
    if (!id) return;
    const removedWhitespaceStr = id.trim();
    const relatedTracksEndpoint = `https://api.spotify.com/v1/artists/${removedWhitespaceStr}/top-tracks?market=US`;
    const res = await fetch(relatedTracksEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    // setTracks(json.tracks);
    return json.tracks;
  }

  const { data: artist, status: relatedArtistStatus } = useQuery(
    ["relatedArtist", id],
    () => getRelatedArtists(id),
    { enabled: !!id }
  );

  const { data: tracks, status: relatedTracksStatus } = useQuery(
    ["relatedArtistTracks", artist?.id],
    () => getArtistTracks(artist?.id),
    { enabled: !!artist?.id }
  );

  // useEffect(() => {
  //   if (artist) return;
  //   if (session && id) {
  //     getRelatedArtists(id);
  //   }
  // }, [session, id]);
  // useEffect(() => {
  //   if (tracks) return;
  //   if (session && relatedArtistId) {
  //     getArtistTracks(relatedArtistId);
  //   }
  // }, [session, relatedArtistId]);

  if (!artist) return <SkeletonRelatedArtist />;

  return (
    <div className=" w-full ">
      <div className="flex gap-5">
        <img
          width={200}
          height={200}
          alt="artist"
          src={artist.images[0].url || ""}
        />
        <div className="relative p-2 bg-opacity-20 bg-neutral-700 rounded-lg bg-transparent flex-1 flex gap-5 ">
          <h2 className="text-2xl font-bold">
            Popularity: {artist.popularity}
          </h2>
          <div className="flex flex-wrap justify-center ">
            {" "}
            <h2 className="text-2xl font-bold">Genres: </h2>
            <p>
              {artist.genres.map((genre, idx) => {
                if (idx === artist.genres.length - 1) {
                  return <span className="text-lg text-white">{genre}</span>;
                }
                return (
                  <span className="text-lg text-white">{genre + ", "}</span>
                );
              })}
            </p>
          </div>
        </div>
      </div>{" "}
      <h2 className="text-2xl text-white mb-5 mt-2 font-bold">
        {artist?.name}
      </h2>
      <div>
        {artist?.external_urls && (
          <Link href={artist?.external_urls?.spotify} target="_blank">
            {" "}
            <button className="text-xl rounded-lg p-2 bg-green-600 ">
              Browse on Spotify
            </button>
          </Link>
        )}
        {/* <button onClick={() => } className="p-2 bg-indigo-500 rounded-md text-white">
          Get New Related Artist
        </button> */}
        {/* artist track preview */}
        <div className="flex flex-col mt-5 mb-24 ">
          <div className="flex lg:justify-between lg:pr-[50%] justify-start">
            <h2 className="text-lg text-white mb-2">
              Top tracks - click to play preview
            </h2>
            <p>album</p>
          </div>
          {tracks &&
            tracks[0] !== null &&
            tracks?.map((track: Track) => {
              console.log(track);
              return (
                <div
                  onClick={() => {
                    playerRef.current.src = track.preview_url;
                    playerRef.current.play();
                    setSelectedTrack(track);
                    setIsPlaying(true);
                  }}
                  className="flex gap-5 cursor-pointer lg:pr-[50%] justify-start flex-col lg:justify-between  hover:bg-[#2c2c2c]  hover:bg-opacity-70 w-full sm:flex-row sm:items-center p-2"
                >
                  <div className="flex gap-5 items-center">
                    {" "}
                    <img
                      height={75}
                      width={75}
                      src={track.album.images[0].url}
                    />
                    <h3 className="text-white text-md">{track.name}</h3>
                  </div>
                  <p className="sm:block hidden">{track.album.name}</p>
                </div>
              );
            })}
        </div>
      </div>
      {/* Audio Player */}
      <AudioPlayer
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        ref={playerRef}
      />
    </div>
  );
}
