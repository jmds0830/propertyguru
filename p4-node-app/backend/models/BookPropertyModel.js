import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  propertyId: String,
  scheduleDate: String,
  scheduleTime: String,
  customerMessage: String,
});

const Booking = model('Booking', bookingSchema);

export default Booking;
