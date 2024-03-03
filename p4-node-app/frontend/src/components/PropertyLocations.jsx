import { useNavigate } from 'react-router-dom';
import styles from '../styles/PropertyLocations.module.css';

function PropertyLocations() {
  const navigate = useNavigate();

  const handleNavigateToSearch = (location) => {
    navigate('/properties', { state: { propertyArea: location } });
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={styles.featuredTitle}>
        <h1>FEATURED LOCATIONS</h1>
      </div>
      <div className={styles.propertyBox}>
        <div className={styles.propertyContainer}>
          <img className={styles.propertyImage} src={'/antipolo.png'} />
          <h3>ANTIPOLO</h3>
          <div className={styles.description}>
            <span>
              Located in Rizal province, Antipolo sits on elevated topography
              with a temperate climate and natural surroundings that offer a
              serene lifestyle while still being close to many schools and
              business centers.
            </span>
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
            <span>
              Located to the south of Metro Manila, Batangas presents a seamless
              fusion of natural splendor, rich heritage, and modern amenities,
              featuring many historical sites, commercial hubs, and reputable
              schools.
            </span>
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
            <span>
              Nestled in the heart of Central Luzon region, this "Gateway to the
              Northern Philippines" offers a haven for families seeking a
              suburban lifestyle while still being accessible to the bustling
              metropolis of Metro Manila.
            </span>
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
