import styles from './careers.module.css'; // Import the CSS module

const Careers = () => {
  return (
    <div className={styles.careersContainer}>
      <header className={styles.header}>
        <h1>Join Our Team</h1>
        <p>Explore exciting career opportunities and become part of our growing team!</p>
      </header>
      
      <section className={styles.jobSection}>
        <h2>Current Openings</h2>
        <p>we dont any job Openings</p>
      </section>

    
    </div>
  );
};

export default Careers;
