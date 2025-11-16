import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const ACCOUNT_STATUSES = ['active', 'inactive', 'suspended'];
const USER_ROLES = ['admin', 'manager', 'employee'];

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string; // stored hashed
  role: 'admin' | 'manager' | 'employee' | 'client';
  status: 'active' | 'inactive';
  profile?: {
    avatarUrl?: string;
    phone?: string;
    country?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
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
    status: {
      type: String,
      enum: ACCOUNT_STATUSES,
      default: 'active',
    },
    profile: {
      phone: { type: String, trim: true },
      country: { type: String, trim: true },
      avatarUrl: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashPassword;

    next();
  } catch (err: any) {
    next(err);
  }
});

// instance method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;
