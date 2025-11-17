import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const employeeSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    position: { type: String, trim: true, required: true },
    department: { type: String, trim: true, required: true },
    hireDate: { type: Date },
    salary: { type: Number, min: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const Employee = model('Employee', employeeSchema);

export default Employee;
