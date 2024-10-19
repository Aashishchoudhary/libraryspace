"use client";
// import { cookies } from 'next/headers'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

// import { NextResponse } from 'next/server'

function page() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const router = useRouter();
  // const cookieStore = cookies()
  const logout = () => {
    
removeCookie('access')
removeCookie('refresh')
   

    return router.push("/");
  };
  useEffect(()=>{ logout();},[])
 

  return <div></div>;
}

export default page;
