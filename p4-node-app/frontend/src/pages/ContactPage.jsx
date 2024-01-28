import { useState } from 'react';
import Layout from './Layout';
import styles from '../styles/ContactPage.module.css';

function ContactPage() {
  const initialContactData = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    customerType: '',
    customerMessage: '',
  };

  const [contactData, setContactData] = useState(initialContactData);
  const [errors, setErrors] = useState({});

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          contact: parseInt(contactData.contact),
          customerType: contactData.customerType,
          customerMessage: contactData.customerMessage,
        }),
      });

      const result = await response.json();
      const updatedErrors = {};

      if (contactData.firstName === '' && result.errors.firstName) {
        updatedErrors.firstName = result.errors.firstName;
      }

      if (contactData.lastName === '' && result.errors.lastName) {
        updatedErrors.lastName = result.errors.lastName;
      }

      if (contactData.email === '' && result.errors.email) {
        updatedErrors.email = result.errors.email;
      }

      if (contactData.contact === '' && result.errors.contact) {
        updatedErrors.contact = result.errors.contact;
      }

      if (contactData.customerType === '' && result.errors.customerType) {
        updatedErrors.customerType = result.errors.customerType;
      }

      if (contactData.customerMessage === '' && result.errors.customerMessage) {
        updatedErrors.customerMessage = result.errors.customerMessage;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setContactData(initialContactData);
      }
    } catch (error) {
      console.error('Error submitting form', error.message);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;

    if (value.trim() === '') {
      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [name]: value,
          }),
        });

        const result = await response.json();

        if (result.errors && result.errors[name]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: result.errors[name],
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

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
              name="firstName"
              value={contactData.firstName}
              placeholder="First Name*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
            <input
              className={styles.inputLastName}
              type="text"
              name="lastName"
              value={contactData.lastName}
              placeholder="Last Name*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
            <input
              className={styles.inputEmail}
              type="text"
              name="email"
              value={contactData.email}
              placeholder="Email Address*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
            <input
              className={styles.inputNumber}
              type="text"
              name="contact"
              value={contactData.contact}
              placeholder="Contact Number*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}
            <select
              className={styles.select}
              name="customerType"
              value={contactData.customerType}
              onChange={handleChange}
            >
              <option value="" selected disabled>
                Customer Type
              </option>
              <option value="Buyer">Property Buyer</option>
              <option value="Seller">Property Seller</option>
            </select>
            {errors.customerType && (
              <span className={styles.error}>{errors.customerType}</span>
            )}
            <textarea
              className={styles.message}
              cols="10"
              rows="10"
              name="customerMessage"
              value={contactData.customerMessage}
              placeholder="Message* (required)"
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.customerMessage && (
              <span className={styles.error}>{errors.customerMessage}</span>
            )}
            <div className={styles.buttonContainer}>
              <input
                type="submit"
                className={styles.sendMessageButton}
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ContactPage;
