import Layout from './Layout';
import styles from '../styles/ContactPage.module.css';

function ContactPage() {
  return (
    <>
      <Layout>
        <img className={styles.coverPhoto} src="/cover2.jpg" alt="Cover" />
        <h1 className={styles.contactTitle}>CONTACT US</h1>
        <div className={styles.contactContainer}>
          <div className={styles.contactText}>
            <p>
              At PropertyGuru, we hold integrity and passion as the cornerstones
              of our services. We aim to not only provide the best real estate
              deals and services, but to also bring positive changes into each
              home owner’s life.
            </p>
            <p>
              Purchasing a home is a big life decision, and we're here to make
              the process easy and enjoyable for you. We'll help you find your
              next home through our most trusted and reliable real estate
              advisors.
            </p>
            <p>
              Fill-out the contact form below and we will get in touch with you.
            </p>
          </div>

          <div className={styles.inputContainer}>
            <h3>CONTACT FORM</h3>
            <input
              className={styles.inputFirstName}
              type="text"
              placeholder="First Name*"
            />
            <input
              className={styles.inputLastName}
              type="text"
              placeholder="Last Name*"
            />
            <input
              className={styles.inputEmail}
              type="text"
              placeholder="Email Address*"
            />
            <input
              className={styles.inputNumber}
              type="text"
              placeholder="Contact Number*"
            />
            <select className={styles.select}>
              <option value="buyer">Property Buyer</option>
              <option value="seller">Property Seller</option>
            </select>
            <textarea
              className={styles.message}
              cols="10"
              rows="10"
              placeholder="Message (optional)"
            ></textarea>
            <div className={styles.buttonContainer}>
              <input type="submit" className={styles.sendMessageButton} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ContactPage;
