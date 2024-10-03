'use client'
import { initializeAsyncData } from '@/store/auth/authSlice'
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HomePage from '@/components/HomePage';
import LogedUser from '@/components/LogedUser';
import { redirect } from 'next/dist/server/api-utils';
function page() {
  const user = useSelector(state=>state.auth.authTokens)
  const dispatch = useDispatch();
  useEffect(() => {
  
    dispatch(initializeAsyncData());
}, [dispatch]);
if(user){
  // redirect('')
}
  return (
   <>
  
 {user?<LogedUser/>:<HomePage/>}
   </>
    
  )
}

export default page;
