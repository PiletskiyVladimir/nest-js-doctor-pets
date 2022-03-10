import {Md5} from 'md5-typescript';

export class Utils {
    public static random(min, max): number {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    public static generateSalt(): string {
        let salt = '',
            charUniverse = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+=-\\|[]{};';

        for (let i = 0; i < 4; i++) {
            let randInt = Utils.random(0, charUniverse.length - 1);
            salt += charUniverse[randInt];
        }

        return salt;
    }

    public static cryptPassword(password: string, passwordSalt: string): string {
        return Md5.init(password + passwordSalt);
    }

    public static comparePasswordWithPasswordInDB(password: string, passwordSalt: string, passwordFromDB: string): boolean {
        return Utils.cryptPassword(password, passwordSalt) === passwordFromDB;
    }

    public static generateToken(): string {
        let now = Date.now();

        return Md5.init(now);
    }
}