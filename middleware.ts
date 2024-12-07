import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./src/utils/supabase";

export async function middleware(req: NextRequest) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/dashboard", "/resumes"], // Add your protected routes here
};
