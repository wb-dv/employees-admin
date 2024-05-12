import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { WorkerResponseDto } from 'src/workers/dto/response-worker.dto';
import { DefaultApiUnauthorizedResponse } from 'src/errors/default-errors.decorators';

import { LocalAuthGuard } from './strategy/local';
import { JwtAuthGuard } from './strategy/jwt';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import {
  AuthorizedResponseDto,
  RequestWithAuthorizedResponseDtoParams,
} from './dto/authorized-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: WorkerResponseDto })
  @ApiBody({ type: LoginDto })
  @DefaultApiUnauthorizedResponse()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: RequestWithAuthorizedResponseDtoParams,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return new AuthorizedResponseDto(req.user);
  }

  @ApiOkResponse({ type: WorkerResponseDto })
  @Get('/account')
  @UseGuards(JwtAuthGuard)
  account(@Req() req: RequestWithAuthorizedResponseDtoParams) {
    return new AuthorizedResponseDto(req.user);
  }

  @Post('/register')
  register() {}

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  logout() {}
}
