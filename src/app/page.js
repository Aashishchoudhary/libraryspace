'use client'
import HomePage from '@/components/HomePage';

import { useRouter } from 'next/navigation';
import {useEffect} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

function page() {
const router = useRouter()
const [token]= useCookies()
  



  const cehckCookie=()=>{
    if(token.access){
      router.push('/user')
      
    }
    
  }
useEffect(()=>{
  cehckCookie()
},[])

  return (
   <CookiesProvider defaultSetOptions={{ path: '/' }}>
 
 <HomePage/>

   </CookiesProvider>
    
  )
}

export default page;
