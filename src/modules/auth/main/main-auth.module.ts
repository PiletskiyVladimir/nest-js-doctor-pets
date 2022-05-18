import { Module } from '@nestjs/common';
import { MainAuthService } from './main-auth.service';

@Module({
    controllers: [],
    providers: [MainAuthService],
})
export class MainAuthModule {}
