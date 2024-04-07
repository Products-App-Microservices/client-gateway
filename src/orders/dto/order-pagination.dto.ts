import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusEnum } from "../enums/order-status.enum";
import { IsEnum, IsOptional } from "class-validator";


export class OrderPaginationDto extends PaginationDto {

    @IsEnum(OrderStatusEnum)
    @IsOptional()
    status?: OrderStatus;

}