import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Property from './models/PropertyModel.js';
import Booking from './models/BookPropertyModel.js';
import searchQuery from './utils/searchQuery.js';
import validateBookingMiddleware from './middlewares/validateBookingMiddleware.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/propertyguru');

app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('static'));
app.use(express.json());

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
    hospital,
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
    message: 'SUCCESS! New property added',
    data: newProperty,
  });
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
      message: 'ERROR! Property not found',
      error: error.message,
    });
  }
});

app.patch('/property/:id', async (req, res) => {
  try {
    const property = await Property.findOne({ propertyId: req.params.id });

    if (!property) {
      res.status(404).json({
        message: 'ERROR! Property not found ',
      });

      return;
    }

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

    property.propertyId = propertyId || property.propertyId;
    property.title = title || property.title;
    property.price = price || property.price;
    property.area = area || property.area;
    property.type = type || property.type;
    property.status = status || property.status;
    property.location = location || property.location;
    property.lotArea = lotArea || property.lotArea;
    property.floorArea = floorArea || property.floorArea;
    property.bedrooms = bedrooms || property.bedrooms;
    property.bathrooms = bathrooms || property.bathrooms;
    property.carpark = carpark || property.carpark;
    property.features = features || property.features;
    property.neighborhoodFeatures =
      neighborhoodFeatures || property.neighborhoodFeatures;
    property.parksGreenery = parksGreenery || property.parksGreenery;
    property.grocery = grocery || property.grocery;
    property.school = school || property.school;
    property.mallStore = mallStore || property.mallStore;
    property.hospital = hospital || property.hospital;

    await property.save();

    res.status(200).json({
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      message: 'ERROR! Property not found',
    });
  }
});

app.delete('/property/:id', async (req, res) => {
  try {
    const properties = await Property.find();
    const propertyIndex = properties.findIndex(
      (property) => property.propertyId === Number(req.params.id)
    );

    if (propertyIndex === -1) {
      res.status(404).json({
        message: 'ERROR! Property not found',
      });
    }

    properties.splice(propertyIndex, 1);

    await Property.deleteOne({ propertyId: Number(req.params.id) });

    res.status(200).json({
      message: "Property deleted successfully'",
    });
  } catch (error) {
    res.status(400).json({
      message: 'ERROR! Property not found',
    });
  }
});

app.post('/book', validateBookingMiddleware, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    propertyId,
    scheduleDate,
    scheduleTime,
    customerMessage,
  } = req.body;

  const newBooking = new Booking({
    firstName,
    lastName,
    email,
    contact,
    propertyId,
    scheduleDate,
    scheduleTime,
    customerMessage,
  });

  await newBooking.save();

  res.status(201).json({
    message: 'SUCCESS! New booking added',
    newBooking,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
