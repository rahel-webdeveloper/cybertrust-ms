import { Router, type Request, type Response } from 'express';

// GET /api/tasks
// GET /api/tasks/:id
// POST /api/tasks
// PUT /api/tasks/:id
// DELETE /api/tasks/:id
// PUT /api/tasks/:id/status

const tasksRoutes = Router();

tasksRoutes.get('/', (req: Request, res: Response) => {
  res.send('Get all tasks');
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
