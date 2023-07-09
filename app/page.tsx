import DiscoverPreview from "@/components/home/DiscoverPreview";
import StatsPreview from "@/components/home/StatsPreview";

interface Props {
  params: any;
}

export default function Home({ params }: Props) {
  return (
    <div className="w-full flex flex-col min-h-screen overflow-x-hidden">
      <div className="w-full flex  flex-col gap-6  p-4 lg:px-12">
        <h1 className="text-3xl z-10 font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-teal-300 to-indigo-600">
          Welcome to Magic Music Recs
        </h1>
        <p className="text-xl z-10 text-white">
          <em>
            learn more about your music taste and discover new artists closest
            to the music you already love
          </em>
        </p>

        {/* <HomeCarousel items={carouselData} /> */}
        <div className="flex flex-col lg:flex-row gap-2 group  w-full">
          <DiscoverPreview />
          <StatsPreview />
        </div>
      </div>
      <div className="xl:-mt-[650px] lg:-mt-[500px] hidden lg:block bg-[url('/layered-waves-purple.svg')] bg-center bg-no-repeat bg-cover aspect-video w-full"></div>
    </div>
  );
}
