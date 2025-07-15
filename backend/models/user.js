import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdOn: { type: Date, default: new Date().getTime() },
});

export default mongoose.model("User", userSchema);
