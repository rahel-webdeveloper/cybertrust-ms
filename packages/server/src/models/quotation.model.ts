import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const quotationSchema = new Schema(
  {
    project: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Quotation = model('Quotation', quotationSchema);

export default Quotation;
