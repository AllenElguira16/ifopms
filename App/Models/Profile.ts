import { Schema, model } from 'mongoose';

export default model('User', new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  type: { type: String, required: true },
}));