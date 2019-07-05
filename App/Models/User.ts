import { Schema, model, Document } from 'mongoose';
import { TUser } from 'interfaces/typings';

// export const UserSchema = new Schema({
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   profilePic: { type: String, required: true },
//   type: { type: String, required: true },
// });

// export default model('User', UserSchema);

export default model<TUser & Document>('User', new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  type: { type: String, required: true },
}));