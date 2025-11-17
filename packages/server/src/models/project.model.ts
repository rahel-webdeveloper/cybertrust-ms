import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const PROJECT_STATUSES = ['planning', 'active', 'completed', 'on_hold'];
const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    manager: { type: Types.ObjectId, ref: 'User', index: true },
    team: [{ type: Types.ObjectId, ref: 'Employee' }],
    budget: { type: Number, min: 0, default: 0 },
    deadline: { type: Date },
    status: { type: String, enum: PROJECT_STATUSES, default: 'planning' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals for getting related docs without embeding
projectSchema.virtual('costs', {
  ref: 'Cost',
  localField: '_id',
  foreignField: 'projectId',
});

projectSchema.virtual('quotations', {
  ref: 'Quotation',
  localField: '_id',
  foreignField: 'projectId',
});

projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'projectId',
});

const Project = model('Project', projectSchema);

export default Project;
