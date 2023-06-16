"use client";

export default function Search({ query, setQuery }: any) {
  return (
    <div className="flex justify-center items-center gap-5">
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        type="text"
        width="100"
        height="50"
        placeholder="Search for an artist"
        className="h-12 p-2 rounded-md text-black"
      />
    </div>
  );
}
