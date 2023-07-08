import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-lg">
      <div className="flex shadow-sm  flex-col w-full max-w-[300px] items-center gap-2 p-4  bg-[#252525] bg-opacity-60 rounded-lg">
        <Skeleton className="shadow-lg rounded-lg w-[200px] h-[200px] " />
        <div></div>
        <Skeleton className="w-full h-[2rem]" />
      </div>{" "}
    </div>
  );
}
