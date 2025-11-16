import type { Request, Response, NextFunction } from 'express';
import Employee from '../models/employee.model';
import type { UserDocument } from '../models/user.model';

// Define a DTO type for clean responses
interface EmployeeDTO {
  id: string;
  department: string;
  position: string;
  salary: number;
  hireDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatarUrl?: string;
    phone?: string;
    country?: string;
  };
}

export const employeesController = {
  async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await Employee.find()
        .populate(
          'userId',
          'name email role status profile.avatarUrl profile.phone profile.country'
        )
        .lean();

      const formatted: EmployeeDTO[] = employees.map((emp: any) => ({
        id: emp._id.toString(),
        department: emp.department,
        position: emp.position,
        salary: emp.salary,
        hireDate: emp.hireDate,
        createdAt: emp.createdAt,
        updatedAt: emp.updatedAt,
        user: {
          id: emp.userId._id.toString(),
          name: emp.userId.name,
          email: emp.userId.email,
          role: emp.userId.role,
          status: emp.userId.status,
          avatarUrl: emp.userId.profile?.avatarUrl,
          phone: emp.userId.profile?.phone,
          country: emp.userId.profile?.country,
        },
      }));

      res.json({ success: true, data: formatted });
    } catch (err) {
      next(err);
    }
  },

  async getEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await Employee.findById<{ userId: UserDocument }>(
        req.params.id
      )
        .populate(
          'userId',
          'name email role status profile.avatarUrl profile.phone profile.country'
        )
        .lean();

      if (!employee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }

      const formatted: EmployeeDTO = {
        id: employee._id.toString(),
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        hireDate: employee.hireDate ?? null,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        user: {
          id: employee.userId._id.toString(),
          name: employee.userId.name,
          email: employee.userId.email,
          role: employee.userId.role,
          status: employee.userId.status,
          avatarUrl: employee.userId.profile?.avatarUrl,
          phone: employee.userId.profile?.phone,
          country: employee.userId.profile?.country,
        },
      };

      res.json({ success: true, data: formatted });
    } catch (err) {
      next(err);
    }
  },
};
