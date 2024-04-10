import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (error.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: error.toString().slice(0, error.toString().indexOf('(') - 1)
      });
    }

    if (
      typeof error === 'object' && 
      'status' in error && 
      'message' in error && 
      typeof error.status === 'number'
    ) {
      const status = isNaN(error.status) ? 400 : error.status;
      return response.status(status).json(error);
    }

    return response.status(400).json({
      status: 400,
      message: error
    })

  }
}