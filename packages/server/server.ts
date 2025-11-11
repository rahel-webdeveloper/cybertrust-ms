import express, { type Request, type Response } from 'express';
import connectDb from './src/db/db-connection';
import authRouter from './src/routes/auth.route';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: Bun.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

const PORT = Bun.env.PORT || 5000;

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.json('Hello via Cyber Trust MS app server');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDb();
});
