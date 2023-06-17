//@ts-nocheck
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import Link from "next/link";
import { getRandomArtist } from "@/lib/utils";
import { carouselData } from "@/lib/carouselData";

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
  const [artist, setArtist] = useState<Artist>(null);
  const [tracks, setTracks] = useState<Tracks>(null);
  const [relatedArtistId, setRelatedArtistId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  //if (status === "loading") return <>Loading...</>;

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
    setArtist(randomArtist);
    setRelatedArtistId(randomArtist?.id);
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

    setTracks(json.tracks);
  }

  const debouncedGetRelatedArtists = useCallback(
    debounce(getRelatedArtists, 1500),
    []
  );
  const debouncedGetTracks = useCallback(debounce(getArtistTracks, 1500), []);

  useEffect(() => {
    if (artist) return;
    if (session && id) {
      debouncedGetRelatedArtists(id);
    }
  }, [session, id]);
  useEffect(() => {
    if (tracks) return;
    if (session && relatedArtistId) {
      debouncedGetTracks(relatedArtistId);
    }
  }, [session, relatedArtistId]);

  if (!artist)
    return (
      <div className="text-3xl flex flex-col justify-center items-center gap-8">
        Getting related artist...{" "}
        <div className="text-3xl animate-bounce">🎶</div>
      </div>
    );
  return (
    <div className="mt-10 w-full ">
      <img
        width={400}
        height={400}
        alt="artist"
        src={artist.images[0].url || ""}
      />
      <h2 className="text-3xl mb-5 mt-2">{artist?.name}</h2>
      <div>
        {artist?.external_urls && (
          <Link href={artist?.external_urls?.spotify}>
            {" "}
            <button className="text-2xl rounded-lg p-2 bg-green-500 ">
              Browse Discography on Spotify
            </button>
          </Link>
        )}
        {/* artist track preview */}
        <div className="flex flex-col mt-5 mb-24 ">
          <h2 className="text-xl mb-2">Top tracks - click to play preview</h2>
          {tracks &&
            tracks[0] !== null &&
            tracks?.map((track: Track) => {
              return (
                <div
                  onClick={() => setSelectedTrack(track)}
                  className="flex gap-5 cursor-pointer flex-col border hover:bg-gray-900 hover:bg-opacity-70 w-full sm:flex-row items-center p-5"
                >
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
                    class="lucide lucide-play"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <h3 className="text-white text-xl">{track.name}</h3>
                </div>
              );
            })}
        </div>
      </div>
      {/* Audio Player */}
      <div className="w-screen z-50   fixed  p-5 bg-opacity-60 bottom-0 left-0 justify-center gap-12 h-16 bg-black flex flex-col sm:flex-row items-center">
        <h3 className="text-xl">{selectedTrack?.name || ""}</h3>
        <audio controls src={selectedTrack?.preview_url || ""}></audio>
      </div>
    </div>
  );
}
