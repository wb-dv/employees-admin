import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ErrorDto } from './error.dto';

const BAD_REQUEST_DESCRIPTION =
  'Неудачная операция, нерпавильный формат запроса';

type DefaultErrorDecoratorParams = {
  description?: string;
};

export const DefaultApiBadRequestResponse = ({
  description = BAD_REQUEST_DESCRIPTION,
}: DefaultErrorDecoratorParams = {}) =>
  ApiBadRequestResponse({
    description: description,
    type: ErrorDto,
  });

const NOT_FOUND_DESCRIPTION = 'Ничего не найдено';

export const DefaultApiNotFoundResponse = ({
  description = NOT_FOUND_DESCRIPTION,
}: DefaultErrorDecoratorParams = {}) =>
  ApiNotFoundResponse({
    description: description,
    schema: {
      example: new NotFoundException(description).getResponse(),
    },
    type: ErrorDto,
  });

const UNAUTHORIZED_DESCRIPTION =
  'Пользователь не авторизован или неверные данные';

export const DefaultApiUnauthorizedResponse = ({
  description = UNAUTHORIZED_DESCRIPTION,
}: DefaultErrorDecoratorParams = {}) =>
  ApiUnauthorizedResponse({
    description: description,
    schema: {
      example: new UnauthorizedException(description).getResponse(),
    },
    type: ErrorDto,
  });
