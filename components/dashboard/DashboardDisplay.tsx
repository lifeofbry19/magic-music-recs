"use client";
import { SignOutButton } from "../navigation/Buttons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { mockData } from "../../utils/MockData";
import GenresChart from "./GenresChart";
import { calculateTopGenres } from "@/utils/calculateTopGenres";
import StatsTabs from "./StatsTabs";

interface Props {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

type TopGenres = {
  name: string;
  percentage: number;
}[];

export default function DashboardDisplay({ user }: Props) {
  const { data: session, status } = useSession();
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(mockData);
  const [topGenres, setTopGenres] = useState<TopGenres | null>(null);
  const [selectedTab, setSelectedTab] = useState(1);

  async function getTopArtists(term: string) {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=10`,
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
  useEffect(() => {
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
      getTopArtists("short_term").then((data) => {
        setArtists(data.items);
        const topGenres = calculateTopGenres(data.items);

        setTopGenres(topGenres);
      });

      //getTopTracks().then((data) => setTracks(data.items));
    }
  }, [session]);

  if (!artists || status === "loading")
    return (
      <div>
        <SignOutButton />
      </div>
    );

  return (
    <div className="px-10 mt-5">
      <div className="w-full flex flex-col lg:flex-row  gap-5  items-center">
        <h1 className="text-3xl font-bold">
          Hello, {session?.user && session?.user.name} here are your top genres{" "}
        </h1>
        <SignOutButton />
      </div>
      <div className="flex flex-col gap-5 mt-10">
        {topGenres && (
          <>
            <StatsTabs
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              getTopArtists={getTopArtists}
              setTopGenres={setTopGenres}
            />
            <GenresChart topGenres={topGenres} />
          </>
        )}
        {!topGenres && (
          <div className="flex justify-center items-center gap-5 text-3xl">
            Loading... <div className="text-3xl animate-bounce ">🎶</div>
          </div>
        )}
      </div>
    </div>
  );
}
