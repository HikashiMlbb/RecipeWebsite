import { NotAcceptableException, PipeTransform } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";

export class UserValidationPipe implements PipeTransform {
    transform(value: UserDto) {
        if (!value.username) {
            throw new NotAcceptableException('Username must be specified.');
        }

        if (!value.password) {
            throw new NotAcceptableException('Password must be specified.');
        }

        value.username = value.username.toString();
        value.password = value.password.toString();

        return value;
    }
}