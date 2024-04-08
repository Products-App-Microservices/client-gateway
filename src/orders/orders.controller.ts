import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { UpdateOrderStatusDto, CreateOrderDto, OrderPaginationDto } from './dto';
import { NATS_SERVICE } from 'src/config/services';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create' }, createOrderDto)
      .pipe( catchError( err => { throw new RpcException(err) } ) );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send({ cmd: 'find_all' }, orderPaginationDto)
      .pipe( catchError( err  => { throw new RpcException(err) } ) );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'find_one' }, { id })
      .pipe( catchError(err => { throw new RpcException(err) }) );
  }

  @Patch(':id')
  updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.client.send({ cmd: 'update_order_status' }, { id: id, status: updateOrderStatusDto.status })
      .pipe( catchError( err => { throw new RpcException(err) }) );
  }

}
