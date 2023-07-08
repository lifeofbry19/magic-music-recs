import Link from "next/link";

export default function StatsPreview() {
  return (
    <Link
      className="relative border-[1px] border-gray-500 hover:bg-opacity-20 hover:border-white  rounded-lg bg-transparent flex-1 "
      href="/dashboard"
    >
      <div className="rounded-xl   ">
        {/* <div className="rounded-xl bg-repeat bg-[180px]  inset-0 box-border border-none opacity-[.025] bg-transparent absolute "></div> */}
        <div className="h-[500px] w-full  p-5 text-white">
          <div className="w-full bg-indigo-500 rounded-br-md rounded-tr -mx-5 p-2">
            <h2 className="text-white text-2xl">
              See interesting stats from your listening history
            </h2>
          </div>
          <div className="overflow-hidden flex gap-4 justify-center items-center mt-5">
            <img src="/chart.png" height={400} width={400} />
            {/* <iframe
              src="/stats-chart.gif"
              height={500}
              width={500}
              className="w-[400px] lg:w-[500px]"
            /> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
