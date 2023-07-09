import { Skeleton } from "../ui/skeleton";

export default function SkeletonRelatedArtist() {
  return (
    <div className=" w-full ">
      <div className="flex gap-5">
        <Skeleton className="shadow-lg rounded-lg w-[200px] h-[200px] mb-5" />
        <div className="relative p-2 bg-opacity-20 bg-neutral-700 rounded-lg bg-transparent flex-1 flex gap-5 "></div>
      </div>
      <Skeleton className="md:w-[200px] w-[100px] h-[2rem]" />

      <div>
        {/* artist track preview */}
        <div className="flex flex-col mt-5 mb-24 ">
          <div className="flex lg:justify-between lg:pr-[50%] justify-start">
            <h2 className="text-lg text-white mb-2"></h2>
            <p></p>
          </div>
          <div className="flex flex-col gap-2">
            {
              //@ts-ignore
              [...Array(10).keys()].map((_, idx) => {
                return (
                  <Skeleton
                    key={idx}
                    className="flex h-[50px]  lg:pr-[50%] justify-start flex-col lg:justify-between  w-full sm:flex-row sm:items-center p-2"
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
