import { Module } from '@nestjs/common';
import { ClientAuthController } from './client-auth.controller';
import { ClientAuthService } from './client-auth.service';
import { ClientModule } from '../../client/client.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [ClientAuthController],
    providers: [ClientAuthService],
    imports: [
        ClientModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [],
})
export class ClientAuthModule {}
