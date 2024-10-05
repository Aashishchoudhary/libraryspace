'use client'
import HomePage from '@/components/HomePage';




import LogedUser from '@/components/LogedUser';
import { useState ,useEffect} from 'react';

function page() {
const [check , setCheck]= useState(false)
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  console.log(getCookie('authToken'))

  const cehckCookie=()=>{
    if(getCookie('authToken')!=null){
      setCheck(true)
    }
    else{
      setCheck(false)
    }
  }
useEffect(()=>{
  cehckCookie()
},[])
console.log(check)
  return (
   <>
 
 {check?<LogedUser/>:<HomePage/>}

   </>
    
  )
}

export default page;
