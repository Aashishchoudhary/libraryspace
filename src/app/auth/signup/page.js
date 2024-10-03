import Link from "next/link";
import styles from "./loginfor.module.css";
function page() {
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
              placeholder="phone"
              required
            />
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="email"
            required
          />

        <div className={styles.forgotpara}>
          <Link href="#" className={styles.forgotPassword}>
            Login with otp
          </Link>
          <Link href="#" className={styles.forgotPassword}>
            forgot password?
          </Link>
          </div>

          <button type="submit" className={styles.loginBtn}>
            login
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
