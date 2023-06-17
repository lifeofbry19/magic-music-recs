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
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  async function searchArtists(query: string) {
    if (query === "") return;
    setLoading(true);
    const removedWhitespaceStr = query.replace(/\s+/g, "");
    const spotifySearchApi = `https://api.spotify.com/v1/search?q=${removedWhitespaceStr}&type=artist&limit=10`;

    const res = await fetch(spotifySearchApi, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    setArtists(json.artists.items);
    setLoading(false);
  }
  const debouncedSearch = useCallback(debounce(searchArtists, 1500), []);

  useEffect(() => {
    if (session && query) {
      debouncedSearch(query);
    }
  }, [session, query]);
  return (
    <div className="w-full flex flex-col justify-center max-w-[1400px]   gap-5  p-5 items-center">
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        {" "}
        <Search query={query} setQuery={setQuery} setArtists={setArtists} />
      </div>
      {loading && (
        <div className="text-3xl flex flex-col justify-center items-center gap-8">
          Loading... <div className="text-3xl animate-bounce">🎶</div>
        </div>
      )}
      {artists && <ArtistList artists={artists} />}
    </div>
  );
}
