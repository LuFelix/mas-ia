import { IsNumber, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SimulateWealthGrowthDto {
  @ApiProperty({ description: 'Capital inicial investido (R$)', example: 1000 })
  @IsNumber()
  @Min(0)
  initialCapital!: number;

  @ApiProperty({ description: 'Aporte mensal (R$)', example: 500 })
  @IsNumber()
  @Min(0)
  monthlyContribution!: number;

  @ApiProperty({ description: 'Taxa de juros mensal em %', example: 1.0 })
  @IsNumber()
  @IsPositive()
  interestRate!: number;

  @ApiProperty({ description: 'Prazo da simulação em meses', example: 60 })
  @IsNumber()
  @IsPositive()
  periodMonths!: number;
}