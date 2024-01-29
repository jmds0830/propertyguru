import { Schema, model } from 'mongoose';

const featuredSchema = new Schema(
  {
    propertyId: Number,
    title: String,
    images: Array,
    price: Number,
    area: String,
    type: String,
    status: String,
    location: String,
    lotArea: Number,
    floorArea: Number,
    bedrooms: Number,
    bathrooms: Number,
    carpark: Number,
    features: Array,
    neighborhoodFeatures: Array,
    parksGreenery: Array,
    grocery: Array,
    school: Array,
    mallStore: Array,
    hospital: Array,
  },
  { timestamps: true }
);

const Featured = model('Featured', featuredSchema);

export default Featured;
