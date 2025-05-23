'use client'
import HomePage from '@/components/HomePage';
import { jwtDecode } from 'jwt-decode';

import { useRouter } from 'next/navigation';
import {useCallback, useEffect} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

function Page() {
const router = useRouter()
const [token]= useCookies()
  



  const checkCookie=()=>{
    if(token.access){
      console.log('token' , jwtDecode(token.access).exp , Date.now() / 1000)
       router.push('/user')
      
    }
    
  }
useEffect(()=>{
checkCookie()
},[])

  return (
   <CookiesProvider defaultSetOptions={{ path: '/' }}>
 
 <HomePage/>

   </CookiesProvider>
    
  )
}

export default Page;
