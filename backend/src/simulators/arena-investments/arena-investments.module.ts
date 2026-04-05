import { Module } from '@nestjs/common';
import { ArenaInvestmentsController } from './arena-investments.controller';
import { ArenaInvestmentsService } from './arena-investments.service';

@Module({
  controllers: [ArenaInvestmentsController],
  providers: [ArenaInvestmentsService],
})
export class ArenaInvestmentsModule {}
