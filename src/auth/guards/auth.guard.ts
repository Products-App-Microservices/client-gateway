import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { Observable, firstValueFrom } from "rxjs";
import { NATS_SERVICE } from "src/config/services";


export class AuthGuard implements CanActivate {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { user, token: newToken } = await firstValueFrom(
        await this.client.send('auth.verify.token', token)
      );

      request['user'] = user;
      request['token'] = newToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }

  }

  private getTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const userToken = type === 'Bearer' ? token : undefined;

    return userToken;
  }


}