import express, { type Request, type Response } from 'express';
import connectDb from './src/db/db-connection';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.json('Hello via Cyber Trust MS app server');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDb();
});
