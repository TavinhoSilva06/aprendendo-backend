import { IsString, IsInt, Length, IsPositive } from "class-validator";

export class CreatePropertydto{
    @IsString()
    @Length(2, 10, {message: 'error on length'})
    name:string;
    @IsString()
    description:string;

    @IsInt()
    @IsPositive()
    area:number;
}