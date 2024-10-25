import { IsString, IsInt, Length, IsPositive } from "class-validator";

export class CreatePropertydto{
    @IsString()
    @Length(2, 10, {message: 'error on length'})
    name:string;
    @IsString()
    @Length(2, 10, {groups: ['create']})
    @Length(1, 15, {groups: ['update']})
    description:string;

    @IsInt()
    @IsPositive()
    area:number;
}