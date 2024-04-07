import { IsEnum } from "class-validator";
import { OrderStatus, OrderStatusEnum } from "../enums/order-status.enum";


export class UpdateOrderStatusDto {

    @IsEnum(OrderStatusEnum, {
        message: `Valid status are ${ OrderStatusEnum }`,
    })
    status: OrderStatus;

}