import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export interface AuthRequest extends Request {
  user?: {
    id?: string;
    role?: string;
    name?: string;
    email?: string;
  };
}

export const protect = (allowedRoles?: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    try {
      if (!token) {
        res.status(401).json({ message: 'In valid token' });
        return;
      }

      const decoded: any = jwt.verify(token, Bun.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = {
        id: user?.id,
        role: user?.role,
        name: user?.name,
        email: user?.email,
      };

      if (allowedRoles && !allowedRoles.includes(user!.role)) {
        res.status(403).json({ message: 'Forbidden: insufficient role' });
        return;
      }

      next();
    } catch (err: any) {
      return res
        .status(401)
        .json({ message: 'Invalid token', error: err.message });
    }
  };
};
