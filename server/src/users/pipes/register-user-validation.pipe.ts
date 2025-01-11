import { ArgumentMetadata, NotAcceptableException, PipeTransform } from "@nestjs/common";

export class RegisterUserValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
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