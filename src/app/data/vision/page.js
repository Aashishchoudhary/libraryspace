import styles from './careers.module.css'; // Import the CSS module

export const metadata = {
  title: "Our Vision",
  description: "",
};

const Careers = () => {
  return (
    <div className={styles.careersContainer}>
   
      <header className={styles.header}>
        <h1>Our Vision</h1>
        <p>To Help every library to manage  seats and optimal use of data to increase revenue.</p>
      </header>
      
      <section className={styles.jobSection}>
        <h2>Our future upadtes</h2>
        <ul className={styles.ul}>
        <li className={styles.li}>Increase visibility of library to nearby students through search find nearbby libraries </li>
        <li className={styles.li}>We will ensure AI based image learning recozination model to maintin arrival and departure of students and  New arrival notification to the you</li>
        </ul>
      </section>

    
    </div>
  );
};

export default Careers;
