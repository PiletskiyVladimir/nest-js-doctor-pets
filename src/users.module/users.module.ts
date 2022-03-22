import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from "./user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import {SessionsModule} from "../sessions.module/sessions.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SessionsModule,
      SequelizeModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule {}
