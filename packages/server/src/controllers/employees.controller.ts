import type { Request, Response, NextFunction } from 'express';
import Employee from '../models/employee.model';

export const employeesController = {
  async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await Employee.find()
        .populate(
          'user',
          'name email role status profile.avatarUrl profile.phone profile.country'
        )
        .limit(20)
        .lean();

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
};
