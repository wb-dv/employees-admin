import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../../auth.service';
import { JwtPayload } from './types';

const jwtFromCookie = (tokenKey: string) => (req: Request) => {
  if (req && req.cookies) {
    return req.cookies[tokenKey];
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: jwtFromCookie(authService.TOKEN_KEY),
    });
  }

  async validate(payload: JwtPayload) {
    const account = await this.authService.getAccount(payload.email);

    return account;
  }
}
