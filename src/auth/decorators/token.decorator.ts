import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const Token = createParamDecorator((data: any, context: ExecutionContext) => {

  const request = context.switchToHttp().getRequest();

  if (!request.token) {
    throw new InternalServerErrorException();
  }

  return request.token;
})