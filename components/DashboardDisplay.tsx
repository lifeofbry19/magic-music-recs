"use client";
import { SignOutButton } from "./Buttons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaylistsDisplay from "./PlaylistsDisplay";
import TopTracksDisplay from "./TopTracksDisplay";

interface Props {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function DashboardDisplay({ user }: Props) {
  const { data: session, status } = useSession();
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    async function getPlaylists() {
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

    async function getTracks() {
      const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    }

    if (session) {
      //getPlaylists().then((data) => setArtists(data.items));
      //getTracks().then((data) => setTracks(data.items));
    }
  }, [session]);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Hello, {session?.user && session?.user.name} Here are your top artists{" "}
        </h1>
        <SignOutButton />
      </div>
      {artists && <PlaylistsDisplay artists={artists} />}
      {tracks && <TopTracksDisplay tracks={tracks} />}
    </div>
  );
}
