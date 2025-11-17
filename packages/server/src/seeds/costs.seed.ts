import { faker } from '@faker-js/faker';
import Project from '../models/project.model';
import Quotation from '../models/quotation.model';
import Cost from '../models/cost.model';

export const seedCosts = async () => {
  const projects = await Project.find().populate('team');
  const costs = [];

  for (const project of projects) {
    for (let i = 0; i < 3; i++) {
      costs.push({
        project: project._id,
        amount: faker.finance.amount({
          min: 100,
          max: 5000,
          dec: 2,
        }),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        date: faker.date.recent({
          days: faker.helpers.arrayElement([10, 7, 15, 12, 20, 30]),
        }),
      });
    }
  }

  return await Cost.create(costs);
};
