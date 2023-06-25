import { createParamDecorator } from '@nestjs/common';

export const CurrentAdmin = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();

  return req.admin;
});
