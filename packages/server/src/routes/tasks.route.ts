import { Router, type Request, type Response } from 'express';
import Quotation from '../models/quotation.model';
import Task from '../models/task.model';

const tasksRoutes = Router();

tasksRoutes.get('/', async (req: Request, res: Response) => {
  const tasks = await Task.find().populate('project').lean();

  res.status(200).json({ success: true, data: tasks });
});

tasksRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get task with ID ${req.params.id}`);
});

tasksRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new task');
});

tasksRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update task with ID ${req.params.id}`);
});

tasksRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete task with ID ${req.params.id}`);
});

tasksRoutes.put('/:id/status', (req: Request, res: Response) => {
  res.send(`Update status of task with ID ${req.params.id}`);
});

export default tasksRoutes;
