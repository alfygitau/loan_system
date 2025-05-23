import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/entities/User';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password: _, ...userData } = user;
    return { access_token, user: userData };
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Finds user by id (payload.sub)
  async validateUserById(userId: number) {
    return this.usersService.findOne(userId);
  }
}
