import { Router, type Request, type Response } from 'express';
import Project from '../models/project.model';

const projectRoutes = Router();

projectRoutes.get('/', async (req: Request, res: Response) => {
  const projects = await Project.find();

  res.status(200).json({ success: true, data: projects });
});

projectRoutes.get('/:id', async (req: Request, res: Response) => {
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
