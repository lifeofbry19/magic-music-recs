type T = {
  images: { url: string }[];
  external_urls: { spotify: string };
  name: string;
  tracks: Track[];
} | null;

type Track = {
  url: string;
  name: string;
};

export function getRandomArtist(arr: Array<T>) {
  const randomIdx = Math.random() * arr.length - 1;
  return arr[Math.floor(randomIdx)];
}
