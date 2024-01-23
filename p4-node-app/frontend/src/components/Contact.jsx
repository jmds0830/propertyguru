import styles from '../styles/Contact.module.css';

function Contact() {
  return (
    <>
      <div className={styles.contactBox}>
        <div className={styles.contactContainer}>
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p>Get the latest information on our property listings.</p>
          <div className={styles.name}>
            <input
              className={styles.inputName}
              type="text"
              placeholder="First Name*"
            />
            <input
              className={styles.inputName}
              type="text"
              placeholder="Last Name*"
            />
          </div>
          <div className={styles.email}>
            <input
              className={styles.inputEmail}
              type="text"
              placeholder="Email Address*"
            />
          </div>
          <div className={styles.number}>
            <input
              className={styles.inputNumber}
              type="text"
              placeholder="Contact Number*"
            />
          </div>
          <button className={styles.subscribeButton}>SUBSCRIBE</button>
        </div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}

export default Contact;
