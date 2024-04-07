import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_MICROSERVICE } from 'src/config/services';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_MICROSERVICE)
    private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send({ cmd: 'create' }, createOrderDto)
      .pipe( catchError( err => { throw new RpcException(err) } ) );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersService.send({ cmd: 'find_all' }, orderPaginationDto)
      .pipe( catchError( err  => { throw new RpcException(err) } ) );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.send({ cmd: 'find_one' }, { id })
      .pipe( catchError(err => { throw new RpcException(err) }) );
  }

  @Patch(':id')
  updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.send({ cmd: 'update_order_status' }, { id: id, status: updateOrderStatusDto.status })
      .pipe( catchError( err => { throw new RpcException(err) }) );
  }

}
