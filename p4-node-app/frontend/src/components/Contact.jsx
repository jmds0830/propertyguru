import { useState } from 'react';
import styles from '../styles/Contact.module.css';

function Contact() {
  const initialSubscriptionData = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
  };

  const [subscriptionData, setSubscriptionData] = useState(
    initialSubscriptionData
  );
  const [errors, setErrors] = useState({});

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: subscriptionData.firstName,
          lastName: subscriptionData.lastName,
          email: subscriptionData.email,
          contact: parseInt(subscriptionData.contact),
        }),
      });

      const result = await response.json();
      const updatedErrors = {};

      if (subscriptionData.firstName === '' && result.errors.firstName) {
        updatedErrors.firstName = result.errors.firstName;
      }

      if (subscriptionData.lastName === '' && result.errors.lastName) {
        updatedErrors.lastName = result.errors.lastName;
      }

      if (subscriptionData.email === '' && result.errors.email) {
        updatedErrors.email = result.errors.email;
      }

      if (subscriptionData.contact === '' && result.errors.contact) {
        updatedErrors.contact = result.errors.contact;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setSubscriptionData(initialSubscriptionData);
        alert('Success! Your form was submitted successfully.');
      }
    } catch (error) {
      console.error('Error submitting form', error.message);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

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
              name="firstName"
              value={subscriptionData.firstName}
              placeholder="First Name*"
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
            <input
              className={styles.inputName}
              type="text"
              name="lastName"
              value={subscriptionData.lastName}
              placeholder="Last Name*"
              onChange={handleChange}
            />
            {errors.lastNameName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
          <div className={styles.email}>
            <input
              className={styles.inputEmail}
              type="text"
              name="email"
              value={subscriptionData.email}
              placeholder="Email Address*"
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.number}>
            <input
              className={styles.inputNumber}
              type="text"
              name="contact"
              value={subscriptionData.contact}
              placeholder="Contact Number*"
              onChange={handleChange}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}
          </div>
          <button
            className={styles.subscribeButton}
            onClick={() => handleSubmit()}
          >
            SUBSCRIBE
          </button>
        </div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}

export default Contact;
