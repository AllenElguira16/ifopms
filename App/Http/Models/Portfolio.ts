import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema({
  userId: {type: String, required: true},
  categoryId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  preview: {type: String, required: true},
  file: {type: String, required: true},
  likes: {type: Number, required: true},
  views: {type: Number, required: true},
  comments: {type: Number, required: true},
  dateCreated: {type: Date, default: Date.now()},
});

export default model('portfolio', portfolioSchema);