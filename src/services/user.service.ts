import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { IUserInput, ILoginInput, IUserResponse, ILoginResponse } from '../types/user.types';
import { AppError } from '../types/error.types';

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export class UserService {
  static async register(userData: IUserInput): Promise<IUserResponse> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const user = await User.create(userData);
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static async login(credentials: ILoginInput): Promise<ILoginResponse> {
    const { email, password } = credentials;

    // Check if email and password exist
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    // Generate token
    const token = signToken(user._id);

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  static async getCurrentUser(userId: string): Promise<IUserResponse> {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static async updateUser(
    userId: string,
    updateData: Partial<IUserInput>
  ): Promise<IUserResponse> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static async deleteUser(userId: string): Promise<void> {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }
} 