import { model, Schema, Document } from 'mongoose';

export default model('Comment', new Schema({
  portfolioId: {
    type: String, required: true
  },
  user: {
    type: Schema.Types.ObjectId, required: true, ref: 'User'
  },
  content: {
    type: String, required: true
  },
  dateCreated: {
    type: Date, default: Date.now() 
  }
}));