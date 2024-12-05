import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./src/utils/supabase"; // Adjust the path as necessary

export async function middleware(req: NextRequest) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in"; // Redirect to the sign-in page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/protected-route", "/another-protected-route"], // Add your protected routes here
};
