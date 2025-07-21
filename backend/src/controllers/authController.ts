import { AuthService } from '../services/authService.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';
import type { RegisterInput, LoginInput } from '../validators/authValidators.js';

export class AuthController {
  static async register(input: RegisterInput) {
    const validatedInput = registerSchema.parse(input);
    return AuthService.register(validatedInput);
  }

  static async login(input: LoginInput) {
    const validatedInput = loginSchema.parse(input);
    return AuthService.login(validatedInput);
  }

  static async getCurrentUser(userId: string) {
    return AuthService.getCurrentUser(userId);
  }
}