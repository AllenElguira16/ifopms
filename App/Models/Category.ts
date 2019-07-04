import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() }
});

export default model('Category', categoriesSchema);