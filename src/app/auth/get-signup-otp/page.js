'use client'
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState } from "react";
import { url } from "@/store/url";

import { redirect } from 'next/navigation'
import axios from "axios";
function page() {
    const [phone , setPhone] = useState()
    const [email , setEmail] = useState()

    const getOtp=async()=>{
        const response = await axios.post(`${url}/` ,{
            'phone':phone,
            'email':email
        },
    {
        headers:{
              'Content-Type': 'application/json'
        }
    })
    const res= await response.data
    }
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
            placeholder="Phone number..."
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
           <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email.."
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
       

          <button onClick={()=>getOtp()} type="submit" className={styles.loginBtn}>
            Get Otp
          </button>

          <p className={styles.signupPrompt}>
           already have account ? <Link href="/auth/login/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
