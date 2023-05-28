//@ts-nocheck
import { SignInButton, SignOutButton } from "@/components/Buttons";
import { getServerSession } from "next-auth";
import DashboardDisplay from "@/components/DashboardDisplay";

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
      <div className="mt-24 w-full flex flex-col justify-center items-center gap-5">
        <p>You need to sign in</p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="mt-24 w-full flex justify-center items-center">
      {session && <DashboardDisplay user={session?.user} />}
    </div>
  );
}
