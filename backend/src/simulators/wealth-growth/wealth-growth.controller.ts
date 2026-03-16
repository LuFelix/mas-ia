import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WealthGrowthService } from './wealth-growth.service';
import { SimulateWealthGrowthDto } from './dto/simulate-wealth-growth.dto';

@ApiTags('Simulators - Wealth Growth')
@Controller('simulators/wealth-growth')
export class WealthGrowthController {
  constructor(private readonly wealthGrowthService: WealthGrowthService) {}

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calcula a projeção de crescimento patrimonial (Juros Compostos)' })
  @ApiResponse({ status: 200, description: 'Cálculo financeiro realizado com sucesso.' })
  calculate(@Body() simulateWealthGrowthDto: SimulateWealthGrowthDto) {
    return this.wealthGrowthService.calculate(simulateWealthGrowthDto);
  }
}