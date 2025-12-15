import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    mobile: string

    @IsNotEmpty()
    department: string

    @IsNotEmpty()
    experience: string
}
