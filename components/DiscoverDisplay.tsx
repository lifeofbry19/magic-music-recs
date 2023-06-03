"use client";
import { useState } from "react";
import Search from "./Search";
import ArtistList from "./ArtistList";
import { mockData } from "./MockData";

export default function DiscoverDisplay() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState(mockData);
  return (
    <div className="w-full flex flex-col   gap-2 p-5 items-center">
      <Search query={query} setQuery={setQuery} setArtists={setArtists} />
      {artists && <ArtistList artists={artists} />}
    </div>
  );
}
