'use client'
import HeaderPage from '@/components/HeaderPage';
import HomePage from '@/components/HomePage';



import LogedUser from '@/components/LogedUser';
import { getCookie } from '@/store/url';
import { useState ,useEffect} from 'react';

function page() {
const [check , setCheck]= useState(false)
  


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

  return (
   <>
 
 {check?<><HeaderPage/><LogedUser/></>:<HomePage/>}

   </>
    
  )
}

export default page;
