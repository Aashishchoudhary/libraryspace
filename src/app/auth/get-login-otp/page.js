"use client";
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState } from "react";
import axios from "axios";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const getOtp = async () => {
    try {
      await axios.post(
        `${url}/send-login-otp/`,
        { username: username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem('phone', username)
      router.push('/auth/login-otp/')
    } catch (err) {
      alert(err);
    }
  };
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
            onChange={(e) => setUsername(e.target.value)}
           value={username}
          />
          <input
            disabled
            className={styles.inputdisbale}
            type="text"
            placeholder="otp..."
          />

          <Link href="#" className={styles.forgotPassword}>
            forgot password
          </Link>

          <button
            type="submit"
            onClick={() => getOtp()}
            className={styles.loginBtn}
          >
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
