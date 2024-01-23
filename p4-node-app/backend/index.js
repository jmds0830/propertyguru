import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Property from './models/PropertyModel.js';
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
    nearbyEstablishments,
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
    nearbyEstablishments,
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
    !carpark
  ) {
    res.status(400).json({
      message: 'Must input necessary fields',
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
  const allProperties = await Property.find();
  res.send(allProperties);
});

app.get('/property/:id', async (req, res) => {
  try {
    // const property = await Property.findById(req.params.id);
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
      nearbyEstablishments,
    } = data;
  } catch (error) {
    res.status(400).json({
      message: 'Property not found',
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
