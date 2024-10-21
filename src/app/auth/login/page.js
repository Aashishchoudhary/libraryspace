"use client";
import Link from "next/link";
import styles from "./loginfor.module.css";
import { useEffect, useState ,useCallback } from "react";
import axios from "axios";
import { url } from "@/store/url";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
function Login() {
  const [cookie , setCookie] = useCookies()
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchLocalStorage = () => {
    setUsername(localStorage.getItem("phone"));
    console.log(localStorage.getItem("phone"))
  };
  const loginFunc = async () => {
    if (username.length < 10 || password.length < 8) {
      alert("Please fill the fields");
      return;
    }
    try {
      const response = await axios.post(
        `${url}/passlogin/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (response.status == 200) {
        setCookie('access' ,data.access , { path: '/' ,secure:true,
          sameSite: 'strict',maxAge: 60 * 60 * 24 * 90,})
        setCookie('refresh' ,data.refresh , { path: '/' ,secure:true, 
          sameSite: 'strict',maxAge: 60 * 60 * 24 * 90,})
        router.push("/user");
       
      }
    } catch (err) {
      console.log('dsf')
      alert(err.response?err.response.data.details:"something went wrong please try agin later");
      
    }
  };
 
  useEffect(()=>{
    fetchLocalStorage()
},[])
  return (
    <div className={styles.bgcolor}>
     
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username..."
           
            />

            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
           
            />
            <div className={styles.forgotpara}>
              <Link
                href="/auth/get-login-otp/"
                className={styles.forgotPassword}
              >
                Login with otp
              </Link>
              <Link href="/auth/send-password-otp/" className={styles.forgotPassword}>
                forgot password?
              </Link>
            </div>

            <button
              onClick={() => loginFunc()}
              type="submit"
              className={styles.loginBtn}
            >
              login
            </button>

            <p className={styles.signupPrompt}>
              or <Link href="/auth/get-signup-otp/">signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
