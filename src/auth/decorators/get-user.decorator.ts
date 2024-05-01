import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data: any, context: ExecutionContext) => {

  const request = context.switchToHttp().getRequest();

  if ( !request.user ) {
    throw new InternalServerErrorException('User not found in the request');
  }

  return request.user;
})