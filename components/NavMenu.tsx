import Link from "next/link";
import { SignInButton, SignOutButton } from "./Buttons";
import Image from "next/image";

export default function NavMenu() {
  return (
    <nav className="p-2 top-0 z-50 left-0  h-16 fixed  w-full flex  bg-white border  justify-between">
      <Link href="/" className="ml-5">
        <Image
          src="/Spotify_Icon_RGB_Black.png"
          alt="Spotify Logo"
          width={50}
          height={50}
        />
      </Link>
      <ul className="flex justify-center text-black gap-5 items-center mr-5">
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
