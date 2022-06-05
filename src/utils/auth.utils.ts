import { UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';

export class AuthUtils {
    public static random(min, max): number {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    public static getTokenFromAuthString(authString: string): string {
        const bearer = authString.split(' ')[0];
        const token = authString.split(' ')[1];

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: 'User is unauthorized' });
        }

        return token;
    }

    public static generateSalt(): string {
        let salt = '';
        const charUniverse = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+=-\\|[]{};';

        for (let i = 0; i < 4; i++) {
            const randInt = AuthUtils.random(0, charUniverse.length - 1);
            salt += charUniverse[randInt];
        }

        return salt;
    }

    public static cryptPassword(password: string, passwordSalt: string): string {
        return createHash('md5')
            .update(password + passwordSalt)
            .digest('hex');
    }

    public static comparePasswordWithPasswordInDB(
        password: string,
        passwordSalt: string,
        passwordFromDB: string
    ): boolean {
        return AuthUtils.cryptPassword(password, passwordSalt) === passwordFromDB;
    }

    public static getJWTTokenFromAuthString(token: string) {
        const bearer = token.split(' ')[0];
        const jwt_token = token.split(' ')[1];

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: 'Entity is unauthorized' });
        }

        return jwt_token;
    }
}
