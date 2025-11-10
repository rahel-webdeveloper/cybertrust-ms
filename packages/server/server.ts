import express, { type Request, type Response } from 'express';
import connectDb from './src/db/db-connection';
import authRouter from './src/routes/auth.route';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.json('Hello via Cyber Trust MS app server');
});

app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDb();
});
