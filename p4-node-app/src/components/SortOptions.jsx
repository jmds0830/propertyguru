function SortOptions({
  sortBy,
  sortOrder,
  handleSortByChange,
  handleSortOrderChange,
}) {
  return (
    <>
      <label>
        Sort By:
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="uploadedOn">Date Added</option>
          <option value="price">Price</option>
          <option value="floorArea">Floor Area</option>
          <option value="lotArea">Lot Area</option>
        </select>
      </label>

      {sortBy && (
        <label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            {sortBy === 'uploadedOn' && (
              <div>
                <option value="">Newest First</option>
                <option value="">Oldest First</option>
              </div>
            )}
            {sortBy === 'price' && (
              <div>
                <option value="">Lowest First</option>
                <option value="">Highest First</option>
              </div>
            )}
            {(sortBy === 'floorArea' || sortBy === 'lotArea') && (
              <div>
                <option value="">Smallest First</option>
                <option value="">Largest First</option>
              </div>
            )}
          </select>
        </label>
      )}
    </>
  );
}

export default SortOptions;
