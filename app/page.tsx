import Image from "next/image";
import NavMenu from "@/components/NavMenu";

interface Props {
  params: any;
}

export default function Home({ params }: Props) {
  console.log(params);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome to Magic Music Recs
    </main>
  );
}
