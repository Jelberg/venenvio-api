import { IDataUserAuth } from '../interfaces/IDataUserAuth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserAuth = createParamDecorator((data: string, ctx: ExecutionContext): IDataUserAuth => {
  const req: Request = ctx.switchToHttp().getRequest();
  return data ? req.dataUser && req.dataUser[data] : req.dataUser;
});
