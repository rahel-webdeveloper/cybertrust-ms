import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const TASK_STATUSES = ['todo', 'in_progress', 'done', 'blocked'];

const taskSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    assignedTo: { type: Types.ObjectId, ref: 'Employee' },
    status: { type: String, enum: TASK_STATUSES, default: 'todo' },
    dueDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Task = model('Task', taskSchema);

export default Task;
