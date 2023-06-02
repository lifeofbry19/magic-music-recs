"use client";
import { useState } from "react";
import Search from "./Search";
import ArtistList from "./ArtistList";

export default function DiscoverDisplay() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState(null);
  return (
    <>
      <Search query={query} setQuery={setQuery} setArtists={setArtists} />
      {artists && <ArtistList artists={artists} />}
    </>
  );
}
