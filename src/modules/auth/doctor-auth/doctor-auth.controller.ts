import { Controller } from '@nestjs/common';
import { MainAuthController } from '../main-auth/main-auth.controller';
import { DoctorService } from '../../doctor/doctor.service';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from '../../doctor/doctor.model';

@Controller('doctor')
export class DoctorAuthController extends MainAuthController<{
    service: DoctorService;
    dto: CreateDoctorDto;
}> {
    constructor(protected jwtService: JwtService) {
        super(
            {
                dto: new CreateDoctorDto(),
                service: new DoctorService(Doctor),
            },
            jwtService
        );
    }
}
