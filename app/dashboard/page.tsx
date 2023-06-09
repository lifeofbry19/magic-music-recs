//@ts-nocheck
import { SignInButton, SignOutButton } from "@/components/navigation/Buttons";
import { getServerSession } from "next-auth";
import DashboardDisplay from "@/components/dashboard/DashboardDisplay";

async function getPlaylists(session) {
  const response = await fetch("/api/playlists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

export default async function Dashboard() {
  const session = await getServerSession();

  //const playlists = await getPlaylists(session);
  //console.log(playlists);

  if (!session) {
    return (
      <div className=" w-full flex flex-col justify-center items-center gap-5">
        <p className="text-white">
          You need to sign in to see you profile stats.
        </p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className=" w-full flex justify-center items-center">
      {session && <DashboardDisplay user={session?.user} />}
    </div>
  );
}
