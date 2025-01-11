import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { pool } from '../config/db';
import * as bcrypt from 'bcrypt'

const salt = 10;

@Injectable()
export class UsersService {
    async login() { }

    async register(dto: RegisterUserDto) {
        const searchQuery = "SELECT * FROM Users WHERE Username = $1;";
        const searchResult = await pool.query(searchQuery, [ dto.username ]);

        if (searchResult.rowCount != 0) {
            throw new ConflictException("User with given username already exists.");
        }

        const hashedPassword = await bcrypt.hash(dto.password, salt);
        const createQuery = "INSERT INTO Users (username, password) VALUES ($1, $2);";
        const result = await pool.query(createQuery, [dto.username, hashedPassword]);
        console.log(result);

        return ;
    }

    async get() { }
}
