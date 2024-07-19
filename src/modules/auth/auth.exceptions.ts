import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenExpiredException extends HttpException {
  constructor() {
    super('The token has expired', HttpStatus.UNAUTHORIZED);
  }
}

export class TokenInvalidException extends HttpException {
  constructor() {
    super('The token is invalid', HttpStatus.UNAUTHORIZED);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('El correo no está asociado a ninguna cuenta.', HttpStatus.NOT_FOUND);
  }
}