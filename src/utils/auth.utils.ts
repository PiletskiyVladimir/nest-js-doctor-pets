import { Md5 } from 'md5-typescript';
import { UnauthorizedException } from '@nestjs/common';

export class AuthUtils {
    public static random(min, max): number {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    public static generateSalt(): string {
        let salt = '',
            charUniverse = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+=-\\|[]{};';

        for (let i = 0; i < 4; i++) {
            let randInt = AuthUtils.random(0, charUniverse.length - 1);
            salt += charUniverse[randInt];
        }

        return salt;
    }

    public static cryptPassword(password: string, passwordSalt: string): string {
        return Md5.init(password + passwordSalt);
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
