import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto){
        return this.authService.signup(dto)
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() dto){
        return this.authService.login(dto)
    }
}
