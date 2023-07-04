import DiscoverPreview from "@/components/home/DiscoverPreview";
import StatsPreview from "@/components/home/StatsPreview";
import HomeCarousel from "@/components/home/HomeCarousel";

interface Props {
  params: any;
}

export default function Home({ params }: Props) {
  return (
    <div className="w-full flex min-h-screen flex-col gap-6 overflow-x-hidden  p-4 lg:px-12">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-teal-300 to-indigo-600">
        Welcome to Magic Music Recs
      </h1>
      <p className="text-xl text-white">
        <em>
          learn more about your music taste and discover new artists closest to
          the music you already love
        </em>
      </p>
      {/* <HomeCarousel items={carouselData} /> */}
      <div className="flex flex-col lg:flex-row gap-2 group  w-full">
        <DiscoverPreview />
        <StatsPreview />
      </div>
    </div>
  );
}
