import { useEffect, useState } from 'react';
import Layout from './Layout';
import styles from '../styles/PropertiesPage.module.css';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

function Properties() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    propertyId: '',
    area: 'any',
    propertyType: 'any',
    minPrice: 'any',
    maxPrice: 'any',
  });
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  async function fetchData() {
    const areas =
      search.area === 'any'
        ? ['antipolo', 'batangas', 'bulacan']
        : [search.area];

    try {
      const response = await fetch('http://localhost:3000/properties');
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  const handleChange = (e, field) => {
    setSearch({ ...search, [field]: e.target.value });
  };

  const handleClear = () => {
    setSearch({
      propertyId: '',
      area: 'any',
      propertyType: 'any',
      minPrice: 'any',
      maxPrice: 'any',
    });
  };

  const handleSearch = () => {
    setSearchClicked(true);
    setCurrentPage(1);
    fetchData();
  };

  useEffect(() => {
    if (!searchClicked) {
      fetchData();
      setSearchClicked(true);
    }
  }, [searchClicked, search]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout>
        <img className={styles.coverPhoto} src="/cover2.jpg" alt="Cover" />
        <div className={styles.propertiesBox}>
          <Search
            search={search}
            handleChange={handleChange}
            handleClear={handleClear}
            handleSearch={handleSearch}
          />
          <div className={styles.propertyBox}>
            {data.length === 0 ? (
              <h2>No Results Found</h2>
            ) : (
              data.map((property) => (
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
                      {property.location.split(' ').slice(-1)[0].toUpperCase()}
                    </span>
                  </div>
                  <Link to={`/property/${property.propertyId}`}>
                    <img
                      className={styles.propertyImage}
                      src={property.images[0]}
                      alt={`Image for: ${property.propertyId}`}
                    />
                  </Link>
                  <div className={styles.propertyDetails}>
                    <div className={styles.propertyId}>
                      Property ID: {property.propertyId}
                    </div>
                    <div className={styles.propertyTitleContainer}>
                      <Link to={`/property/${property.propertyId}`}>
                        <h3 className={styles.propertyTitle}>
                          {property.title}
                        </h3>
                      </Link>
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
                  <div
                    className={`${styles.paginationButton} ${
                      currentPage === index + 1 ? styles.activeButton : ''
                    }`}
                    key={index}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </div>
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
