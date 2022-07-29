import { Controller } from '@nestjs/common';
import { MainAuthController } from '../main-auth/main-auth.controller';
import { DoctorService } from '../../doctor/doctor.service';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from '../../doctor/doctor.model';

@Controller('doctor-auth')
export class DoctorAuthController extends MainAuthController<DoctorService> {
    constructor(protected jwtService: JwtService) {
        super(new DoctorService(Doctor), jwtService);
    }
}
