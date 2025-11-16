import { faker } from '@faker-js/faker';
import Project from '../models/project.model';
import Task from '../models/task.model';

export const seedTasks = async () => {
  const projects = await Project.find().populate('team');

  const tasks = [];

  for (const project of projects) {
    for (let i = 0; i < 7; i++) {
      const assigned = faker.helpers.arrayElement(project.team);

      tasks.push({
        projectId: project._id,
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentences({ min: 1, max: 4 }),
        assignedTo: [assigned._id],
        status: faker.helpers.arrayElement(['todo', 'in_progress', 'done']),
        dueDate: faker.date.future({
          years: 1,
        }),
      });
    }
  }

  return await Task.create(tasks);
};
