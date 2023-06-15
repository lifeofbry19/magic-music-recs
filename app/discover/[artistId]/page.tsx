import RelatedArtist from "@/components/RelatedArtist";

type Props = {
  params: { artistId: string };
};

// fetch artist by id and get
// artist name, album image
// three tracks for playback

export default function DiscoverArtist({ params }: Props) {
  console.log(params.artistId);

  return (
    <div className="w-full p-5 flex flex-col justify-center items-center mt-16">
      <RelatedArtist id={params?.artistId} />
    </div>
  );
}
