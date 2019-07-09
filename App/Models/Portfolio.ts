import { Schema, model } from 'mongoose';

const PortfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, required: true, ref: 'User'
  },
  categoryId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  previewFile: {type: String, required: true},
  // likes: {type: Number},
  views: {type: Number},
  comments: {type: Number},
  dateCreated: {type: Date, default: Date.now()},
  likes: [{
    type: String
  }]
});

export default model('Portfolio', PortfolioSchema);