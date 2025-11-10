import { Router, type Request, type Response } from 'express';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  res.send({ message: 'User loged' });
});

authRouter.post('/sign-up', (req: Request, res: Response) => {
  res.send({ message: 'Account crated successfully' });
});

authRouter.post('/logout', (req: Request, res: Response) => {
  res.send({ message: 'User logout' });
});

export default authRouter;
