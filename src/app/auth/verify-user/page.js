"use client";
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(60);
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const fetchLocalStorage = () => {
    setPhone(localStorage.getItem("phone"));
    setEmail(localStorage.getItem("email"));
  };

  const verifyOtp=async()=>{
    try{ await axios.post(`${url}/validate-otp/` ,{
        'phone':phone,
        'email':email,
        'otp':otp
    },
{
    headers:{
          'Content-Type': 'application/json'
    }
})

router.push('/auth/signup/')
}
catch(err){alert(err.response?err.response.data.details:"something went wrong please try agin later")}
}
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
alert("Otp Re-sent")
}
catch(err){alert(err)}
}
const resendOtp = () => {
  getOtp()
  setCheck(false);
  setSeconds(60);
};
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setCheck(true);
        clearInterval(intervalId);
      }
    }, 1000);
    fetchLocalStorage();
    return () => clearInterval(intervalId);
  }, [seconds]);


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
            value={email}
            placeholder="email"
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="otp..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {/* { check?<p  href="/" className={styles.forgotPassword}>
            resend
          </p>:seconds}
          */}
          <p className={styles.forgotPassword}>
            {check ? (
              <a onClick={() => resendOtp()} className={styles.forgotPassword}>
                Resend Otp
              </a>
            ) : (
              seconds + " - seconds"
            )}
          </p>

          <button onClick={verifyOtp} type="submit" className={styles.loginBtn}>
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
