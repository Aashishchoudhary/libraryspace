import styles from './contact-us.module.css' // Import the CSS module
import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Import icons for styling

export const metadata = {
  title: "Contact Us",
  description: "",
};

const Contact = () => {
  const whatsappNumber = '+916367032851'; // Replace with your WhatsApp number
  const phoneNumber = '+916367032851'; // Replace with your phone number
  const emailAddress = 'aashishchoudhary2202@gmail.com'; // Replace with your email

  return (
    <div className={styles.contactContainer}>
      <header className={styles.header}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us through any of the methods below.</p>
      </header>

      <section className={styles.contactSection}>
        {/* Contact via Phone */}
        <div className={styles.contactItem}>
          <FaPhoneAlt className={styles.icon} />
          <div className={styles.contactDetails}>
            <h3>Phone</h3>
            <p>
              <Link href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </Link>
            </p>
          </div>
        </div>

        {/* Contact via WhatsApp */}
        <div className={styles.contactItem}>
          <FaWhatsapp className={styles.icon} />
          <div className={styles.contactDetails}>
            <h3>WhatsApp</h3>
            <p>
              <Link href={`https://wa.me/${whatsappNumber.replace('+', '')}`} target="_blank">
                Send a message on WhatsApp
              </Link>
            </p>
          </div>
        </div>

        {/* Contact via Email */}
        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} />
          <div className={styles.contactDetails}>
            <h3>Email</h3>
            <p>
              <Link href={`mailto:${emailAddress}`}>
                {emailAddress}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
