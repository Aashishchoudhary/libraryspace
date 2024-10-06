'use client'
// import { cookies } from 'next/headers'

import { useRouter } from "next/navigation";

// import { NextResponse } from 'next/server'



function page() {
    const router = useRouter()
    // const cookieStore = cookies()
    const logout=()=>{
        var now = new Date();
        
  var time = now.getTime();
  var expireTime = time - 1000*36000;
  now.setTime(expireTime);

  
 document.cookie=`authToken=null;expires=${now.toUTCString()};path='/'`

      
    return   router.push('/')

    }
    logout()
    
  return (
    <div>
      
    </div>
  )
}

export default page
