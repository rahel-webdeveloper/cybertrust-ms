import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const USER_ROLES = ['admin', 'manager', 'employee'];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'employee',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
