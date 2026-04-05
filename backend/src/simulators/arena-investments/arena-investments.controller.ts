import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArenaInvestmentsService } from './arena-investments.service';
import { SimulateArenaInvestmentsDto } from './dto/simulate-arena-investments.dto';

@ApiTags('Simulators - Arena Investments')
@Controller('simulators/arena-investments')
export class ArenaInvestmentsController {
  constructor(
    private readonly arenaInvestmentsService: ArenaInvestmentsService,
  ) {}

  @Post('simulate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Simula a arena de investimentos por perfil de risco' })
  @ApiResponse({ status: 200, description: 'Simulação da arena realizada com sucesso.' })
  simulate(@Body() dto: SimulateArenaInvestmentsDto) {
    return this.arenaInvestmentsService.simulate(dto);
  }
}
