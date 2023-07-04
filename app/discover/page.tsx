import DiscoverDisplay from "@/components/discover/DiscoverDisplay";

export default function Discover() {
  return (
    <div className="w-full p-5 flex flex-col justify-start items-start gap-4 lg:px-12 ">
      <h1 className="text-3xl text-white">
        Discover Your Next Favorite Artist
      </h1>
      <p className="text-lg text-white">
        <em>
          {" "}
          type to{" "}
          <span className="decoration-indigo-500 underline">
            search for an artist you already know
          </span>{" "}
          and love, then simply
          <span className="decoration-indigo-500 underline">
            {" "}
            select that artist
          </span>{" "}
          and we'll show you another artist you might like
        </em>
      </p>
      <DiscoverDisplay />
    </div>
  );
}
