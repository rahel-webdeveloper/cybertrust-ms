import { Router, type Request, type Response } from 'express';

const projectRoutes = Router();

projectRoutes.get('/', (req: Request, res: Response) => {
  res.send('Get all projects');
});

projectRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get project with ID ${req.params.id}`);
});

projectRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new project');
});

projectRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update project with ID ${req.params.id}`);
});

projectRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete project with ID ${req.params.id}`);
});

projectRoutes.get('/:id/tasks', (req: Request, res: Response) => {
  res.send(`Get tasks for project with ID ${req.params.id}`);
});

export default projectRoutes;
