import { IsBoolean, IsEnum, IsNumber, IsPositive } from "class-validator";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { Type } from "class-transformer";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    totalAmount: number;
    
    
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    totalItems: number;

    @IsEnum(OrderStatusEnum, {
        message: `The provided status must be in ${ OrderStatusEnum }`
    })
    status: string;

    @IsBoolean()
    paid: boolean;
}
