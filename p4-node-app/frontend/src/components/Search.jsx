import styles from '../styles/Search.module.css';

function Search({ search, handleChange, handleClear, handleSearch }) {
  return (
    <>
      <div className={styles.searchMenuContainer}>
        <div className={styles.searchTitle}>
          <h1>PROPERTY SEARCH</h1>
        </div>
        <div className={styles.searchMenu}>
          <div className={styles.propertyId}>
            <label>Property ID</label>
            <input
              className={styles.input}
              type="text"
              value={search.propertyId}
              placeholder="Any"
              onChange={(e) => handleChange(e, 'propertyId')}
            />
          </div>
          <div className={styles.propertyArea}>
            <label>Location</label>
            <select
              className={styles.select}
              value={search.propertyArea}
              onChange={(e) => handleChange(e, 'propertyArea')}
            >
              <option value="any">Any</option>
              <option value="Antipolo">Antipolo</option>
              <option value="Batangas">Batangas</option>
              <option value="Bulacan">Bulacan</option>
            </select>
          </div>
          <div className={styles.propertyType}>
            <label>Property Type</label>
            <select
              className={styles.select}
              value={search.propertyType}
              onChange={(e) => handleChange(e, 'propertyType')}
            >
              <option value="any">Any</option>
              <option value="Single Detached">Single Detached</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Condo">Condo</option>
              <option value="Duplex">Duplex</option>
              <option value="Commercial Property">Commercial Property</option>
              <option value="Vacant Lot">Vacant Lot</option>
              <option value="Farm Lot">Farm Lot</option>
            </select>
          </div>
          <div className={styles.propertyMinPrice}>
            <label>Min. Price</label>
            <select
              className={styles.select}
              value={search.minPrice}
              onChange={(e) => handleChange(e, 'minPrice')}
            >
              <option value="any">Any</option>
              <option value="5000000">5 Million</option>
              <option value="10000000">10 Million</option>
              <option value="20000000">20 Million</option>
              <option value="30000000">30 Million</option>
              <option value="40000000">40 Million</option>
              <option value="50000000">50 Million</option>
              <option value="60000000">60 Million</option>
            </select>
          </div>
          <div className={styles.propertyMaxPrice}>
            <label>Max. Price</label>
            <select
              className={styles.select}
              value={search.maxPrice}
              onChange={(e) => handleChange(e, 'maxPrice')}
            >
              <option value="any">Any</option>
              <option value="20000000">20 Million</option>
              <option value="30000000">30 Million</option>
              <option value="40000000">40 Million</option>
              <option value="50000000">50 Million</option>
              <option value="60000000">60 Million</option>
              <option value="70000000">70 Million</option>
              <option value="10000000000">80 Million and up</option>
            </select>
          </div>
          <div className={styles.searchButtons}>
            <button className={styles.button} onClick={handleClear}>
              Clear
            </button>
            <button className={styles.button} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
