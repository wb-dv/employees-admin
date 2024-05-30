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
import { RegisterDto } from './dto/register.dto';
import { RegisterExistedDto } from './dto/register-existed.dto';
import { HasAccountDto } from './dto/has-account.dto';
import { ExistedAccountResponseDto } from './dto/existed-account-response.dto';

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
    const { access_token } = await this.authService.signToken(req.user);

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

  @ApiOkResponse({ description: 'Успешная регистрация' })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось зарегистрироваться',
  })
  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { access_token } =
        await this.authService.registerNewAccount(registerDto);

      this.setAccessTokenCookie(res, access_token);
    } catch (error) {
      throw new BadRequestException('Не удалось зарегистрироваться');
    }
  }

  @ApiOkResponse({ description: 'Успешная регистрация' })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось зарегистрироваться',
  })
  @Post('/register-existed')
  async registerExisted(
    @Body() registerExistedDto: RegisterExistedDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { access_token } =
        await this.authService.registerExistedAccount(registerExistedDto);

      this.setAccessTokenCookie(res, access_token);
    } catch (error) {
      throw new BadRequestException('Не удалось зарегистрироваться');
    }
  }

  @ApiOkResponse({ type: ExistedAccountResponseDto })
  @DefaultApiBadRequestResponse({ description: 'Нерпавильный формат запроса' })
  @HttpCode(200)
  @Post('/account/exists')
  async hasAccount(@Body() { email }: HasAccountDto) {
    const account = await this.authService.getAccount(email);

    return new ExistedAccountResponseDto(!!account);
  }
}
