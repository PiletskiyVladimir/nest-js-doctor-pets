import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthGetter = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
