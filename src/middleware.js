import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/user")) {
    const cookieStore = cookies();
    const user = cookieStore.get("authToken");
    if (!user ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
   
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const cookieStore = cookies();

    console.log("path");
    const user = cookieStore.has("authToken")
   
    if (user) {
      console.log('dd')
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};
