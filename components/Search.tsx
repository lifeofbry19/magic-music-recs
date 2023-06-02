"use clietnt";

export default function Search({ query, setQuery }: any) {
  const getArtistsList = async () => {
    // fetch artists using search query
  };
  return (
    <div>
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        width="100"
        height="50"
      />
      <button>Search Artists</button>
    </div>
  );
}
