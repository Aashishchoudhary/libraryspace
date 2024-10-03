"use client";
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import {useState ,useEffect} from "react";
function page() {
    const [seconds, setSeconds] = useState(6);
    const [check , setCheck] = useState(false)

    useEffect(() => {
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
    
const resendOtp=()=>{
    setCheck(false)
    setSeconds(6)
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
            placeholder="username"
            required
          />
          <input
           
            className={styles.input}
            type="text"
            placeholder="otp..."
          />


         {/* { check?<p  href="/" className={styles.forgotPassword}>
            resend
          </p>:seconds}
          */}
         <p className={styles.forgotPassword}>{check? <a onClick={()=>resendOtp()} className={styles.forgotPassword}>
          Resend Otp
          </a>:seconds +' - seconds'}</p> 

          <button type="submit" className={styles.loginBtn}>
            Get Otp
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
