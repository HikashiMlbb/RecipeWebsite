import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { pool } from '../config/db';
import * as bcrypt from 'bcrypt'

const salt = 10;

@Injectable()
export class UsersService {
    async login(dto: UserDto) {
        const searchQuery = "SELECT * FROM Users WHERE Username = $1;";
        const searchResult = await pool.query(searchQuery, [ dto.username ]);

        if (searchResult.rowCount == 0) {
            throw new UnauthorizedException('Invalid username or password.');
        }

        const encryptedPassword = searchResult.rows[0].password;
        const isSuccess = await bcrypt.compare(dto.password, encryptedPassword);

        if (!isSuccess) {
            throw new UnauthorizedException('Invalid username or password.');
        }

        return searchResult.rows[0].id;
    }
  
    async register(dto: UserDto) {
        const searchQuery = "SELECT * FROM Users WHERE Username = $1;";
        const searchResult = await pool.query(searchQuery, [ dto.username ]);

        if (searchResult.rowCount != 0) {
            throw new ConflictException("User with given username already exists.");
        }

        const hashedPassword = await bcrypt.hash(dto.password, salt);
        const createQuery = "INSERT INTO Users (username, password) VALUES ($1, $2);";
        await pool.query(createQuery, [dto.username, hashedPassword]);
    }

    async get() { }
}
