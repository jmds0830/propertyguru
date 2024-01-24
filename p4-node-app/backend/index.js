import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Property from './models/PropertyModel.js';
import searchQuery from './utils/searchQuery.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/propertyguru');

app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('static'));

app.post('/property', async (req, res) => {
  const {
    propertyId,
    title,
    images,
    price,
    area,
    type,
    uploadedOn,
    status,
    location,
    lotArea,
    floorArea,
    bedrooms,
    bathrooms,
    carpark,
    features,
    neighborhoodFeatures,
    parksGreenery,
    grocery,
    school,
    mallStore,
  } = req.body;

  const newProperty = new Property({
    propertyId,
    title,
    images,
    price,
    area,
    type,
    uploadedOn,
    status,
    location,
    lotArea,
    floorArea,
    bedrooms,
    bathrooms,
    carpark,
    features,
    neighborhoodFeatures,
    parksGreenery,
    grocery,
    school,
    mallStore,
    hospital,
  });

  const existingPropertyId = await Property.findOne({ propertyId });

  if (existingPropertyId) {
    res.status(400).json({
      message: 'Property ID already exists',
    });

    return;
  }

  if (
    !propertyId ||
    !title ||
    !images ||
    !price ||
    !area ||
    !type ||
    !uploadedOn ||
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

  await newProperty.save();

  res.status(201).json({
    message: 'SUCCESS! New property created',
    data: newProperty,
  });
  console.log();
});

app.get('/properties', async (req, res) => {
  // const { limit, offset } = req.query;

  try {
    const query = searchQuery(req.query);
    const result = await Property.find(query);
    // .limit(parseInt(limit))
    // .skip(parseInt(offset));

    res.send(result);
  } catch (error) {
    res.status(400).json({
      message: 'Error loading properties',
      error: error.message,
    });
  }
});

app.get('/property/:id', async (req, res) => {
  try {
    const property = await Property.find({ propertyId: req.params.id });

    res.status(200).json({
      property,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Property not found',
    });
  }
});

app.patch('/property/:id', async (req, res) => {
  try {
    const property = await Property.find({ propertyId: req.params.id });
    const {
      propertyId,
      title,
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
      parksGreenery,
      grocery,
      school,
      mallStore,
      hospital,
    } = req.body;

    property.propertyId = propertyId;
    property.title = title;
    property.price = price;
    property.area = area;
    property.type = type;
    property.status = status;
    property.location = location;
    property.lotArea = lotArea;
    property.floorArea = floorArea;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.carpark = carpark;
    property.features = features;
    property.neighborhoodFeatures = neighborhoodFeatures;
    property.parksGreenery = parksGreenery;
    property.grocery = grocery;
    property.school = school;
    property.mallStore = mallStore;
    property.hospital = hospital;

    res.status(200).json({
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Property not found',
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
