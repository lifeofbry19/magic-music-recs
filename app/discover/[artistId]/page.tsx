type Props = {
  params: { artistId: string };
};

// fetch artist by id and get
// artist name, album image
// three tracks for playback

export default function DiscoverArtist({ params }: Props) {
  return (
    <div className="w-full p-5 flex flex-col justify-center items-center mt-16"></div>
  );
}
