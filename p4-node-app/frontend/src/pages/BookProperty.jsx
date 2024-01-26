import { useState } from 'react';
import Layout from './Layout';
import styles from '../styles/BookProperty.module.css';

function BookProperty() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    propertyId: '',
    scheduleDate: '',
    scheduleTime: '',
    customerMessage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleBook() {
    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contact: formData.contact,
          propertyId: formData.propertyId,
          scheduleDate: formData.scheduleDate,
          scheduleTime: formData.scheduleTime,
          customerMessage: formData.customerMessage,
        }),
      });

      const result = await response.json();

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        propertyId: '',
        scheduleDate: '',
        scheduleTime: '',
        customerMessage: '',
      });
    } catch (error) {
      console.error('Error booking schedule', error.message);
    }
  }

  return (
    <>
      <Layout>
        <div className={styles.bookContainer}>
          <div className={styles.title}>
            <h1>SCHEDULE A</h1>
            <h1>PROPERTY VIEWING</h1>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputFirstName}
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name*"
              onChange={handleChange}
            />
            <input
              className={styles.inputLastName}
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name*"
              onChange={handleChange}
            />
            <input
              className={styles.inputEmail}
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email Address*"
              onChange={handleChange}
            />
            <input
              className={styles.inputNumber}
              type="text"
              name="contact"
              value={formData.contact}
              placeholder="Contact Number*"
              maxLength={11}
              onChange={handleChange}
            />
            <input
              className={styles.inputId}
              type="text"
              name="propertyId"
              value={formData.propertyId}
              placeholder="Property ID*"
              onChange={handleChange}
            />
            {/* <select className={styles.select}>
              <option selected disabled>
                Preferred Location
              </option>
              <option value="antipolo">Antipolo</option>
              <option value="batangas">Batangas</option>
              <option value="bulacan">Bulacan</option>
            </select> */}
            <span className={styles.chooseText}>
              Choose your preferred schedule:
            </span>
            <div className={styles.dateContainer}>
              <input
                className={styles.inputDate}
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleChange}
              />
              <input
                className={styles.inputTime}
                type="time"
                name="scheduleTime"
                value={formData.scheduleTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              className={styles.message}
              cols="10"
              rows="10"
              name="message"
              value={formData.customerMessage}
              placeholder="Message (optional)"
              onChange={handleChange}
            ></textarea>
            <div className={styles.buttonContainer}>
              <input
                type="submit"
                className={styles.sendMessageButton}
                onClick={() => handleBook()}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default BookProperty;
