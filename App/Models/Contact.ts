import { Schema, model  } from 'mongoose';

export default model('Contact', new Schema({
  User: { type: Schema.Types.ObjectId, required: true },
  Friend: { type: Schema.Types.ObjectId, required: true },
  dateCreated: { type: String, default: Date.now() }
}));