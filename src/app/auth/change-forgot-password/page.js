"use client";

import styles from "../login/loginfor.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter()
  

  const [phone, setPhone] = useState("");
  
  const [password, setPassword] = useState("");
  const fetchLocalStorage = () => {
    setPhone(localStorage.getItem("phone"));
    
  };

  const changePassword=async()=>{
    try{ await axios.post(`${url}/change-forgot-password/` ,{
        'username':phone,        
        'password':password
    },
{
    headers:{
          'Content-Type': 'application/json'
    }
})

router.push('/auth/login/')
}
catch(err){alert(err.response?err.response.data.details:"something went wrong please try agin later")}
}
useEffect(()=>{
    fetchLocalStorage()
},[])


  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>
          verify <span className={styles.highlight}>otp</span>
        </h1>
        <p className={styles.para}>Your wait will worthy</p>

        <div className={styles.loginform} id="loginForm">
          <input
            className={styles.input}
            type="text"
            value={phone}
            placeholder="username"
            required
          />
          
          <input
            className={styles.input}
            type="text"
            placeholder="otp..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* { check?<p  href="/" className={styles.forgotPassword}>
            resend
          </p>:seconds}
          */}
          

          <button onClick={changePassword} type="submit" className={styles.loginBtn}>
            Verify
          </button>

          <p className={styles.signupPrompt}>
            or <a href="#">signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
