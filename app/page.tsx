import Image from "next/image";
import NavMenu from "@/components/navigation/NavMenu";
import HomeCarousel from "@/components/home/HomeCarousel";
import { mockData } from "@/utils/MockData";
import { carouselData } from "@/lib/carouselData";

interface Props {
  params: any;
}

export default function Home({ params }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 overflow-x-hidden p-24">
      <h1 className="text-3xl">Welcome to Magic Music Recs</h1>
      <p className="text-xl ">
        <em>discover new artists closest to the music you already love</em>
      </p>
      <HomeCarousel items={carouselData} />
    </main>
  );
}
