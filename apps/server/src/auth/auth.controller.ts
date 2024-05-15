import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { WorkerResponseDto } from 'src/workers/dto/response-worker.dto';
import {
  DefaultApiBadRequestResponse,
  DefaultApiUnauthorizedResponse,
} from 'src/errors/default-errors.decorators';

import { LocalAuthGuard } from './strategy/local';
import { JwtAuthGuard } from './strategy/jwt';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import {
  AuthorizedResponseDto,
  RequestWithAuthorizedResponseDtoParams,
} from './dto/authorized-response.dto';
import { CreateWorkerDto } from 'src/workers/dto/create-worker.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly setAccessTokenCookie = (res: Response, token: string) => {
    return res.cookie(this.authService.TOKEN_KEY, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  };

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

    this.setAccessTokenCookie(res, access_token);

    return new AuthorizedResponseDto(req.user);
  }

  @ApiOkResponse({ type: WorkerResponseDto })
  @DefaultApiUnauthorizedResponse()
  @Get('/account')
  @UseGuards(JwtAuthGuard)
  account(@Req() req: RequestWithAuthorizedResponseDtoParams) {
    return new AuthorizedResponseDto(req.user);
  }

  @ApiOkResponse({ description: 'Успешный выход' })
  @DefaultApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.authService.TOKEN_KEY);
  }

  @ApiOkResponse({ type: WorkerResponseDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось зарегистрироваться',
  })
  @Post('/register')
  async register(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { worker, access_token } =
        await this.authService.register(createWorkerDto);

      this.setAccessTokenCookie(res, access_token);

      return worker;
    } catch (error) {
      throw new BadRequestException('Не удалось зарегистрироваться');
    }
  }
}
