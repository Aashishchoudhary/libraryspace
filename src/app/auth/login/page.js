"use client";
import Link from "next/link";
import styles from "./loginfor.module.css";
import { useState } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/store/auth/authSlice";
import { jwtDecode } from "jwt-decode";
function login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const loginFunc = async () => {
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
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log(data);
        dispatch(setAuthToken(data));
        dispatch(setUser(jwtDecode(data.access)));
      }
    } catch (err) {
      alert(err.response.data.details);
      console.log("err", err);
    }
  };
  
  return (
  <div className={ styles.bgcolor}>

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
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username..."
            required
            />

          <input
            className={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            />
          <div className={styles.forgotpara}>
            <Link href="/auth/get-login-otp/" className={styles.forgotPassword}>
              Login with otp
            </Link>
            <Link href="#" className={styles.forgotPassword}>
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

export default login;
