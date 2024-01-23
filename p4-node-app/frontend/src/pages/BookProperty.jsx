import Layout from './Layout';
import styles from '../styles/BookProperty.module.css';

function BookProperty() {
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
            <input
              className={styles.inputId}
              type="text"
              placeholder="Property ID (optional)"
            />
            <select className={styles.select}>
              <option selected disabled>
                Preferred Location
              </option>
              <option value="antipolo">Antipolo</option>
              <option value="batangas">Batangas</option>
              <option value="bulacan">Bulacan</option>
            </select>
            <span className={styles.chooseText}>
              Choose your preferred schedule:
            </span>
            <div className={styles.dateContainer}>
              <input className={styles.inputDate} type="date" />
              <input className={styles.inputTime} type="time" />
            </div>
            <textarea
              className={styles.message}
              cols="10"
              rows="10"
              placeholder="Message (optional)"
            ></textarea>
            <div className={styles.buttonContainer}>
              <button className={styles.sendMessageButton}>
                RESERVE SCHEDULE
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default BookProperty;
