//@ts-nocheck
import { getUsersPlaylists } from "@/utils/spotify";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  // get access token from authorization header
  console.log("access token", accessToken);
  const accessToken = req.headers.cookie;
  //const sessionToken = req.cookies["next-auth.session-token"];
  //console.log("session token", sessionToken);
  const response = await getUsersPlaylists(accessToken);
  const { items } = await response.json();

  return NextResponse.json({ items });
};

export { handler as GET };
