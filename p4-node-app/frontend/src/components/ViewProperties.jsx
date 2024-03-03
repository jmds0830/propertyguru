import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ViewProperties.module.css';

function viewProperties() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/slideshow/interior.png',
    '/slideshow/interior2.png',
    '/slideshow/interior3.png',
  ];
  const delay = 4000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => clearInterval(intervalId);
  }, [images, length, delay]);

  const handleNavigateToProperties = () => {
    navigate('/properties');
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={styles.viewPropertiesBox}>
        <div className={styles.viewProperties}>
          <img
            className={styles.interiorImage}
            src={images[currentImageIndex]}
            alt={`Interiror image ${currentImageIndex + 1}`}
          />
          <div className={styles.viewPropertiesText}>
            <span>We are PropertyGuru.</span>
            <h2>FIND YOUR PERFECT HOME WITH US.</h2>
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
