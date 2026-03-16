import { Module } from '@nestjs/common';
import { WealthGrowthService } from './wealth-growth.service';
import { WealthGrowthController } from './wealth-growth.controller';

@Module({
  controllers: [WealthGrowthController],
  providers: [WealthGrowthService],
})
export class WealthGrowthModule {}