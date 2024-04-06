import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

import { PaginationDto } from 'src/common';
import { PRODUCTS_MICROSERVICE } from 'src/config/services';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCTS_MICROSERVICE)
    private readonly productsService: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.send({ cmd: 'create' }, createProductDto)
      .pipe( catchError( err => { throw new RpcException(err) }) );
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsService.send({ cmd: 'find_all' }, paginationDto)
      .pipe( catchError( err => { throw new RpcException(err) }) );
  }

  @Get(':id') 
  async findProductById(@Param('id', ParseIntPipe) id: number) {

    return this.productsService.send({ cmd: 'find_one' }, id)
      .pipe(catchError( err => { throw new RpcException(err) }));
    
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.send({ cmd: 'update' }, {
      id: id,
      ...updateProductDto
    }).pipe(catchError( err => { throw new RpcException(err) }));
  }

  @Delete(':id') 
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.send({ cmd: 'delete' }, id);
  }

}
