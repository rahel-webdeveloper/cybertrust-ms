import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const QUOTATION_STATUSES = ['draft', 'pending', 'accepted', 'rejected'];

const quotationSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    status: { type: String, enum: QUOTATION_STATUSES, default: 'pending' },
  },
  {
    // we include timestamps=false because we already have createdAt explicitly.
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Quotation = model('Quotation', quotationSchema);

export default Quotation;
