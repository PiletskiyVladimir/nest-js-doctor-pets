import { Module } from '@nestjs/common';
import { MainAuthController } from './main-auth.controller';

@Module({
    controllers: [MainAuthController],
    providers: [],
    imports: [],
    exports: [],
})
export class MainAuthModule {}
