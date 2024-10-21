"use client";
import { useEffect, useState ,useCallback } from "react";
import Image from "next/image";
import styles from "./header.module.css";
import img from "../app/favicon.png";

import Link from "next/link";
 import { useCookies } from "react-cookie";

function HeaderPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [token] = useCookies();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };
  useEffect(() => {
   setIsMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 720px)");

    // Attach the event listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Trigger the handler initially
    handleMediaQueryChange(mediaQuery);
   
    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  }, []);

  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.imgDiv}>
          <Image className={styles.imageData} src={img} alt="logo" />
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.button} onClick={() => toggleNav()}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {isMounted&&(!isSmallScreen || isNavVisible) && 
          <ul className={styles.mainContainer}>
            {token.access ? 
              <>
                <li className={styles.listItem}>
                  <Link href="/user">Home</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/data/aboutus">About Us</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/data/contact-us/">Conatct</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/user/add-library">Add Library</Link>
                </li>
                {/* <li className={styles.listItem}>
                  <Link href="">Subscription</Link>
                </li> */}
                <li className={styles.listItem}>
                  <Link href={"/logout"}>Logout</Link>
                </li>
              </>
             : 
              <>
              <li className={styles.listItem}>
                  <Link href="/user">Home</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/data/aboutus">About Us</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/data/contact-us/">Conatct</Link>
                </li>
                <li className={styles.listItem}>
                  <Link  href={"/auth/login"}>
                    Login
                  </Link>
                </li>
                <li className={styles.listItem}>
                  <Link
                  
                    href={"/auth/get-signup-otp"}
                  >
                    Signup
                  </Link>
                </li>
              </>
            }
          </ul>
        }
      </nav>
    </header>
  );
}

export default HeaderPage;
