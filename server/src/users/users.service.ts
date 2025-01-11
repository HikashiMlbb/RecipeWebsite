import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { pool } from '../config/db';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

const salt = 10;

@Injectable()
export class UsersService {
    private invalidUsernameOrPassword = 'Invalid username or password.';

    constructor (private jwtService: JwtService) {}

    async login(dto: UserDto) {
        const searchQuery = "SELECT * FROM Users WHERE Username = $1;";
        const searchResult = await pool.query(searchQuery, [ dto.username ]);

        if (searchResult.rowCount == 0) {
            throw new UnauthorizedException(this.invalidUsernameOrPassword);
        }

        const encryptedPassword = searchResult.rows[0].password;
        const isSuccess = await bcrypt.compare(dto.password, encryptedPassword);

        if (!isSuccess) {
            throw new UnauthorizedException(this.invalidUsernameOrPassword);
        }

        const id = searchResult.rows[0].id;

        const token = await this.jwtService.signAsync({ sub: id });

        return token;
    }
  
    async register(dto: UserDto) {
        console.log(`SELECT * FROM Users WHERE Username = '${dto.username}';`);
        const searchQuery = "SELECT * FROM Users WHERE Username = $1;";
        const searchResult = await pool.query(searchQuery, [ dto.username ]);
        // const searchResult = await pool.query(`SELECT * FROM Users WHERE Username = '${dto.username}';`);

        if (searchResult.rows.length != 0) {
            throw new ConflictException("User with given username already exists.");
        }

        const hashedPassword = await bcrypt.hash(dto.password, salt);
        const createQuery = "INSERT INTO Users (username, password) VALUES ($1, $2);";
        await pool.query(createQuery, [dto.username, hashedPassword]);

        const newUserQuery = "SELECT Id FROM Users WHERE Username = $1;";
        const newUserResult = await pool.query(newUserQuery, [ dto.username ]);
        const newUserId: number = newUserResult.rows[0].id;

        const jwt = await this.jwtService.signAsync({ sub: newUserId });
        return jwt;
    }

    async get(id: number) {
        const searchQuery = "SELECT Id, Username FROM Users WHERE Id = $1;";
        const searchResult = await pool.query(searchQuery, [ id ]);

        if (searchResult.rows.length == 0) {
            throw new NotFoundException('User with such ID has not been found.');
        }

        return searchResult.rows[0];
    }
}
