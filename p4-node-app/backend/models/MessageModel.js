import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    customerType: String,
    customerMessage: String,
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
