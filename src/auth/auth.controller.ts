import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { GetUser, Token } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy, 
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto)
      .pipe( catchError( err => { throw new RpcException(err) }) )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto)
      .pipe( catchError( err => { throw new RpcException(err) }) )
  }

  @Post('verify-token')
  @UseGuards( AuthGuard )
  verifyToken(@GetUser() user: any, @Token() token: string) {
    return {
      user,
      token,
    }
  }

}
