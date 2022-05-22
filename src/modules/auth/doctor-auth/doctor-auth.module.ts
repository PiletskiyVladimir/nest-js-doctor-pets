import { Module } from '@nestjs/common';
import { DoctorAuthController } from './doctor-auth.controller';
import { DoctorAuthService } from './doctor-auth.service';

@Module({
    providers: [DoctorAuthService],
    controllers: [DoctorAuthController],
})
export class DoctorAuthModule {}
