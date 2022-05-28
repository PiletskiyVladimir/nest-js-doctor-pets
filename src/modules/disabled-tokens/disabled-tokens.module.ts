import { Module } from '@nestjs/common';
import { DisabledTokensService } from './disabled-tokens.service';

@Module({
  providers: [DisabledTokensService]
})
export class DisabledTokensModule {}
