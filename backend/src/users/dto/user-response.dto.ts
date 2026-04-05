import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserRespondeDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João Silva' })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  // 🟢 Alterado para aceitar null, refletindo a Entity
  @ApiProperty({ example: '12345678900', nullable: true })
  cpf: string | null;

  @ApiProperty({ example: '11987654321', required: false, nullable: true })
  phonenumber?: string | null;

  @ApiProperty({ example: '12345678', required: false, nullable: true })
  cep?: string | null;

  @ApiProperty({ example: 'SP', required: false, nullable: true })
  uf?: string | null;

  @ApiProperty({ example: 'São Paulo', required: false, nullable: true })
  city?: string | null;

  @ApiProperty({ example: 'Centro', required: false, nullable: true })
  neighborhood?: string | null;

  @ApiProperty({ example: 'Rua das Flores', required: false, nullable: true })
  street?: string | null;

  @ApiProperty({ example: 'Colaborador', required: false })
  role?: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    
    // 🟢 O operador '?? null' garante que se vier nulo do banco, 
    // ele atribui nulo sem erro de compilação.
    this.cpf = user.cpf ?? null;
    this.phonenumber = user.phonenumber ?? null;
    this.cep = user.cep ?? null;
    this.uf = user.uf ?? null;
    this.city = user.city ?? null;
    this.neighborhood = user.neighborhood ?? null;
    this.street = user.street ?? null;
    
    // Para o role, mantemos a lógica de segurança
    this.role = user.role ? user.role.name : undefined;
  }
}