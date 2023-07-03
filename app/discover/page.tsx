import DiscoverDisplay from "@/components/discover/DiscoverDisplay";

export default function Discover() {
  return (
    <div className="w-full p-5 flex flex-col justify-center items-center mt-16">
      <h1 className="text-3xl">Discover Your Next Favorite Artist</h1>
      <DiscoverDisplay />
    </div>
  );
}
