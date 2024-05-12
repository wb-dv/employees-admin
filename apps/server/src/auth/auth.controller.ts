import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login() {}

  @Post('/register')
  register() {}

  @Post('/logout')
  logout() {}
}
