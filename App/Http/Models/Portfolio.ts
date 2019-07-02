import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema({
  userId: {type: String, required: true},
  categoryId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  // preview: {type: String, required: true},
  fileName: {type: String, required: true},
  likes: {type: Number},
  views: {type: Number},
  comments: {type: Number},
  dateCreated: {type: Date, default: Date.now()},
});

export default model('portfolio', portfolioSchema);