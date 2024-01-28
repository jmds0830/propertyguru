import { useState } from 'react';
import Layout from './Layout';
import styles from '../styles/BookProperty.module.css';
import toast, { Toaster } from 'react-hot-toast';

function BookProperty() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    propertyId: '',
    scheduleDate: '',
    scheduleTime: '',
    customerMessage: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  async function handleBook() {
    try {
      const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contact: parseInt(formData.contact),
          propertyId: parseInt(formData.propertyId),
          scheduleDate: formData.scheduleDate,
          scheduleTime: formData.scheduleTime,
          customerMessage: formData.customerMessage,
        }),
      });

      const result = await response.json();

      if (response.status === 400 && result.errors) {
        setErrors(result.errors);
      } else {
        setFormData(initialFormData);
        setErrors({});
        toast.success('Schedule successfully booked!');
      }
    } catch (error) {
      console.error('Error booking schedule', error.message);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;

    if (value.trim() === '') {
      try {
        const response = await fetch('http://localhost:3000/book', {
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
        console.error(error.message);
      }
    }
  };

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
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
            <input
              className={styles.inputLastName}
              type="text"
              name="lastName"
              value={formData.lastName}
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
              value={formData.email}
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
              value={formData.contact}
              placeholder="Contact Number*"
              maxLength={11}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}
            <input
              className={styles.inputId}
              type="text"
              name="propertyId"
              value={formData.propertyId}
              placeholder="Property ID*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.propertyId && (
              <span className={styles.error}>{errors.propertyId}</span>
            )}
            <span className={styles.chooseText}>
              Choose your preferred schedule:
            </span>
            <div className={styles.dateContainer}>
              <div className={styles.date}>
                <input
                  className={styles.inputDate}
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.scheduleDate && (
                  <span className={styles.error}>{errors.scheduleDate}</span>
                )}
              </div>
              <div className={styles.time}>
                <input
                  className={styles.inputTime}
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.scheduleTime && (
                  <span className={styles.error}>{errors.scheduleTime}</span>
                )}
              </div>
            </div>
            <textarea
              className={styles.message}
              cols="10"
              rows="10"
              name="customerMessage"
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
