"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <button className="text-white">...</button>;

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <div className=" rounded-full h-12 w-12 flex justify-center items-center bg-white text-black text-xl">
          {/* TS does not expect session to have a token property, which is custom logic for Spotify auth */}
          {/*@ts-ignore */}
          {session?.user?.name && session?.user.name[0]}
        </div>
      </Link>
    );
  }

  return (
    <button
      className="h-12 w-20 rounded-md bg-white text-black"
      onClick={() => signIn("spotify")}
    >
      Sign In
    </button>
  );
}

export function DiscoverButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Link href={`/discover`}>
        <div className="  p-2 flex rounded-md justify-center items-center bg-indigo-600 text-white">
          Discover
        </div>
      </Link>
    );
  }

  return <></>;
}

export function SignOutButton() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") return <></>;

  return (
    <button
      className="p-2 rounded-md text-white bg-indigo-600 "
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
