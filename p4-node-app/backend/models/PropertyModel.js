import { Schema, model } from 'mongoose';

const propertySchema = new Schema({
  propertyId: Number,
  title: String,
  images: Array,
  price: Number,
  area: String,
  type: String,
  uploadedOn: Number,
  status: String,
  location: String,
  lotArea: Number,
  floorArea: Number,
  bedrooms: Number,
  bathrooms: Number,
  carpark: Number,
  features: Array,
  neighborhoodFeatures: Array,
  nearbyEstablishments: Object,
});

const Property = model('Property', propertySchema);

export default Property;
