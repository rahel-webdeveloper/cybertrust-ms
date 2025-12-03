import type { Request, Response, NextFunction } from 'express';
import Employee from '../models/employee.model';
import Task from '../models/task.model';

export const employeesController = {
  async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await Employee.find().populate('user').lean();

      res.json({ success: true, data: employees });
    } catch (err) {
      next(err);
    }
  },

  async getEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await Employee.findById(req.params.id)
        .populate(
          'user',
          'name email role status profile.avatarUrl profile.phone profile.country'
        )

        .lean();

      if (!employee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }

      res.json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  },

  async getTopEmployees(req: Request, res: Response) {
    try {
      const topEmployees = await Task.aggregate([
        { $unwind: '$assigned' },
        { $group: { _id: '$assigned', taskCount: { $sum: 1 } } },
        { $sort: { taskCount: -1 } },

        // Join with employees
        {
          $lookup: {
            from: 'employees',
            localField: '_id',
            foreignField: '_id',
            as: 'employee',
          },
        },
        { $unwind: '$employee' },

        // Join with users via employee.userId
        {
          $lookup: {
            from: 'users',
            localField: 'employee.user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },

        // Shape the output
        {
          $project: {
            _id: 0,
            employeeId: '$employee._id',
            position: '$employee.position',
            department: '$employee.department',
            salary: '$employee.salary',
            hireDate: '$employee.hireDate',
            taskCount: 1,

            userId: '$user._id',
            name: '$user.name',
            email: '$user.email',
            avatarUrl: '$user.profile.avatarUrl',
            role: '$user.role',
            phone: '$user.profile.phone',
          },
        },
        { $limit: 20 },
      ]);

      if (!topEmployees) {
        res.status(404).json({ success: false, message: 'Employee not found' });
      }

      res.json({ success: true, data: topEmployees });
    } catch (err) {
      console.log(err);
    }
  },
};
