import { Router, type Request, type Response } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  res.send('Get all users');
});

userRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get user with ID ${req.params.id}`);
});

userRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new user');
});

userRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update user with ID ${req.params.id}`);
});

userRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

export default userRoutes;
