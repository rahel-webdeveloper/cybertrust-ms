import { faker } from '@faker-js/faker';
import type { Request, Response } from 'express';
import User from '../models/user.model';
import Employee from '../models/employee.model';
import Task from '../models/task.model';
import Project from '../models/project.model';

type AddUserData = {
  name: string;
  email: string;
  department: string;
  salary: number;
  role: string;
  position?: string | undefined;
};

const selectPassword = (role: string) => {
  if (role === 'admin') return Bun.env.ADMIN_PW;
  else if (role === 'manager') return 'manager123';
  else if (role === 'developer') return 'developer';
  else return 'There is no role specified to set password';
};

export const userController = {
  async addNewUser(req: Request, res: Response) {
    try {
      const userData: AddUserData = req.body;
      const fakeImage = faker.image.personPortrait({ sex: 'male', size: 512 });

      if (!userData) {
        res
          .status(400)
          .json({ success: false, message: 'User data is required' });
        return;
      }

      const userExist = await User.findOne({ email: userData.email });
      if (userExist) {
        const error = new Error('User with this email already exists');
        error.statusCode = 409;
        throw error;
      }

      const selectedPassword = selectPassword(userData.role);
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
        message: 'New user created successfully',
        newUser: user,
        newEmployee: employee,
      });
    } catch (err: any) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server error',
      });
      console.log(err);
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { userEmail } = req.params;

      if (!userEmail) {
        res
          .status(400)
          .json({ success: false, message: 'Please enter valid email' });
        return;
      }

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        res.status(404).json({
          success: false,
          message: `User not found with the email of (${userEmail})`,
        });
        return;
      }

      await Employee.deleteOne({
        user: user._id,
      });

      await Project.updateMany(
        {
          team: user._id,
        },
        {
          $pull: { team: user._id },
        }
      );

      await Task.updateMany(
        {
          assigned: user._id,
        },
        {
          $pull: { assigned: user._id },
        }
      );

      await User.deleteOne({ _id: user._id });

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: 'Server error', error: err });
      console.log(err);
    }
  },
};
