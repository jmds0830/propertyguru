import { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from '../styles/PropertyInfoPage.module.css';

function PropertyInfoPage() {
  const [propertyData, setPropertyData] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();

  async function fetchPropertyData() {
    const areas = ['antipolo', 'batangas', 'bulacan'];
    try {
      const responses = await Promise.all(
        areas.map(async (area) => {
          const response = await fetch(`../src/data/${area}.json`);
          const result = response.json();
          return result;
        })
      );

      const selectedProperty = responses
        .flatMap((response) => response.properties)
        .find((property) => property.id === id);

      setPropertyData(selectedProperty);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  const handleArrowClick = (direction) => {
    const totalImages = propertyData?.info?.images.length || 0;

    if (totalImages > 1) {
      setCurrentImage((prev) =>
        direction === 'prev'
          ? (prev + totalImages - 1) % totalImages
          : (prev + 1) % totalImages
      );
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  console.log('propertyId:', id);
  console.log('propertyData:', propertyData);

  return (
    <>
      <Layout>
        <div className={styles.propertyInfoContainer}>
          <h1>{propertyData.info?.title}</h1>
          <h1 className={styles.propertyPrice}>
            <span className={styles.peso}>₱ </span>
            {propertyData.info?.price.toLocaleString()}
          </h1>
          <h3>{propertyData.info?.status}</h3>
          <hr />
          <div className={styles.propertyImageContainer}>
            <img
              src={`.${propertyData?.info?.images[currentImage]}`}
              alt={`Property Image ${currentImage + 1}`}
              className={styles.propertyImage}
            />
            {propertyData?.info?.images.length > 1 && (
              <div>
                <img
                  src="/left-arrow.png"
                  alt="<"
                  onClick={() => handleArrowClick('prev')}
                  className={styles.prev}
                />
                <img
                  src="/right-arrow.png"
                  alt=">"
                  onClick={() => handleArrowClick('next')}
                  className={styles.next}
                />
              </div>
            )}
          </div>
          {/* <div className={styles.propertyImageIndex}>
            {propertyData.info?.images.map((image, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div> */}
          <div className={styles.bookProperty}>
            <p>
              Interested in this property? Schedule a visit and talk to one of
              our real estate agents.
            </p>
            <Link to="/book-a-viewing">
              <button className={styles.bookButton}>
                <h3>BOOK A VIEWING</h3>
              </button>
            </Link>
          </div>
          <div className={styles.propertyInfo}>
            <h3>Property ID: {propertyData.id}</h3>
            <h3>Property Type: {propertyData.info?.type}</h3>
          </div>
          <div className={styles.dimensionsContainer}>
            <div className={styles.dimensions}>
              <img
                className={styles.dimensionIcon}
                src="/bed.png"
                alt="bedrooms"
              />
              <h3> {propertyData.info?.bedrooms} Bedrooms</h3>
            </div>
            <div className={styles.dimensions}>
              <img
                className={styles.dimensionIcon}
                src="/shower.png"
                alt="bathrooms"
              />
              <h3> {propertyData.info?.bathrooms} Bathrooms</h3>
            </div>
            <div className={styles.dimensions}>
              <img
                className={styles.dimensionIcon}
                src="/floor-area.png"
                alt="floor-area"
              />
              <h3> {propertyData.info?.floorArea} sq. m Floor Area</h3>
            </div>
            <div className={styles.dimensions}>
              <img
                className={styles.dimensionIcon}
                src="/lot-area.png"
                alt="lot-area"
              />
              <h3> {propertyData.info?.lotArea} sq. m Lot Area</h3>
            </div>
          </div>
          <div className={styles.additionalInfoContainer}>
            <div>
              <h3>LOCATION</h3>
              <p className={styles.additionalInfo}>
                {propertyData.info?.location}
              </p>
              <h3>PROPERTY FEATURES</h3>
              <div className={styles.additionalInfo}>
                {propertyData.info?.features.map((feature) => (
                  <li>{feature}</li>
                ))}
              </div>
              <h3>NEIGHBORHOOD FEATURES</h3>
              {propertyData.info?.neighborhood_features.map((feature) => (
                <li>{feature}</li>
              ))}
            </div>
            <div>
              <h3>NEARBY ESTABLISHMENTS</h3>
              <p>Parks and Greenery:</p>
              {propertyData.info?.nearby_establishments.parks_greenery.map(
                (info) => (
                  <li>{info}</li>
                )
              )}
              <p>Groceries:</p>
              {propertyData.info?.nearby_establishments.grocery.map((info) => (
                <li>{info}</li>
              ))}
              <p>Schools:</p>
              {propertyData.info?.nearby_establishments.school.map((info) => (
                <li>{info}</li>
              ))}
              <p>Malls:</p>
              {propertyData.info?.nearby_establishments.mall_store.map(
                (info) => (
                  <li>{info}</li>
                )
              )}
              <p>Hospitals:</p>
              {propertyData.info?.nearby_establishments.hospital.map((info) => (
                <li>{info}</li>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default PropertyInfoPage;
