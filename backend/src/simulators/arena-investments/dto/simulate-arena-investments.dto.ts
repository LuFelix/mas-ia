import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class SimulateArenaInvestmentsDto {
  @ApiProperty({ description: 'Capital inicial investido (R$)', example: 1000 })
  @IsNumber()
  @IsPositive()
  initialCapital: number;

  @ApiProperty({ description: 'Aporte mensal (R$)', example: 500 })
  @IsNumber()
  @IsPositive()
  monthlyContribution: number;

  @ApiProperty({ description: 'Prazo da simulação em meses', example: 60 })
  @IsNumber()
  @IsPositive()
  periodMonths: number;
}
