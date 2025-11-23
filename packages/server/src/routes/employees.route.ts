import { Router, type Request, type Response } from 'express';
import Employee from '../models/employee.model';
import { employeesController } from '../controllers/employees.controller';

const employeesRoutes = Router();

employeesRoutes.get('/', employeesController.listEmployees);

employeesRoutes.get('/:id', employeesController.getEmployee);

employeesRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new employee');
});

employeesRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update employee with ID ${req.params.id}`);
});

employeesRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete employee with ID ${req.params.id}`);
});

employeesRoutes.get('/top/employees', employeesController.getTopEmployees);

export default employeesRoutes;
