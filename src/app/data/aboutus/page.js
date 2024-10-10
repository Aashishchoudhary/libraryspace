import Image from 'next/image';
import styles from './about-us.module.css' // Import the CSS module

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
        <div className={styles.imageSection}>
          <Image
            src="/team.jpg" // Replace with your own image URL
            alt="Our Team"
            width={500}
            height={300}
            className={styles.aboutImage}
          />
        </div>
      </section>
      <section className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to drive growth, empower communities, and create lasting value for our customers and stakeholders.
        </p>
      </section>
    </div>
  );
};

export default About;
