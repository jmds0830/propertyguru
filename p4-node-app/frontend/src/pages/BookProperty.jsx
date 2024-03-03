import { useState } from 'react';
import Layout from './Layout';
import styles from '../styles/BookProperty.module.css';

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
      if (errors.email && errors.email === 'Invalid email format') {
        return;
      }

      const response = await fetch(
        'https://propertyguru-wtmh.onrender.com/book',
        {
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
        }
      );

      const result = await response.json();
      const updatedErrors = {};

      if (formData.firstName === '' && result.errors.firstName) {
        updatedErrors.firstName = result.errors.firstName;
      }

      if (formData.lastName === '' && result.errors.lastName) {
        updatedErrors.lastName = result.errors.lastName;
      }

      if (formData.email === '' && result.errors.email) {
        updatedErrors.email = result.errors.email;
      }

      if (errors.email === 'Invalid email format') {
        updatedErrors.email = errors.email;
      }

      if (formData.contact === '' && result.errors.contact) {
        updatedErrors.contact = result.errors.contact;
      }

      if (formData.propertyId === '' && result.errors.propertyId) {
        updatedErrors.propertyId = result.errors.propertyId;
      }

      if (formData.scheduleDate === '' && result.errors.scheduleDate) {
        updatedErrors.scheduleDate = result.errors.scheduleDate;
      }

      if (formData.scheduleTime === '' && result.errors.scheduleTime) {
        updatedErrors.scheduleTime = result.errors.scheduleTime;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setFormData(initialFormData);
        alert('Success! Your form was submitted successfully.');
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
        const response = await fetch(
          'https://propertyguru-wtmh.onrender.com/book',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              [name]: value,
            }),
          }
        );

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
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Invalid email format',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  return (
    <>
      <Layout>
        <img className={styles.coverPhoto} src="/cover2.jpg" alt="Cover" />
        <div className={styles.bookContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.title}>
              <h1>
                RESERVE A <br />
                VIEWING SCHEDULE
              </h1>
            </div>
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
              maxLength="11"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                const allowedKeys = [
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  'Backspace',
                  'Delete',
                  'ArrowLeft',
                  'ArrowRight',
                ];
                if (!allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
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
                  <span className={styles.errorDate}>
                    {errors.scheduleDate}
                  </span>
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
                  <span className={styles.errorTime}>
                    {errors.scheduleTime}
                  </span>
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
