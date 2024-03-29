import { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/PropertyInfoPage.module.css';

function PropertyInfoPage() {
  const [propertyData, setPropertyData] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchPropertyData() {
    try {
      const response = await fetch(
        `https://propertyguru-wtmh.onrender.com/property/${id}`
      );
      const result = await response.json();

      setPropertyData(result);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  const handleArrowClick = (direction) => {
    const currentProperty = propertyData.property[0];
    const totalImages = currentProperty?.images?.length || 0;

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
    window.scrollTo(0, 0);
  }, [id]);

  const handleNavigateToBook = () => {
    navigate('/book');
    window.scrollTo(0, 0);
  };

  const openImageInNewTab = (imageUrl) => {
    const newWindow = window.open(imageUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <Layout>
        <div className={styles.propertyInfoContainer}>
          {propertyData.property?.map((property) => (
            <div key={property.propertyId}>
              <h1 className={styles.title}>{property.title}</h1>
              <h1 className={styles.propertyPrice}>
                <span className={styles.peso}>₱ </span>
                {property.price?.toLocaleString()}
              </h1>
              <h3 className={styles.propertyStatus}>{property.status}</h3>
              <div className={styles.line}></div>
              <div className={styles.propertyImageContainer}>
                <img
                  src={property.images?.[currentImage]}
                  alt={`Property Image ${currentImage + 1}`}
                  className={styles.propertyImage}
                  onClick={() =>
                    openImageInNewTab(property.images?.[currentImage])
                  }
                />
                {property.images?.length > 1 && (
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
              <div className={styles.propertyImageIndex}>
                {property.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.circle} ${
                      index === currentImage ? styles.active : ''
                    }`}
                    onClick={() => setCurrentImage(index)}
                  ></div>
                ))}
              </div>
              <div className={styles.bookProperty}>
                <p>
                  Interested in this property? Schedule a visit and talk to one
                  of our real estate agents.
                </p>
                <button
                  className={styles.bookButton}
                  onClick={handleNavigateToBook}
                >
                  BOOK A VIEWING
                </button>
              </div>
              <div className={styles.propertyInfo}>
                <h3>Property ID: {property.propertyId}</h3>
                <h3>Property Type: {property.type}</h3>
              </div>
              <div className={styles.dimensionsContainer}>
                <div className={styles.dimensions}>
                  <img
                    className={styles.dimensionIcon}
                    src="/bed.png"
                    alt="bedrooms"
                  />
                  <h3> {property.bedrooms} Bedrooms</h3>
                </div>
                <div className={styles.dimensions}>
                  <img
                    className={styles.dimensionIcon}
                    src="/shower.png"
                    alt="bathrooms"
                  />
                  <h3> {property.bathrooms} Bathrooms</h3>
                </div>
                <div className={styles.dimensions}>
                  <img
                    className={styles.dimensionIcon}
                    src="/floor-area.png"
                    alt="floor-area"
                  />
                  <h3> {property.floorArea} sq. m Floor Area</h3>
                </div>
                <div className={styles.dimensions}>
                  <img
                    className={styles.dimensionIcon}
                    src="/lot-area.png"
                    alt="lot-area"
                  />
                  <h3> {property.lotArea} sq. m Lot Area</h3>
                </div>
              </div>
              <div className={styles.additionalInfoContainer}>
                <div>
                  <h3>LOCATION</h3>
                  <p className={styles.additionalInfo}>{property.location}</p>
                  <h3>PROPERTY FEATURES</h3>
                  <div className={styles.additionalInfo}>
                    {property.features?.map((feature) => (
                      <li>{feature}</li>
                    ))}
                  </div>
                  <h3>NEIGHBORHOOD FEATURES</h3>
                  {property.neighborhoodFeatures?.map((feature) => (
                    <li>{feature}</li>
                  ))}
                </div>
                <div>
                  <h3>NEARBY ESTABLISHMENTS</h3>
                  <p>Parks and Greenery:</p>
                  {property.parksGreenery?.map((info) => (
                    <li>{info}</li>
                  ))}
                  <p>Groceries:</p>
                  {property.grocery?.map((info) => (
                    <li>{info}</li>
                  ))}
                  <p>Schools:</p>
                  {property.school?.map((info) => (
                    <li>{info}</li>
                  ))}
                  <p>Malls:</p>
                  {property.mallStore?.map((info) => (
                    <li>{info}</li>
                  ))}
                  <p>Hospitals:</p>
                  {property.hospital?.map((info) => (
                    <li>{info}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}

export default PropertyInfoPage;
