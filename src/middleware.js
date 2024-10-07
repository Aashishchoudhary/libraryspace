import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/user")) {
    console.log("running  8888");
    const cookieStore = cookies();
    const user = cookieStore.get("authToken");
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (user == "null") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const cookieStore = cookies();

    console.log("path");
    const user = cookieStore.has("authToken")
    console.log(user , '===')
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};
