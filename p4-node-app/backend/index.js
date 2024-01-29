import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Featured from './models/FeaturedModel.js';
import Property from './models/PropertyModel.js';
import Message from './models/MessageModel.js';
import Booking from './models/BookPropertyModel.js';
import Subscription from './models/SubscriptionModel.js';
import searchQuery from './utils/searchQuery.js';
import validatePropertyMiddleware from './middlewares/validatePropertyMiddleware.js';
import validateMessageMiddleware from './middlewares/validateMessageMiddleware.js';
import validateBookingMiddleware from './middlewares/validateBookingMiddleware.js';
import validateSubscriptionMiddleware from './middlewares/validateSubscriptionMiddleware.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/propertyguru');

app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('static'));
app.use(express.json());

app.post('/featured', validatePropertyMiddleware, async (req, res) => {
  try {
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
      parksGreenery,
      grocery,
      school,
      mallStore,
      hospital,
      timestamps,
    } = req.body;

    const newFeatured = new Featured({
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
      parksGreenery,
      grocery,
      school,
      mallStore,
      hospital,
      timestamps,
    });

    const existingPropertyId = await Featured.findOne({ propertyId });

    if (existingPropertyId) {
      res.status(400).json({
        message: 'Property ID already exists',
      });
      return;
    }

    await newFeatured.save();

    res.status(201).json({
      message: 'SUCCESS! New property added',
      data: newFeatured,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Property not found',
      error: error.message,
    });
  }
});

app.get('/featured', async (req, res) => {
  try {
    const result = await Featured.find();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      message: 'Error loading properties',
      error: error.message,
    });
  }
});

app.post('/property', validatePropertyMiddleware, async (req, res) => {
  try {
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
      parksGreenery,
      grocery,
      school,
      mallStore,
      hospital,
      timestamps,
    } = req.body;

    const newProperty = new Property({
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
      parksGreenery,
      grocery,
      school,
      mallStore,
      hospital,
      timestamps,
    });

    const existingPropertyId = await Property.findOne({ propertyId });

    if (existingPropertyId) {
      res.status(400).json({
        message: 'Property ID already exists',
      });
      return;
    }

    await newProperty.save();

    res.status(201).json({
      message: 'SUCCESS! New property added',
      data: newProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Property not found',
      error: error.message,
    });
  }
});

app.get('/properties', async (req, res) => {
  try {
    const query = searchQuery(req.query);
    const result = await Property.find(query);
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
      timestamps,
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
    timestamps;

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
      return;
    }

    properties.splice(propertyIndex, 1);

    await Property.deleteOne({ propertyId: Number(req.params.id) });

    res.status(200).json({
      message: 'Property deleted',
    });
  } catch (error) {
    res.status(400).json({
      message: 'ERROR! Property not found',
    });
  }
});

app.post('/contact', validateMessageMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      customerType,
      customerMessage,
      timestamps,
    } = req.body;

    const newMessage = new Message({
      firstName,
      lastName,
      email,
      contact,
      customerType,
      customerMessage,
      timestamps,
    });

    await newMessage.save();

    res.status(200).json({
      message: 'SUCCESS! New message added',
      newMessage,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error sending message',
      error: error.message,
    });
  }
});

app.post('/book', validateBookingMiddleware, async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      message: 'Error booking schedule',
      error: error.message,
    });
  }
});

app.post('/subscribe', validateSubscriptionMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, contact } = req.body;
    const newSubscription = new Subscription({
      firstName,
      lastName,
      email,
      contact,
    });

    await newSubscription.save();

    res.status(201).json({
      message: 'SUCCESS! New subscription added',
      newSubscription,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error subscribing to newsletter',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
