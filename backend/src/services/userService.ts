import type { User } from '../types/index.js';

export class UserService {
  async getUsers(): Promise<User[]> {
    // This would typically query your database
    return [
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'jane@example.com',
        name: 'Jane Smith',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // This would typically create a user in your database
    return {
      id: Math.random().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export const userService = new UserService();