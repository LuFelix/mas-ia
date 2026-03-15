// seeds/seed.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeedUsersService } from './users/seed-users.service';
import { SeedCertificationsService } from './certifications/seed-certifications.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly seedUsersService: SeedUsersService,
    private readonly seedCertificationsService: SeedCertificationsService,
  ) {}

  async run() {
    this.logger.log('Iniciando o processo de seeding...');

    // 1. Criar as Roles
    const adminRole = await this.seedRoles();

    // 2. Criar o usuário Admin com a role de Administrador
    if (adminRole) {
      await this.seedAdminUser(adminRole);
    } else {
      this.logger.error('A role "administrador" não foi encontrada ou criada. O usuário admin não será populado.');
    }

    // 3. Seed de usuários (colaboradores / dados adicionais)
    await this.seedUsersService.run();

    // 4. Seed de certificações
    await this.seedCertificationsService.run();

    this.logger.log('Seeding concluído com sucesso.');
  }

  /**
   * Cria as roles especificadas se elas não existirem no banco.
   * Retorna a role de "administrador".
   */
  private async seedRoles(): Promise<Role | undefined> {
    const rolesToCreate = ['colaborador', 'administrador', 'gente_e_cultura'];
    let adminRole: Role | undefined;

    for (const roleName of rolesToCreate) {
      const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });

      if (!existingRole) {
        const newRole = this.roleRepository.create({ name: roleName });
        const savedRole = await this.roleRepository.save(newRole);
        this.logger.log(`Role '${savedRole.name}' criada.`);
        if (savedRole.name === 'administrador') {
          adminRole = savedRole;
        }
      } else {
        this.logger.log(`Role '${roleName}' já existe.`);
        if (roleName === 'administrador') {
          adminRole = existingRole;
        }
      }
    }
    return adminRole;
  }

  /**
   * Cria o usuário administrador com o CPF e senha fornecidos.
   */
  private async seedAdminUser(adminRole: Role) {
    const adminCPF = '00000000000'; // CPF do admin
    const adminPassword = 'Senha@123'; // Senha do admin

    const existingAdmin = await this.userRepository.findOne({ where: { cpf: adminCPF } });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const adminUser = this.userRepository.create({
        name: 'Usuário Administrador',
        email: 'admin@meusistema.com',
        cpf: adminCPF,
        password: hashedPassword,
        role: adminRole,
        phonenumber: '00000000000',
        cep: '00000000',
        uf: 'AL',
        city: 'Maceió',
        neighborhood: 'Centro',
        street: 'Rua do Admin',
      });

      await this.userRepository.save(adminUser);
      this.logger.log(`Usuário administrador com CPF ${adminCPF} criado com sucesso.`);
    } else {
      this.logger.log(`Usuário administrador com CPF ${adminCPF} já existe.`);
    }
  }
}