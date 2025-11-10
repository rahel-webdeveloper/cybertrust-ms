import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const costSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
    category: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Cost = model('Cost', costSchema);

export default Cost;
