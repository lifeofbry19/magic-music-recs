"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ArtistPreview({ user }: any) {
  const { data: session, status } = useSession();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    async function getPlaylists() {
      //TO DO: refactor api request to grab artist data by id with top tracks preview
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/artists",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  }, []);
  if (!artist) return <></>;
  return (
    <div>
      <h2>{artist.name}</h2>
      <Image width={200} height={200} alt="artist" src={artist.imageUrl} />
      <div>
        {/* artist track preview */}
        {tracks.map((track: any) => {
          <div className="flex flex-col bg-white ">
            <h3>{track.name}</h3>
            <audio src={track.url} controls />{" "}
            {/* get correct properties for track name/url/etc */}
          </div>;
        })}
      </div>
    </div>
  );
}
