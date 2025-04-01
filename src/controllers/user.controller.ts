import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { IUserInput, ILoginInput } from '../types/user.types';

export class UserController {
  static async register(
    req: Request<{}, {}, IUserInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request<{}, {}, ILoginInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await UserService.login(req.body);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getCurrentUser(req.user._id);
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request<{ id: string }, {}, Partial<IUserInput>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
} 