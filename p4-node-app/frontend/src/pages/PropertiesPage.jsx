import { useEffect, useState } from 'react';
import Layout from './Layout';
import styles from '../styles/PropertiesPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../components/Search';

function Properties() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    propertyId: '',
    propertyArea: 'any',
    propertyType: 'any',
    minPrice: 'any',
    maxPrice: 'any',
  });
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 9;

  useEffect(() => {
    if (location.state) {
      setSearch({ ...search, propertyArea: location.state.propertyArea });
    }
  }, [location.state]);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/properties?propertyId=${search.propertyId}&propertyArea=${search.propertyArea}&propertyType=${search.propertyType}&minPrice=${search.minPrice}&maxPrice=${search.maxPrice}`
      );
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  const handleNavigateToPropertyId = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleChange = (e, field) => {
    setSearch({ ...search, [field]: e.target.value });
  };

  const handleClear = () => {
    setSearch({
      propertyId: '',
      propertyArea: 'any',
      propertyType: 'any',
      minPrice: 'any',
      maxPrice: 'any',
    });
  };

  const handleSearch = () => {
    fetchData();
    setCurrentPage(1);
    setSearchClicked(true);
  };

  useEffect(() => {
    if (!searchClicked) {
      fetchData();
      setCurrentPage(1);
      setSearchClicked(true);
    }
  }, [searchClicked]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout>
        <img className={styles.coverPhoto} src="/cover.jpg" alt="Cover" />
        <div className={styles.propertiesBox}>
          <Search
            search={search}
            location={location}
            handleChange={handleChange}
            handleClear={handleClear}
            handleSearch={handleSearch}
          />
          <div className={styles.propertyBox}>
            {currentItems.length === 0 ? (
              <h2>No Results Found</h2>
            ) : (
              currentItems.map((property) => (
                <div
                  key={property.propertyId}
                  className={styles.propertyContainer}
                >
                  <div className={styles.areaContainer}>
                    <img
                      className={styles.locationIcon}
                      src="/location.png"
                      alt=""
                    />
                    <span className={styles.area}>
                      {property.area.toUpperCase()}
                    </span>
                  </div>
                  <img
                    className={styles.propertyImage}
                    src={property.images[0]}
                    alt={`Image for: ${property.propertyId}`}
                    onClick={() =>
                      handleNavigateToPropertyId(property.propertyId)
                    }
                  />
                  <div className={styles.propertyDetails}>
                    <div className={styles.propertyId}>
                      Property ID: {property.propertyId}
                    </div>
                    <div
                      className={styles.propertyTitleContainer}
                      onClick={() =>
                        handleNavigateToPropertyId(property.propertyId)
                      }
                    >
                      <h3 className={styles.propertyTitle}>{property.title}</h3>
                    </div>
                    <h2 className={styles.propertyPrice}>
                      <span className={styles.peso}>₱ </span>
                      {property.price.toLocaleString()}
                    </h2>
                    <div className={styles.dimensionsContainer}>
                      <div className={styles.dimensions}>
                        <img
                          className={styles.dimensionIcon}
                          src="/bed.png"
                          alt="bedrooms"
                        />
                        <p> {property.bedrooms}</p>
                      </div>
                      <div className={styles.dimensions}>
                        <img
                          className={styles.dimensionIcon}
                          src="/shower.png"
                          alt="bathrooms"
                        />
                        <p> {property.bathrooms}</p>
                      </div>
                      <div className={styles.dimensions}>
                        <img
                          className={styles.dimensionIcon}
                          src="/floor-area.png"
                          alt="floor-area"
                        />
                        <p> {property.floorArea}</p>
                      </div>
                      <div className={styles.dimensions}>
                        <img
                          className={styles.dimensionIcon}
                          src="/lot-area.png"
                          alt="lot-area"
                        />
                        <p> {property.lotArea}</p>
                      </div>
                    </div>
                    <h4 className={styles.propertyStatus}>{property.status}</h4>
                  </div>
                </div>
              ))
            )}
          </div>
          {data.length > itemsPerPage && (
            <ul className={styles.pagination}>
              {Array.from(
                { length: Math.ceil(data.length / itemsPerPage) },
                (_, index) => (
                  <li
                    className={`${styles.paginationButton} ${
                      currentPage === index + 1 ? styles.activeButton : ''
                    }`}
                    key={index}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Properties;
