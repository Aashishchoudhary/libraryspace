"use client";
import Link from "next/link";
import styles from "./loginfor.module.css";
import { useState } from "react";
import axios from "axios";
import { url } from "@/store/url";



import { useRouter } from 'next/navigation'
function login() {
 const router = useRouter()

 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

  const loginFunc = async () => {
     if(username.length<10 || password.length<8){
       alert("Please fill the fields")
       return
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
        document.cookie=`authToken=${JSON.stringify(data)};path='/';`;
      router.push('/user')


      }
    } catch (err) {
      alert(err);
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
