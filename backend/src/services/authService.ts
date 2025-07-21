import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { User, IUser } from '../models/User.js';
import { env } from '../config/env.js';

export interface RegisterInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

export class AuthService {
  private static generateToken(userId: string): string {
    if (!env.JWT_SECRET) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'JWT_SECRET not configured',
      });
    }

    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  private static formatUser(user: IUser) {
    return {
      id: (user._id as any).toString(),
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async register(input: RegisterInput): Promise<AuthResponse> {
    const { username, password } = input;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Username already exists',
      });
    }

    const user = new User({
      username,
      password,
    });

    await user.save();

    const token = this.generateToken((user._id as any).toString());

    return {
      user: this.formatUser(user),
      token,
    };
  }

  static async login(input: LoginInput): Promise<AuthResponse> {
    const { username, password } = input;

    const user = await User.findOne({ username });
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const token = this.generateToken((user._id as any).toString());

    return {
      user: this.formatUser(user),
      token,
    };
  }

  static async getCurrentUser(userId: string) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return this.formatUser(user);
  }
}