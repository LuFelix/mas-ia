// users/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, Matches, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '12345678900' })
  @IsOptional() 
  @IsString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({ required: false, example: 2 })
  @IsOptional()
  @IsNumber()
  role_id?: number;

  @ApiProperty({ example: '11987654321' })
  @IsString()
  @Length(10, 11)
  phonenumber?: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @Length(8, 8)
  cep?: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @Length(2, 2)
  uf?: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  neighborhood?: string;

  @ApiProperty({ example: 'Rua das Flores' })
  @IsString()
  street?: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha com letras minúsculas, maiúsculas, números e caractere especial',
  })
  @IsString()
  @Matches(/(?=.*[a-z])/, { message: 'Deve conter letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'Deve conter letra maiúscula' })
  @Matches(/(?=.*\d)/, { message: 'Deve conter número' })
  @Matches(/(?=.*[\W_])/, { message: 'Deve conter caractere especial' })
  @Length(8, 100)
  password!: string;
}
