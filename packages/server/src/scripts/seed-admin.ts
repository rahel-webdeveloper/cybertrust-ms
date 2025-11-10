import User from '../models/user.model';

const { ADMIN_EMAIL, ADMIN_PW } = Bun.env;

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: ADMIN_EMAIL });

    if (exists) {
      console.log('Admin already exist.', exists.email);
      return;
    }

    const user = await User.create({
      email: ADMIN_EMAIL,
      name: 'Rahel',
      password: ADMIN_PW,
      role: 'admin',
    });

    user.save();

    console.log('Admin account created.');
  } catch (error) {
    console.log('Faild to login or create admin account!');
  }
};

export default seedAdmin;
