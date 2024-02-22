import { useNavigate } from 'react-router-dom';
import styles from '../styles/PropertyLocations.module.css';

function PropertyLocations() {
  const navigate = useNavigate();

  const handleNavigateToSearch = (location) => {
    navigate('/properties', { state: { propertyArea: location } });
  };
  return (
    <>
      <div className={styles.featuredTitle}>
        <h1>POPULAR LOCATIONS</h1>
      </div>
      <div className={styles.propertyBox}>
        <div className={styles.propertyContainer}>
          <img className={styles.propertyImage} src={'/antipolo.png'} />
          <h3>ANTIPOLO</h3>
          <div className={styles.description}>
            Located in the scenic Rizal province, Antipolo sits on elevated
            topography with a temperate climate and natural surroundings that
            allow a tranquil lifestyle while still being close to many schools
            and business centers.
          </div>
          <button
            className={styles.viewPropertiesButton}
            onClick={() => handleNavigateToSearch('Antipolo')}
          >
            VIEW LISTINGS HERE
          </button>
        </div>
        <div className={styles.propertyContainer}>
          <img className={styles.propertyImage} src={'/batangas.png'} />
          <h3>BATANGAS</h3>
          <div className={styles.description}>
            Hailed as one of the most popular tourist destinations at the south
            of Metro Manila, Batangas boasts of being home to numerous
            historical landmarks, business centers, and quality schools.
          </div>
          <button
            className={styles.viewPropertiesButton}
            onClick={() => handleNavigateToSearch('Batangas')}
          >
            VIEW LISTINGS HERE
          </button>
        </div>
        <div className={styles.propertyContainer}>
          <img className={styles.propertyImage} src={'/bulacan.png'} />
          <h3>BULACAN</h3>
          <div className={styles.description}>
            Nestled in the heart of Central Luzon, this "Gateway to the Northern
            Philippines" offers a refuge to families who want to enjoy a
            suburban lifestyle while still being near the bustling metropolis of
            Metro Manila.
          </div>
          <button
            className={styles.viewPropertiesButton}
            onClick={() => handleNavigateToSearch('Bulacan')}
          >
            VIEW LISTINGS HERE
          </button>
        </div>
      </div>
    </>
  );
}

export default PropertyLocations;
