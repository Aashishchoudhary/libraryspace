'use client'
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState } from "react";
import { url } from "@/store/url"

import axios from "axios";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter()
    const [phone , setPhone] = useState("")
    const [email , setEmail] = useState("")

    const getOtp=async()=>{
        try{ await axios.post(`${url}/send-otp/` ,{
            'phone':phone,
            'email':email
        },
    {
        headers:{
              'Content-Type': 'application/json'
        }
    })
    alert('Otp sent')
    localStorage.setItem("phone",phone)
    localStorage.setItem("email",email)
    router.push('/auth/verify-user/')
  }
  catch(err){alert(err.response?err.response.data.details:"something went wrong please try agin later")}
    }
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>
         Signup <span className={styles.highlight}>Here</span>
        </h1>
        <p className={styles.para}>We will happy help you! </p>

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
