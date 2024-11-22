"use client";
import Link from "next/link";
import styles from "../login/loginfor.module.css";
import { useState } from "react";
import { url } from "@/store/url";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
function Page() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "100px",
    marginBottom: "100vh",
  };
  const router = useRouter();

  const [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [color] = useState("black");

  const getOtp = async () => {
    try {
      setLoading(true);
     
      await axios.post(
        `${url}/send-otp/`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      alert("Otp sent");

      localStorage.setItem("email", email);
      router.push("/auth/verify-user/");
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
            Signup <span className={styles.highlight}>Here</span>
          </h1>
          <p className={styles.para}>We will happy help you! </p>

          <div className={styles.loginform} id="loginForm">
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email.."
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              disabled={loading}
              onClick={() => getOtp()}
              type="submit"
              className={styles.loginBtn}
            >
              Get Otp
            </button>

            <p className={styles.signupPrompt}>
              already have account ? <Link href="/auth/login/">Login</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
