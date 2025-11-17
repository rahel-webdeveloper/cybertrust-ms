import { faker } from '@faker-js/faker';
import Employee from '../models/employee.model';
import User from '../models/user.model';
import Project from '../models/project.model';

export const seedProjects = async () => {
  const managers = await User.find({ role: 'manager' });
  const employees = await Employee.find();

  const projects = [];

  for (let i = 0; i < 11; i++) {
    const manager = faker.helpers.arrayElement(managers);
    const team = faker.helpers.arrayElements(employees, 5);

    projects.push({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraphs(
        faker.helpers.arrayElement([3, 4, 5, 6])
      ),
      manager: manager._id,
      team: team.map((e) => e._id),
      budget: faker.finance.amount({ min: 5000, max: 50000 }),
      deadline: faker.date.future({
        years: faker.helpers.arrayElement([0.1, 0.25, 0.5, 1, 2]),
      }),
      status: faker.helpers
        .arrayElement([
          'planning',
          'active',
          'completed',
          'on_hold',
        ])
        .toString(),
    });
  }

  return await Project.create(projects);
};
