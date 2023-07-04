"use client";
import { SignOutButton } from "../navigation/Buttons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaylistsDisplay from "./TopArtistsDisplay";
import TopTracksDisplay from "./TopTracksDisplay";
import { mockData } from "../../utils/MockData";
import TopArtistsDisplay from "./TopArtistsDisplay";

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
  const [tracks, setTracks] = useState(mockData);

  useEffect(() => {
    async function getTopArtists() {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();

      return data;
    }

    async function getTopTracks() {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();

      return data;
    }

    if (session) {
      getTopArtists().then((data) => setArtists(data.items));
      getTopTracks().then((data) => setTracks(data.items));
    }
  }, [session]);

  return (
    <div className="px-10">
      <div className="w-full flex flex-col lg:flex-row  gap-5  items-center">
        <h1 className="text-3xl font-bold">
          Hello, {session?.user && session?.user.name} Here are your top artists
          and tracks{" "}
        </h1>
        <SignOutButton />
      </div>
      <div className="flex flex-col gap-10">
        <h3>Top Artists</h3>
        {artists && <TopArtistsDisplay artists={artists} />}
        <h3>Top Tracks</h3>
        {tracks && <TopTracksDisplay tracks={tracks} />}
      </div>
    </div>
  );
}
