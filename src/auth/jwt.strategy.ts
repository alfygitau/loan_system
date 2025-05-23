import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Your JWT secret
    });
  }

  // Validate runs automatically after JWT validation; payload is the decoded JWT payload
  async validate(payload: any) {
    // Optionally, validate user existence in DB or roles here
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token - user does not exist');
    }
    // Return user info, which will be attached to req.user
    return user;
  }
}
