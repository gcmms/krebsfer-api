import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefresh } from '../../auth/interfaces/jwt-payload.interface';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayloadWithRefresh => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
