import ArtistCard from "./ArtistCard";

interface Artist {
  name: string;
  image: string;
  id?: string;
}

interface Props {
  artists: Artist[];
}

export default function ArtistList({ artists }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {artists.map((artist) => (
        <ArtistCard artist={artist} />
      ))}
    </div>
  );
}
