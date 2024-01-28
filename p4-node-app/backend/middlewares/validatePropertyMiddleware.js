function validatePropertyMiddleware(req, res, next) {
  const {
    propertyId,
    title,
    images,
    price,
    area,
    type,
    status,
    location,
    lotArea,
    floorArea,
    bedrooms,
    bathrooms,
    carpark,
    features,
    neighborhoodFeatures,
  } = req.body;

  if (
    !propertyId ||
    !title ||
    !images ||
    !price ||
    !area ||
    !type ||
    !status ||
    !location ||
    !lotArea ||
    !floorArea ||
    !bedrooms ||
    !bathrooms ||
    !carpark ||
    !features ||
    !neighborhoodFeatures
  ) {
    res.status(400).json({
      message: 'Must input all necessary fields',
    });

    return;
  }

  next();
}

export default validatePropertyMiddleware;
