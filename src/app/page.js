'use client'
import HomePage from '@/components/HomePage';
import { getCookie } from '@/store/url';
import { useRouter } from 'next/navigation';
import {useEffect} from 'react';

function page() {
const router = useRouter()

  


  const cehckCookie=()=>{
    
    if(getCookie('authToken')!=null){
      router.push('/user')
    }
    
  }
useEffect(()=>{
  cehckCookie()
},[])

  return (
   <>
 
 <HomePage/>

   </>
    
  )
}

export default page;
