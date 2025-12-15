import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty } from "class-validator";
import { Role } from "../entities/role.enum";

export class CreateUserDto {

    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsMobilePhone()
    mobile: number

    @IsNotEmpty()
    password: string

    @IsEnum(Role)
    role: Role
}
