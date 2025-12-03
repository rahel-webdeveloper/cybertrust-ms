import { faker } from '@faker-js/faker';
import type { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import Employee from '../models/employee.model';
import Task from '../models/task.model';
import Project from '../models/project.model';
import { selectPassword } from '../scripts/select-password';

type AddUserData = {
  name: string;
  email: string;
  department: string;
  salary: number;
  role: string;
  position?: string | undefined;
};

export const userController = {
  async getUsersList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.aggregate([
        {
          $lookup: {
            from: 'employees',
            localField: '_id',
            foreignField: 'user',
            as: 'employee',
          },
        },
        {
          $unwind: {
            path: '$employee',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: '$_id',
            name: '$name',
            email: '$email',
            role: '$role',
            status: '$status',
            phone: '$profile.phone',
            country: '$profile.country',
            avatarUrl: '$profile.avatarUrl',
            position: '$employee.position',
            department: '$employee.department',
            hireDate: '$employee.hireDate',
            salary: '$employee.salary',
          },
        },
      ]);

      res.status(200).json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },

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

  async changeUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userRole } = req.body;

      if (!userRole) {
        res.status(400).json({ success: false, message: 'User Role is empty' });
        return;
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ success: false, message: 'Employee not found' });
        return;
      }

      await user.updateOne({ role: userRole });

      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },
};
