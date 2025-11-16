import { faker } from '@faker-js/faker';
import Employee from '../models/employee.model';
import User from '../models/user.model';

export const seedEmployees = async () => {
  const users = await User.find({ role: 'employee' });

  const employeesArray = users.map((user) => ({
    hireDate: faker.date.past({
      years: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }),
    department: faker.helpers.arrayElement([
      'HR',
      'Engineering',
      'Sales',
      'Marketing',
      'Finance',
      'Support',
    ]),

    position: faker.helpers.arrayElement([
      'Manager',
      'Developer',
      'Analyst',
      'Consultant',
      'Intern',
      'Specialist',
    ]),
    userId: user._id,
  }));

  return await Employee.create(employeesArray);
};
