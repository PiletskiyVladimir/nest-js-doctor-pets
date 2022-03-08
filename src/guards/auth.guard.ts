import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {SessionsService} from "../sessions/sessions.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionsService,
                private usersService: UsersService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req =context.switchToHttp().getRequest();

        if (!req.headers.authorization) {
            return false;
        }

        let authorization = req.headers.authorization;

        authorization = authorization.split(' ');

        let bearer = authorization[0],
            token = authorization[1];

        if (bearer !== 'Bearer' || !token) return false;

        let session = await this.sessionService.getByValue(token);

        if (!session) return false;

        let user = this.usersService.getById(session.user_id);

        if (!user) return false;

        req.user = user;

        return true;
    }
}