"use client";

import axios from "axios";
import styles from "../login/loginfor.module.css";
import {useState ,useEffect} from "react";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";

function page() {
  
  const router= useRouter()
    
    const [username , setUsername]= useState('')




const getOtp=async()=>{
  try{
    await axios.post(`${url}/validate-phone-forgot/` ,{
      'username':username,
      
    },{headers: {
      "Content-Type": "application/json",
    }});

    alert("Otp Sent")

  router.push("/auth/verify-password-otp/");

  }
  catch(err){alert(err)}
}

    

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>
          Welcome <span className={styles.highlight}></span>
        </h1>
        <p className={styles.para}>Get Otp</p>

        <div className={styles.loginform} id="loginForm">
          <input
            className={styles.input}
            type="text"
            id="username"
            placeholder="username"
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
          />
          



          <button onClick={getOtp} type="submit" className={styles.loginBtn}>
            Get Otp
          </button>

         
        </div>
      </div>
    </div>
  );
}

export default page;
