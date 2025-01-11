import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @Post('login')
    async login() {
        return await this.userService.login();
    }

    @HttpCode(201)
    @Post('register')
    async register(@Body(RegisterUserValidationPipe) registerUserDto: RegisterUserDto) {
        try {
            return await this.userService.register(registerUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Get('get')
    async get() {
        return this.userService.get();
    }
}
