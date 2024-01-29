import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
  },
  { timestamps: true }
);

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
