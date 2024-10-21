import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image"
import img from '../app/favicon.png'
function HomePage() {
  return (
    <div className={styles.bgcolor}>
      <div className={styles.btnContainer}>
        <Link className={styles.linkstyle} href={"/auth/login/"}>
          <button className={styles.btn}>Login</button>
        </Link>
        <Link className={styles.linkstyle} href={"/auth/get-signup-otp/"}>
          <button className={styles.btn}>Signup</button>
        </Link>
      </div>

      {/* Hero Section */}
      <header className={styles.hero}>
        <Image src={img} width={350}
                height={250}
                alt='logo'
></Image>
        <h1>Welcome to LibPot</h1>
        <p>Discover the best way to manage your Library efficiently.</p>
        <Link  href={"/auth/get-signup-otp/"} className={styles.ctaButton}>Get Started</Link>
      </header>
      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2>Features</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <h3>What we do</h3>
            <p>We Provide end to end solution to manage your library.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>What you will get</h3>
            <p>
              You will get seat management system , bill greation , data
              insights about seats.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Benifits</h3>
            <p>
              You will get early notificaton about payment , We will manage
              everything for you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Users Say</h2>
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <p>This service has transformed my library and now i can live tension free!</p>
            <h3>- Shiv <span className={styles.span}>Library owner from Sikar</span></h3>
          </div>
          <div className={styles.testimonialCard}>
            <p>Efficient, user-friendly, and an absolute Time saver!</p>
            <h4>- Subash <span className={styles.span}>Library owner from jaipur</span></h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.callToAction}>
        <h2>Ready to take the next step?</h2>
        <Link href={"/auth/get-signup-otp/"} className={styles.ctaButton}>Sign Up Now</Link>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 LibPot. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="/data/aboutus/">About Us</Link>
            <Link href="/data/contact-us">Contact</Link>
            <Link href="/data/faq">Faq</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
