"use client";
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";
function VerifyPasswordOtp() {
  let [loading, setLoading] = useState(false);
  let [color] = useState("black");
  const router = useRouter();
  const [seconds, setSeconds] = useState(60);
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");
  const fetchLocalStorage = () => {
    setPhone(localStorage.getItem("phone"));
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "100px",
    marginBottom: "100vh",
  };
  const verifyOtp = async () => {
    try {
      setLoading(true)
      await axios.post(
        `${url}/validate-forgot-otp/`,
        {
          username: phone,

          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      router.push("/auth/change-forgot-password/");
    } catch (err) {
      setLoading(false)
      alert(err.response?err.response.data.details:"something went wrong please try agin later");
    }
  };
  const getOtp = async () => {
    try {
      await axios.post(
        `${url}/validate-phone-forgot/`,
        {
          username: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Otp Re-sent");
    } catch (err) {
      alert(err.response?err.response.data.details:"something went wrong please try agin later");
    }
  };
  const resendOtp = () => {
    getOtp();
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
 fetchLocalStorage()
    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div className={styles.container}>
    { loading? <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
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
      </div>}
    </div>
  );
}

export default VerifyPasswordOtp;
