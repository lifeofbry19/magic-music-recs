"use client";
import Link from "next/link";
import { SignInButton, DiscoverButton } from "./Buttons";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavMenu() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        hasScrolled ? " border-b-[1px] border-gray-500" : ""
      } p-2 top-0 z-50 left-0  h-16 sticky bg-[#161616] opacity-90  w-full flex  justify-between`}
    >
      <Link href="/" className="ml-5 flex justify-center gap-2 items-center">
        <div className="p-2 rounded-lg text-white h-10 w-10 flex justify-center border-black items-center text-lg font-semibold bg-gradient-to-r to-indigo-600 from-cyan-200">
          M
        </div>
        <p className="hidden sm:block">built with</p>
        <Image
          src="/Spotify_Logo_RGB_White.png"
          alt="Spotify Logo"
          width={100}
          height={100}
          className="hidden sm:block"
        />
      </Link>
      <div className="flex justify-center items-center gap-4">
        <DiscoverButton />
        <ul className="flex justify-center text-black gap-5 items-center mr-5">
          <li>
            <SignInButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}
