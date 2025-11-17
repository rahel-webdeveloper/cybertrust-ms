import { faker } from '@faker-js/faker';
import User from '../models/user.model';

export const seedUsers = async () => {
  let users = [];

  users.push(
    new User({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: Bun.env.ADMIN_PW.toString(),
      role: 'admin',
      profile: {
        avatarUrl: faker.image.personPortrait({ sex: 'male', size: 256 }),
        country: faker.location.country(),
        phone: faker.phone.number(),
      },
    })
  );

  for (let i = 0; i <= 7; i++) {
    users.push(
      new User({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: 'manager123',
        role: 'manager',
        profile: {
          avatarUrl: faker.image.personPortrait({ sex: 'male', size: 256 }),
          country: faker.location.country(),
          phone: faker.phone.number(),
        },
      })
    );
  }

  for (let i = 0; i <= 55; i++) {
    users.push(
      new User({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: 'developer123',
        role: 'developer',
        profile: {
          avatarUrl: faker.image.personPortrait({ sex: 'male', size: 512 }),
          country: faker.location.country(),
          phone: faker.phone.number(),
        },
      })
    );
  }

  return User.create(users);
};
