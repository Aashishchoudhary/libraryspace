"use client";

import axios from "axios";
import styles from "../login/loginfor.module.css";
import {useState ,useEffect} from "react";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie';
function Page() {
  const [ setCookie] = useCookies();
  const router= useRouter()
    const [seconds, setSeconds] = useState(60);
    const [check , setCheck] = useState(false)
    const [username , setUsername]= useState('')
const [otp ,setOtp] = useState('')

function fectchLocalStorage(){
 setUsername(localStorage.getItem('phone'))
 
}
const loginfun=async()=>{
  try{
    const response =await axios.post(`${url}/login-with-otp/` ,{
      'username':username,
      "otp":otp
    },{headers: {
      "Content-Type": "application/json",
    }});
const data = await response.data;
if (response.status == 200) {
 
  
  setCookie('access' ,data.access , { path: '/' ,secure:true,
    sameSite: 'strict',maxAge: 60 * 60 * 24 * 90,})
  setCookie('refresh' ,data.refresh ,  { path: '/' ,secure:true,
    sameSite: 'strict',maxAge: 60 * 60 * 24 * 90,})
  router.push("/user");
}
  }
  catch(err)
  {
    
    alert(err.response?err.response.data.details:"something went wrong please try agin later")}
}

const getOtp = async () => {
  try {
    await axios.post(
      `${url}/send-login-otp/`,
      { username: username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
  } catch (err) {
    alert(err.response?err.response.data.details:"something went wrong please try agin later");
  }
};
const resendOtp=()=>{
  getOtp()
    setCheck(false)
    setSeconds(120)
}
    useEffect(() => {
      fectchLocalStorage()
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
            setCheck(true)
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [seconds ]);
    

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>
          Welcome <span className={styles.highlight}>back</span>
        </h1>
        <p className={styles.para}>Glad to see you again!</p>

        <div className={styles.loginform} id="loginForm">
          <input
            className={styles.input}
            type="text"
            id="username"
            placeholder="username"
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
          />
          <input
           
            className={styles.input}
            type="text"
            placeholder="otp..."
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
          />


         {/* { check?<p  href="/" className={styles.forgotPassword}>
            resend
          </p>:seconds}
          */}
         <p className={styles.forgotPassword}>{check? <button onClick={()=>resendOtp()} className={styles.resendBtn}>
          Resend Otp
          </button>:seconds +' - seconds'}</p> 

          <button onClick={loginfun} type="submit" className={styles.loginBtn}>
            login
          </button>

         
        </div>
      </div>
    </div>
  );
}

export default Page;
