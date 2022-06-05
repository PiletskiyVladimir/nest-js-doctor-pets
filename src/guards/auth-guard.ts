import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUtils } from '../utils/auth.utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;

        const token = AuthUtils.getTokenFromAuthString(authHeader);

        req.user = this.jwtService.verify(token);

        return true;
    }
}
