import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchRelatedArtists(artistId: string) {
  // use the artist id
}

export function getRandomArtist(arr: Array<T>) {
  const randomIdx = Math.random() * arr.length - 1;
  return arr[Math.floor(randomIdx)];
}
