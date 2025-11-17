import { faker } from '@faker-js/faker';
import Project from '../models/project.model';
import Quotation from '../models/quotation.model';

export const seedQuotations = async () => {
  const projects = await Project.find().populate('team');

  const quotations = projects.map((project) => ({
    project: project._id,
    amount: faker.finance.amount({
      min: 1000,
      max: 10000,
      dec: 2,
    }),
    description: faker.commerce.productDescription(),
  }));

  return await Quotation.create(quotations);
};
