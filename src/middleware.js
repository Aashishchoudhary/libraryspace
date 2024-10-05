import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const cookieStore = cookies()
  console.log('running')
    const user = cookieStore.get('authToken')
   if(!user){

     return   NextResponse.redirect(new URL('/', request.url))
   }
   
  
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher: '/user/:path*',
 }