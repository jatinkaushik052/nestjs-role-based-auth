import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwt: JwtService) { }

    async signup(dto) {
        const isUser = await this.userService.findByEmail(dto.email)
        if (!isUser) {
            throw new BadRequestException("User Is Alread Registered")
        }

        const hashPassword = await bcrypt.hash(dto.password, 10)

        const user = this.userService.create({
            ...dto,
            password: hashPassword
        })

        return user
    }

    async login(dto) {
        const dataByEmail = await this.userService.findByEmail(dto.email)
        const isUser = dataByEmail.data

        if (!isUser) {
            throw new BadRequestException("Invalid Email")
        }
        const isPassword = await bcrypt.compare(dto.password, isUser.password)
        if (!isPassword) {
            throw new BadRequestException("Invalid Password")
        }

        const token = this.jwt.sign({
            id: isUser.id,
            email: isUser.email,
            role: isUser.role
        })
        return {
            status: 200,
            message: "Login successful",
            data: {
                user: {
                    id: isUser.id,
                    email: isUser.email,
                    name: isUser.name,
                    role: isUser.role,
                    token:token,
                },
                
            },
        }
    }
}
