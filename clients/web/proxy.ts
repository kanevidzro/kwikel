import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const res = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/:path*", "/setting/:path*"],
};
