"use client";
import { calculateTopGenres } from "@/utils/calculateTopGenres";

export default function StatsTabs({
  selectedTab,
  setSelectedTab,
  getTopArtists,
  setTopGenres,
}: any) {
  const handleUpdateArtists = async (term: string) => {
    const data = await getTopArtists(term);
    const topGenres = calculateTopGenres(data.items);
    setTopGenres(topGenres);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <p className="mr-2">Select a time frame:</p>
      <div
        onClick={() => {
          handleUpdateArtists("short_term");
          setSelectedTab(1);
        }}
        className={`p-2 ${
          selectedTab === 1
            ? "bg-indigo-200 font-semibold border-indigo-600"
            : ""
        } cursor-pointer text-black rounded-sm  border-2 border-black bg-white`}
      >
        Last Month
      </div>
      <div
        onClick={() => {
          handleUpdateArtists("medium_term");
          setSelectedTab(2);
        }}
        className={`p-2 ${
          selectedTab === 2
            ? "bg-indigo-200 font-semibold border-indigo-600"
            : ""
        } cursor-pointer rounded-sm  text-black border-2 border-black bg-white`}
      >
        Last 6 Months
      </div>
      <div
        onClick={() => {
          handleUpdateArtists("long_term");
          setSelectedTab(3);
        }}
        className={`p-2 ${
          selectedTab === 3
            ? "bg-indigo-200 font-semibold border-indigo-600"
            : ""
        } cursor-pointer rounded-sm  text-black border-2 border-black bg-white`}
      >
        All Time
      </div>
    </div>
  );
}
