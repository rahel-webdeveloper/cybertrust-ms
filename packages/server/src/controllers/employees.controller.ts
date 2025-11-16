import Employee from '../models/employee.model';
import type { Request, Response } from 'express';

export const employeesController = {
  async listEmployees(req: Request, res: Response) {
    const employees = await Employee.find().populate('userId');
    res.send({
      success: true,
      data: employees,
    });
  },

  async getEmployee(req: Request, res: Response) {
    const singleEmployee = await Employee.find({
      _id: req.params.id,
    }).populate('userId');

    res.send({
      success: true,
      data: singleEmployee,
    });
  },
};
