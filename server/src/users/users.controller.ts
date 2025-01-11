import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserValidationPipe } from './pipes/user-validation.pipe';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body(UserValidationPipe) userDto: UserDto) {
        try {
            return await this.userService.login(userDto);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('register')
    async register(@Body(UserValidationPipe) userDto: UserDto) {
        try {
            return await this.userService.register(userDto);
        } catch (error) {
            throw error;
        }
    }

    @Get('get')
    async get() {
        return this.userService.get();
    }
}
