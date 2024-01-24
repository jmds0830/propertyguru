function searchQuery(queryParams) {
  const { propertyId, propertyArea, propertyType, minPrice, maxPrice } =
    queryParams;
  const query = {};

  if (propertyId !== '') {
    query.propertyId = propertyId;
  }

  if (propertyArea !== 'any') {
    query.area = propertyArea;
  }

  if (propertyType !== 'any') {
    query.type = propertyType;
  }

  if (minPrice !== 'any') {
    query.price = { $gte: parseInt(minPrice) };
  }

  if (maxPrice !== 'any') {
    query.price = { ...query.price, $lte: parseInt(maxPrice) };
  }

  return query;
}

export default searchQuery;
