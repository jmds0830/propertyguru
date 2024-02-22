import { useNavigate } from 'react-router-dom';
import styles from '../styles/ViewProperties.module.css';

function viewProperties() {
  const navigate = useNavigate();

  const handleNavigateToProperties = () => {
    navigate('/properties');
  };
  return (
    <>
      <div className={styles.viewPropertiesBox}>
        <div className={styles.viewProperties}>
          <img
            className={styles.interiorImage}
            src="/interior.png"
            alt="Interior"
          />
          <div className={styles.viewPropertiesText}>
            <h2>FIND YOUR PERFECT HOME WITH US 🏠</h2>
            <p>Browse through our listings of properties for sale.</p>
            <button
              className={styles.searchButton}
              onClick={handleNavigateToProperties}
            >
              VIEW PROPERTIES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default viewProperties;
