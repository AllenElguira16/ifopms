import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema({
  userId: [{type: Schema.Types.ObjectId, required: true, ref: 'User'}],
  categoryId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  previewFile: {type: String, required: true},
  likes: {type: Number},
  views: {type: Number},
  comments: {type: Number},
  dateCreated: {type: Date, default: Date.now()},
});

export default model('portfolio', portfolioSchema);