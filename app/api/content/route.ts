import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// generate an array of dummy data that has 10 objects, each with a title, slug, and content property
const data = Array.from({ length: 10 }, (_, i) => ({
  title: `Post ${i + 1}`,
  slug: `post-${i + 1}`,
  content: `This is the content of post ${i + 1}`,
}));

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json(data);
}
