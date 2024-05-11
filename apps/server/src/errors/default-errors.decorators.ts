import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

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
    schema: {
      example: new BadRequestException(description).getResponse(),
    },
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
  });
