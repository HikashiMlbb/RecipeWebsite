import { Body, Controller, Get, HttpCode, Post, Query, RawBodyRequest, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserValidationPipe } from './pipes/user-validation.pipe';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body(UserValidationPipe) userDto: UserDto, @Res({ passthrough: true }) response: Response) {
        try {
            const token = await this.userService.login(userDto);
            response.cookie('authorization', token);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('register')
    async register(@Body(UserValidationPipe) userDto: UserDto, @Res({ passthrough: true}) response: Response) {
        try {
            const token = await this.userService.register(userDto);
            response.cookie('authorization', token);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Get('get')
    async get(@Query('id') id: number) {
        try {
            return await this.userService.get(id);
        } catch (error) {
            throw error;
        }
    }
}
