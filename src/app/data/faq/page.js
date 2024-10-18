import styles from './faq.module.css'; // Import the CSS module

export const metadata = {
  title: "Faq",
  description: "",
};
const Faq = () => {
  return (
    <div className={styles.faqContainer}>
      <header className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions below.</p>
      </header>

      <section className={styles.faqSection}>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What is your  policy?</h3>
          <p className={styles.answer}>
           Our priority to make your data is not visible to anyone , Even we can not see your data.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>How Long it take to activate your account?</h3>
          <p className={styles.answer}>
           In  fraction of Secoond your activate will be activated and you can add you data
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>How many libraries can we add</h3>
          <p className={styles.answer}>
            You can add 5 libraries , if you want more we will do this for you
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>what will be the subscription charges</h3>
          <p className={styles.answer}>
            It is completly Free
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>Do you offer customer support?</h3>
          <p className={styles.answer}>
            Yes, we offer 24/7 customer support. You can reach out to us via our contact page, email, or phone number.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Faq;
