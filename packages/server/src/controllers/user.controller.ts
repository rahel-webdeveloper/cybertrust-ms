import { faker } from '@faker-js/faker';
import type { Request, Response } from 'express';
import User from '../models/user.model';
import Employee from '../models/employee.model';

type AddUserFormData = {
  name: string;
  email: string;
  department: string;
  salary: number;
  role: string;
  position?: string | undefined;
};

const selectPassord = (role: string) => {
  if (role === 'admin') return Bun.env.ADMIN_PW;
  else if (role === 'manager') return 'manager123';
  else if (role === 'developer') return 'developer';
  else return 'There is no role specified to set password';
};

export const userController = {
  async addNewUser(req: Request, res: Response) {
    try {
      const userData: AddUserFormData = req.body;
      const fakeImage = faker.image.personPortrait({ sex: 'male', size: 512 });
      const selectedPassword = selectPassord(userData.role);

      if (!userData) {
        res
          .status(400)
          .json({ success: false, message: 'Please enter valid data' });
        return;
      }

      const user = await User.create({
        email: userData.email,
        name: userData.email,
        password: selectedPassword,
        role: userData.role,
        profile: {
          avatarUrl: fakeImage,
        },
      });

      const employee = await Employee.create({
        department: userData.department,
        position: userData.position,
        salary: userData.salary,
        hireDate: new Date(),
        user: user._id,
      });

      await user.save();
      await employee.save();

      res.status(200).json({
        success: true,
        message: 'New user created success full',
        newUser: user,
        newEmployee: employee,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
