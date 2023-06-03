"use clietnt";

export default function Search({ query, setQuery }: any) {
  const getArtistsList = async () => {
    // fetch artists using search query
  };
  return (
    <div className="flex justify-center items-center gap-5">
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        width="100"
        height="50"
        placeholder="Search for an artist"
        className="h-12 p-2 rounded-md"
      />
      <button className="h-12 p-2 text-center rounded-md bg-green-500">
        Search Artists
      </button>
    </div>
  );
}
