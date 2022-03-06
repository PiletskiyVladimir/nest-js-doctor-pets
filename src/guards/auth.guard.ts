import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {SessionsService} from "../sessions/sessions.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionsService) {
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

        req.user = session.user_id;

        return true;
    }
}