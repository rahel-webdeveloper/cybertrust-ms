import { Router, type Request, type Response } from 'express';
import { seedUsers } from '../seed/users.seed';
import { seedEmployees } from '../seed/employees.seed';
import { seedProjects } from '../seed/projects.seed';
import { seedTasks } from '../seed/tasks.seed';
import Project from '../models/project.model';
import Employee from '../models/employee.model';
import Task from '../models/task.model';
import { seedQuotations } from '../seed/quotations.seed';
import Quotation from '../models/quotation.model';
import { seedCosts } from '../seed/costs.seed';
import Cost from '../models/cost.model';

const seedDataRoutes = Router();

seedDataRoutes.post('/', async (req: Request, res: Response) => {
  // Uncomment all these function if will generate large amount fake (but realistic) data for testing and development.

  // ‼️Be careful do not uncomment for production may it have price to you.

  // await seedUsers();

  // await seedEmployees();

  // await seedProjects();

  // await seedTasks();

  // await seedQuotations();

  // await seedCosts();

  res.json({
    message: 'This is the seed data route respone.',
  });
});

export default seedDataRoutes;
