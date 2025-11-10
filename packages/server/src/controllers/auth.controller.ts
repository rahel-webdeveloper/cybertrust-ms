import type { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import getToken from '../scripts/get-token';
import type { AuthRequest } from '../middleware/auth.middleware';

export const authController = {
  async signUpUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        res
          .status(409)
          .json({ message: 'User with this email already exist.' });
        return;
      }

      const newUser = await User.create({ name, email, password });
      newUser.save();

      const token = getToken(newUser.id.toString(), newUser.role);

      res.status(201).json({ token, newUser });
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User with this email not found.' });
      return;
    }

    try {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
      const token = getToken(user.id, user.role);

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
      console.log(err);
    }
  },

  async deleteAccount(req: AuthRequest, res: Response) {
    const { id: targetUserId } = req.params;

    try {
      const authencatedUserRole = req.user!.role;
      const authencatedUserId = req.user!.id;

      if (authencatedUserRole === 'admin') {
        await User.findByIdAndDelete(targetUserId);

        res
          .status(200)
          .json({ message: `User ${targetUserId} deleted by admin.` });
        return;
      }

      if (targetUserId === authencatedUserId) {
        const { password } = req.body;
        const user = await User.findById(targetUserId);

        const isPasswordMatch = await bcrypt.compare(password, user!.password);

        if (!user || !isPasswordMatch) {
          res
            .status(401)
            .json({ message: 'Invalid credentials or user not found.' });
          return;
        }

        await User.findByIdAndDelete(targetUserId);
        res.status(200).json({ message: 'Account deleted successfully.' });
        return;
      } else {
        // A standard user tried to delete someone else's account
        res
          .status(403)
          .json({ message: 'Forbidden: Cannot delete other accounts.' });
      }
    } catch (err: any) {
      console.log(err);
      throw Error(err);
    }
  },
};
