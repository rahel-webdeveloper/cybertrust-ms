import { Router, type Request, type Response } from 'express';

const employeesRoutes = Router();

employeesRoutes.get('/', (req: Request, res: Response) => {
  res.send('Get all employees');
});

employeesRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get employee with ID ${req.params.id}`);
});

employeesRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new employee');
});

employeesRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update employee with ID ${req.params.id}`);
});

employeesRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete employee with ID ${req.params.id}`);
});

export default employeesRoutes;
