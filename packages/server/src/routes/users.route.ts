import { Router, type Request, type Response } from 'express';
import User from '../models/user.model';
import { userController } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', userController.getUsersList);

userRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get user with ID ${req.params.id}`);
});

userRoutes.post('/', userController.addNewUser);

userRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update user with ID ${req.params.id}`);
});

userRoutes.delete('/:userEmail', userController.deleteUser);

userRoutes.put('/change-role/:id', userController.changeUserRole);

export default userRoutes;
