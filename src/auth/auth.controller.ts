import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { LoginUserDto, RegisterUserDto } from './dtos';

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
  verifyToken() {
    return this.client.send('verify.token', {})
      .pipe( catchError( err => { throw new RpcException(err) }) )
  }

}
