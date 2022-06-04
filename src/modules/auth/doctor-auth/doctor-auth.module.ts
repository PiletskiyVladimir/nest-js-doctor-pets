import { Module } from '@nestjs/common';
import { DoctorAuthController } from './doctor-auth.controller';
import { DoctorAuthService } from './doctor-auth.service';
import { DoctorModule } from '../../doctor/doctor.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [DoctorAuthService],
    controllers: [DoctorAuthController],
    imports: [
        DoctorModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
})
export class DoctorAuthModule {}
