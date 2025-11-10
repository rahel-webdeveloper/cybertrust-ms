import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/login', authController.loginUser);

authRouter.post('/sign-up', authController.signUpUser);

authRouter.delete(
  '/delete-account/:id',
  protect(),
  authController.deleteAccount
);

authRouter.post('/logout', (req: Request, res: Response) => {
  res.send({ message: 'User logout' });
});

export default authRouter;
