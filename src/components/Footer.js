// components/Footer.js
'use client'
import Link from 'next/link';
import styles from './css/footer.module.css';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [token] =useCookies()
  const [isMounted , setIsMounted] = useState(false)
  useEffect(()=>{
    if(token.access){
      setIsMounted(true)
    }
  },[])
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.h3}>Company</h3>
          <ul className={styles.ul}>
            <li className={styles.li}><Link className={styles.a} href={'/data/aboutus'}>About Us</Link></li>
   
            <li className={styles.li}><a className={styles.a} href="/data/vision">Vision</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Help</h3>
          <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href="/data/contact-us/">Contact -us</a></li>
            {isMounted&&<li className={styles.li}><a className={styles.a} href="/data/feedback">Feedback</a></li>}
            <li className={styles.li}><a className={styles.a} href="/data/faq/">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} LibPot. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
