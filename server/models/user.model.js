import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user);

export default User;