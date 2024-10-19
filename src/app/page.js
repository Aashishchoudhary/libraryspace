'use client'
import HomePage from '@/components/HomePage';
import { jwtDecode } from 'jwt-decode';

import { useRouter } from 'next/navigation';
import {useEffect} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

function page() {
const router = useRouter()
const [token]= useCookies()
  



  const cehckCookie=()=>{
    if(token.access){
      console.log('token' , jwtDecode(token.access).exp , Date.now() / 1000)
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
