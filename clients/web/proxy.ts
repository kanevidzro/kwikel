// proxy.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function proxy(request: NextRequest) {
  // 1. Grab the cookie from the incoming request
  const cookie = request.headers.get("cookie") ?? "";

  // 2. Pass the cookie to our shared session helper
  // We wrap it in an object to match the HeadersInit type
  const isAuthenticated = await getSession({ cookie });

  if (!isAuthenticated) {
    // If unauthorized, clear the session cookie and boot to signin
    const redirectRes = NextResponse.redirect(new URL("/signin", request.url));
    redirectRes.cookies.delete("dug-session");
    return redirectRes;
  }

  // 3. If authenticated, proceed to the layout/page
  const response = NextResponse.next();
  return response;
}

export const config = {
  // Ensure the matcher covers the base routes AND their sub-paths
  matcher: ["/projects", "/projects/:path*", "/setting", "/setting/:path*"],
};
