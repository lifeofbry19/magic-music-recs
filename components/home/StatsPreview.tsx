import Link from "next/link";

export default function StatsPreview() {
  return (
    <Link
      className="relative border-none flex-1 group-hover:bg-[#161616] rounded-xl hover:!bg-[rgba(158,135,218,0.04)] bg-[rgba(123,96,199,0.04)]"
      href="/discover"
    >
      <div className="rounded-xl  border border-black ">
        <div className="rounded-xl bg-repeat bg-[180px] bg-[url('/noise.png')]  inset-0 box-border border-none opacity-[.025] bg-transparent absolute "></div>
        <div className="h-[500px] w-full  p-5 text-white">
          <h2 className="text-white text-2xl">
            See interesting stats from your listening history
          </h2>
          <div className="overflow-hidden flex gap-4"></div>
        </div>
      </div>
    </Link>
  );
}
