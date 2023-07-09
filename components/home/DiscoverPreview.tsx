import Link from "next/link";
import HomeCarousel from "./HomeCarousel";
import { carouselData } from "@/lib/carouselData";

// bg-[rgba(123,96,199,0.13)]

export default function DiscoverPreview() {
  return (
    <Link
      className="relative border-[1px] border-gray-500 hover:bg-opacity-20 hover:border-white  rounded-lg bg-transparent flex-1 "
      href="/discover"
    >
      <div className="rounded-xl   ">
        {/* <div className="rounded-xl bg-repeat bg-[180px]  inset-0 box-border border-none opacity-[.025] bg-transparent absolute "></div> */}
        <div className="h-[500px] w-full  p-5 text-white">
          <div className="w-full bg-indigo-500 -mx-5 p-2 rounded-r-md rounded-tr">
            {" "}
            <h2 className="text-white text-2xl">
              Select an artist you already love, we'll show you another
            </h2>
          </div>
          <div className="w-full flex justify-center items-center mt-2">
            <p className=" z-10 text-lg  decoration-indigo-500 underline">
              choose from thousands of artists using our search tool
            </p>
          </div>
          <div className="overflow-hidden flex gap-4">
            <HomeCarousel items={carouselData} />
          </div>
        </div>
      </div>
    </Link>
  );
}
