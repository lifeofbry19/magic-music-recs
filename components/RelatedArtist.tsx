"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";
import { getRandomArtist } from "@/lib/utils";

type Id = string;

type Artist = {
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
    console.log(json);
    const randomArtist = getRandomArtist(json.artists);
    setArtist(randomArtist);
  }

  async function getArtistTracks(id: string) {
    if (!id) return;
    const relatedArtistsEndpoint = `https://api.spotify.com/v1/tracks?ids=${id}`;
    const res = await fetch(relatedArtistsEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    console.log(json);

    setTracks(json.tracks);
  }

  const debouncedGetRelatedArtists = useCallback(
    debounce(getRelatedArtists, 1500),
    []
  );
  const debouncedGetTracks = useCallback(debounce(getArtistTracks, 1500), []);

  useEffect(() => {
    if (session && id) {
      debouncedGetRelatedArtists(id);
      debouncedGetTracks(id);
    }
  }, [session, id]);

  if (!artist)
    return (
      <div className="text-3xl flex flex-col justify-center items-center gap-8">
        Getting related artist...{" "}
        <div className="text-3xl animate-bounce">🎶</div>
      </div>
    );
  return (
    <div className="mt-10 ">
      <h2 className="text-3xl mb-5">{artist?.name}</h2>
      <img
        width={400}
        height={400}
        alt="artist"
        src={artist?.images[0].url || ""}
      />
      <div>
        {artist?.external_urls && (
          <Link href={artist?.external_urls?.spotify}>
            {" "}
            <h2 className="text-2xl">Browse Discography on Spotify</h2>
          </Link>
        )}
        {/* artist track preview */}
        {tracks &&
          tracks?.map((track: Track) => {
            return (
              <div className="flex flex-col bg-white ">
                <h3>{track.name}</h3>
                <audio src={track?.preview_url} controls /> get correct
                properties for track name/url/etc
              </div>
            );
          })}
      </div>
    </div>
  );
}
