import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @Post('login')
    async login() {
        return await this.userService.login();
    }

    @Post('register')
    async register() {
        return await this.userService.register();
    }

    @Get('get')
    async get() {
        return this.userService.get();
    }
}
