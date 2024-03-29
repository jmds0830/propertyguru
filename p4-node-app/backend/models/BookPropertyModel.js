import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    propertyId: Number,
    scheduleDate: String,
    scheduleTime: String,
    customerMessage: String,
  },
  { timestamps: true }
);

const Booking = model('Booking', bookingSchema);

export default Booking;
