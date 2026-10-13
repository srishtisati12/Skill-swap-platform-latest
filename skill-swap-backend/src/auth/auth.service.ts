import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    const user = await this.usersService.createUser(data);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
  
}