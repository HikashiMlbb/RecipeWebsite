import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserAuthorized implements CanActivate {
    constructor (private jwt: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authToken = request.cookies['authentication'];

        if (!authToken) {
            throw new UnauthorizedException();
        }

        try {
            const result = await this.jwt.verifyAsync(authToken);
            request['user-id'] = result.sub;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

}