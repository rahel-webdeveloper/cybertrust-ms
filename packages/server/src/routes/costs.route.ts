import { Router, type Request, type Response } from 'express';

const costsRoutes = Router();

costsRoutes.get('/', (req: Request, res: Response) => {
  res.send('Get all costs');
});

costsRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get cost with ID ${req.params.id}`);
});

costsRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new cost');
});

costsRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update cost with ID ${req.params.id}`);
});

costsRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete cost with ID ${req.params.id}`);
});

costsRoutes.get('/project/:projectId', (req: Request, res: Response) => {
  res.send(`Get costs for project with ID ${req.params.projectId}`);
});

export default costsRoutes;
