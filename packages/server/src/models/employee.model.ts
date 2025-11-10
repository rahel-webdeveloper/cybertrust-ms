import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const employeeSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    position: { type: String, trim: true },
    department: { type: String, trim: true },
    hireDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = model('Employee', employeeSchema);

export default EmployeeModel;
