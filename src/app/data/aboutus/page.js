import Image from 'next/image';
import styles from './about-us.module.css' // Import the CSS module


export const metadata = {
  title: "About Us",
  description: "",
};
const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <header className={styles.header}>
        <h1>About Us</h1>
      </header>
      <section className={styles.aboutContent}>
        <div className={styles.textSection}>
          <h2>Who We Are</h2>
          <p>
            We are a dynamic team committed to providing the best services and solutions for our customers. Our focus is on innovation, collaboration, and excellence in every project we undertake.
          </p>
        </div>
        {/* <div className={styles.imageSection}>
          <Image
            src="/team.jpg" // Replace with your own image URL
            alt="Our Team"
            width={500}
            height={300}
            className={styles.aboutImage}
          />
        </div> */}
      </section>
      <section className={styles.aboutContainer}>
        <div className={styles.textSection}>

        <h2>Our Mission</h2>
        <p>
          Our mission is to drive growth, empower communities, and create lasting value for our customers and stakeholders.
        </p>
        </div>
      </section>
      <section className={styles.aboutContainer}>
        <div className={styles.textSection}>
          
        <h2>What we have Achived!</h2>
        <p style={{fontSize:'20px' }}>
          We Provide solution to <span style={{color:"green" , fontWeight:'bold',textDecoration:'underline' }}>1000+ libraries</span> all accross over India.
        </p>
        </div>
      </section>
    </div>
  );
};

export default About;
