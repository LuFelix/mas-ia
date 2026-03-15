import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { readFile } from 'fs/promises';

import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

interface SeedUser {
  cpf: string;
  password: string;
  email: string;
  name: string;
}

@Injectable()
export class SeedUsersService {
  private readonly logger = new Logger(SeedUsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async run() {
    this.logger.log('Seeding: usuários (padrão)');

    const collaboratorRole = await this.roleRepository.findOne({ where: { name: 'colaborador' } });
    if (!collaboratorRole) {
      this.logger.warn('Role "colaborador" não encontrada. Usuários não serão seedados.');
      return;
    }

    const filePath = join(__dirname, 'users-data.json');
    const file = await readFile(filePath, 'utf-8');
    const users: SeedUser[] = JSON.parse(file);

    for (const user of users) {
      const existing = await this.userRepository.findOne({ where: [{ cpf: user.cpf }, { email: user.email }] });
      if (existing) {
        this.logger.log(`Usuário já existe: ${user.email} / ${user.cpf}`);
        continue;
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(user.password, salt);

      const newUser = this.userRepository.create({
        name: user.name,
        email: user.email,
        cpf: user.cpf.replace(/\D/g, ''),
        password: passwordHash,
        role: collaboratorRole,
        phonenumber: '00000000000',
        cep: '00000000',
        uf: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        street: 'Rua Exemplo',
      });

      await this.userRepository.save(newUser);
      this.logger.log(`Usuário criado: ${user.email}`);
    }
  }
}
