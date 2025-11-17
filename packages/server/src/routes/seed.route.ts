import { Router, type Request, type Response } from 'express';
import { seedUsers } from '../seeds/users.seed';
import { seedEmployees } from '../seeds/employees.seed';
import { seedProjects } from '../seeds/projects.seed';
import { seedTasks } from '../seeds/tasks.seed';
import Project from '../models/project.model';
import Employee from '../models/employee.model';
import Task from '../models/task.model';
import { seedQuotations } from '../seeds/quotations.seed';
import Quotation from '../models/quotation.model';
import { seedCosts } from '../seeds/costs.seed';
import Cost from '../models/cost.model';
import User from '../models/user.model';

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

  // Step 1: Find all users with the right roles
  // const users = await User.find({ role: { $in: ['manager'] } });
  // const userIds = users.map((u) => u._id);

  // Step 2: Find employees whose user reference is in that set
  // const employees = await Employee.find({ user: { $in: userIds } });

  res.json({
    message: 'This is the seed data route respone.',
    // employees,
  });
});

export default seedDataRoutes;
