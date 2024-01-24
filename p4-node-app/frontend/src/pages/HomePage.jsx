import { useEffect, useState } from 'react';
import Layout from './Layout';
import styles from '../styles/HomePage.module.css';
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(`./src/data/featured.json`);
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <img className={styles.coverPhoto} src="/cover2.jpg" alt="Cover" />
        <div className={styles.title}>
          <h1>YOUR SPACE.</h1>
          <h1>YOUR PLACE.</h1>
          <h1>YOUR HOME.</h1>
        </div>
        <div className={styles.featuredTitle}>
          <h1>FEATURED PROPERTIES</h1>
        </div>
        <div className={styles.propertyBox}>
          {data.length === 0 ? (
            <h2>No Results Found</h2>
          ) : (
            data.properties?.map((property) => (
              <div key={property.id} className={styles.propertyContainer}>
                <div className={styles.areaContainer}>
                  <img className={styles.locationIcon} src="/location.png" />
                  <span className={styles.area}>
                    {property.info.location
                      .split(' ')
                      .slice(-1)[0]
                      .toUpperCase()}
                  </span>
                </div>
                <Link to={`/property/${property.id}`}>
                  <img
                    className={styles.propertyImage}
                    src={property.info.images[0]}
                    alt={`Image for: ${property.id}`}
                  />
                </Link>
                <div className={styles.propertyDetails}>
                  <div className={styles.propertyId}>
                    Property ID: {property.id}
                  </div>
                  <div className={styles.propertyTitleContainer}>
                    <Link to={`/property/${property.id}`}>
                      <h3 className={styles.propertyTitle}>
                        {property.info.title}
                      </h3>
                    </Link>
                  </div>
                  <h2 className={styles.propertyPrice}>
                    <span className={styles.peso}>₱ </span>
                    {property.info.price.toLocaleString()}
                  </h2>
                  <div className={styles.dimensionsContainer}>
                    <div className={styles.dimensions}>
                      <img
                        className={styles.dimensionIcon}
                        src="/bed.png"
                        alt="bedrooms"
                      />
                      <p> {property.info.bedrooms}</p>
                    </div>
                    <div className={styles.dimensions}>
                      <img
                        className={styles.dimensionIcon}
                        src="/shower.png"
                        alt="bathrooms"
                      />
                      <p> {property.info.bathrooms}</p>
                    </div>
                    <div className={styles.dimensions}>
                      <img
                        className={styles.dimensionIcon}
                        src="/floor-area.png"
                        alt="floor-area"
                      />
                      <p> {property.info.floorArea}</p>
                    </div>
                    <div className={styles.dimensions}>
                      <img
                        className={styles.dimensionIcon}
                        src="/lot-area.png"
                        alt="lot-area"
                      />
                      <p> {property.info.lotArea}</p>
                    </div>
                  </div>
                  <h4 className={styles.propertyStatus}>
                    {property.info.status}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.viewProperties}>
          <div>
            <img
              className={styles.interiorImage}
              src="/interior.png"
              alt="Interior"
            />
          </div>
          <div>
            <h3>FIND YOUR PERFECT HOME WITH US.</h3>
            <p>Browse through our listings of properties for sale.</p>
            <Link to={'/properties'}>
              <button className={styles.searchButton}>
                <p>VIEW PROPERTIES</p>
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePage;
