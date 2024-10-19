import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/user")) {
    const cookieStore = cookies();
    const user = cookieStore.get("access");

    const decodedToken =user&& jwtDecode(user.value); // Decode the token to get user info
    const currentTime = Date.now() / 1000;
  
    if (!user||decodedToken.exp < currentTime ) {
      // cookieStore.delete('access')
      // cookieStore.delete('refresh')
      return NextResponse.redirect(new URL("/logout", request.url));
    }
   
  }
  
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const cookieStore = cookies();

    const user = cookieStore.has("access");
 
  
    if (user) {
     
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};
