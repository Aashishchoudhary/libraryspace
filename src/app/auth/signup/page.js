'use client'
import styles from "../login/loginfor.module.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter()
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchLocalStorage = () => {
    
    setEmail(localStorage.getItem("email"));
  };

  const signup=async()=>{
    try{ await axios.post(`${url}/register/` ,{
        'phone':phone,
        'email':email,
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
  useEffect(() => {
    
 fetchLocalStorage()
    
  }, []);

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
            value={email}
            placeholder="email"
            required
          />    
          <input
            className={styles.input}
            type="text"
            value={phone}
            placeholder="Phone number..."
            onChange={(e)=>setPhone(e.target.value)}
            maxlength="10"
            required
          />
          
          <input
            className={styles.input}
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* { check?<p  href="/" className={styles.forgotPassword}>
            resend
          </p>:seconds}
          */}
          <p className={styles.forgotPassword}>
            
            
          </p>

          <button onClick={signup} type="submit" className={styles.loginBtn}>
            signUp
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default Page;
