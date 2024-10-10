import styles from './faq.module.css'; // Import the CSS module

const Faq = () => {
  return (
    <div className={styles.faqContainer}>
      <header className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions below.</p>
      </header>

      <section className={styles.faqSection}>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What is your return policy?</h3>
          <p className={styles.answer}>
            Our return policy allows returns within 30 days of receiving your item. Make sure the product is in its original condition.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>How long does shipping take?</h3>
          <p className={styles.answer}>
            Shipping usually takes 5-7 business days. International shipping may vary depending on the location.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>Can I change or cancel my order?</h3>
          <p className={styles.answer}>
            You can change or cancel your order within 24 hours of purchase. After this, the order will be processed for shipping.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.question}>How can I track my order?</h3>
          <p className={styles.answer}>
            Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.
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
