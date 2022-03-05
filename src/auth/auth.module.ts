import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { UsersModule } from "../users/users.module";
import {SessionsService} from "../sessions/sessions.service";
import {SessionsModule} from "../sessions/sessions.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      SequelizeModule.forFeature([User]),
      SessionsModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
