import cors from 'cors';
import express, { type Request, type Response } from 'express';
import connectDb from './src/db/db-connection';
import authRouter from './src/routes/auth.route';
import costsRoutes from './src/routes/costs.route';
import employeesRoutes from './src/routes/employees.route';
import projectRoutes from './src/routes/projects.route';
import quotationsRoutes from './src/routes/quotations.route';
import seedDataRoutes from './src/routes/seed.route';
import tasksRoutes from './src/routes/tasks.route';
import userRoutes from './src/routes/users.route';

const app = express();

// app.use(
//   cors({
//     origin: Bun.env.MOBILE_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/quotations', quotationsRoutes);
app.use('/api/costs', costsRoutes);
app.use('/seed', seedDataRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello via Cyber Trust MS app server',
  });
});

const PORT = Bun.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDb();
});
