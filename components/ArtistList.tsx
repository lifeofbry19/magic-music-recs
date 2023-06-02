import ArtistCard from "./ArtistCard";

interface Artist {
  name: string;
  imageUrl: string;
  id: string;
}

interface Props {
  artists: Artist[];
}

export default function ArtistList({ artists }: Props) {
  return (
    <>
      {artists.map((artist) => (
        <ArtistCard artist={artist} />
      ))}
    </>
  );
}
