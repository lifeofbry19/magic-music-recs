"use client";
import { useCallback, useState } from "react";
import Search from "./Search";
import ArtistList from "./ArtistList";
import { mockData } from "./MockData";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import debounce from "lodash/debounce";

export default function DiscoverDisplay() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState(null);
  const { data: session, status } = useSession();

  async function searchArtists(query: string) {
    if (query === "") return;
    const removedWhitespaceStr = query.replace(/\s+/g, "");
    const spotifySearchApi = `https://api.spotify.com/v1/search?q=${removedWhitespaceStr}&type=artist&limit=10`;
    console.log("query", query);
    const res = await fetch(spotifySearchApi, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    console.log(json);
    setArtists(json.artists.items);
  }
  const debouncedSearch = useCallback(debounce(searchArtists, 1500), []);

  useEffect(() => {
    if (session && query) {
      debouncedSearch(query);
    }
  }, [session, query]);
  return (
    <div className="w-full flex flex-col   gap-2 p-5 items-center">
      <Search query={query} setQuery={setQuery} setArtists={setArtists} />
      <button className="h-12 p-2 text-center rounded-md bg-green-500">
        Search Artists
      </button>
      {artists && <ArtistList artists={artists} />}
    </div>
  );
}
