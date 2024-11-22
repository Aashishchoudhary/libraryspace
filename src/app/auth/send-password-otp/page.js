"use client";

import axios from "axios";
import styles from "../login/loginfor.module.css";
import { useState } from "react";
import { url } from "@/store/url";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";
function Page() {
  let [loading, setLoading] = useState(false);
  let [color] = useState("black");
  const router = useRouter();

  const [username, setUsername] = useState("");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "100px",
    marginBottom: "100vh",
  };

  const getOtp = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${url}/validate-phone-forgot/`,
        {
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Otp Sent");

      router.push("/auth/verify-password-otp/");
    } catch (err) {
      alert(
        err.response
          ? err.response.data.details
          : "something went wrong please try agin later"
      );
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className={styles.loginBox}>
          <h1 className={styles.heading}>
            Welcome <span className={styles.highlight}></span>
          </h1>
          <p className={styles.para}>Get Otp</p>

          <div className={styles.loginform} id="loginForm">
            <input
              className={styles.input}
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={getOtp} type="submit" className={styles.loginBtn}>
              Get Otp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
