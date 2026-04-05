// users/users.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, ILike, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import * as XLSX from 'xlsx';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserFilterDto } from 'src/admin/dto/userfilter.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,

        private readonly rolesService: RolesService,
    ) { }

   /**
     * Cria um novo usuário. Suporta atribuição dinâmica de roles (para Admins) 
     * ou fallback para a role padrão (para auto-cadastro público).
     *
     * @param {CreateUserDto} createUserDto - DTO com dados do usuário.
     * @throws {BadRequestException} Se o E-mail/CPF já existir ou a role for inválida.
     * @returns {Promise<User>} O usuário criado.
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        // Agora extraímos também o e-mail e possivelmente a role que o Admin quer passar
        const { email, cpf, password, role_id } = createUserDto; 

        // 1. Validação de E-mail (Nova Regra de Ouro)
        const emailExists = await this.usersRepository.findOne({ where: { email } });
        if (emailExists) {
            throw new BadRequestException('Usuário com este e-mail já existe');
        }

        // 2. Validação de CPF (Condicional)
        if (cpf) {
            const cpfExists = await this.usersRepository.findOne({ where: { cpf } });
            if (cpfExists) {
                throw new BadRequestException('Usuário com este CPF já existe');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Lógica Dinâmica de Roles
        let assignedRole;
        if (role_id) {
            // Se vier um role_id no DTO (ex: Admin criando outro usuário via painel)
            assignedRole = await this.rolesRepository.findOne({ where: { id: role_id } });
        } else {
            // Fallback: Cadastro público via AuthService assume a role padrão
            assignedRole = await this.rolesRepository.findOne({ where: { name: 'colaborador' } });
        }

        if (!assignedRole) {
            throw new BadRequestException('Role especificada não existe');
        }

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            role: assignedRole, // Atribui a role resolvida
        });

        return this.usersRepository.save(user);
    }
    async updateRole(userId: number, roleName: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`Usuário com o ID "${userId}" não encontrado.`);
        }

        const role = await this.rolesRepository.findOneBy({ name: roleName });
        if (!role) {
            throw new BadRequestException(`A role "${roleName}" não é válida.`);
        }

        user.role = role;

        return this.usersRepository.save(user);
    }

    /**
     * Busca um usuário pelo CPF e retorna com a role.
     *
     * @param {string} cpf - CPF do usuário.
     * @returns {Promise<User | null>} Usuário encontrado ou null.
     */
    async findByCpf(cpf: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { cpf }, relations: ['role'] });
    }

    /**
     * Busca um usuário pelo CPF e retorna com a role.
     *
     * @param {string} userId - Id do usuário no banco de dados.
     * @returns {Promise<User | null>} Usuário encontrado ou null.
     */
    async findById(userId: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id: userId }, relations: ['role'] });
    }

    /**
     * Busca todos os usuários com paginação e filtros opcionais.
     *
     * @param {number} page - Número da página.
     * @param {number} limit - Limite de itens por página.
     * @param {string} [name] - Nome para filtro opcional.
     * @param {string} [email] - Email para filtro opcional.
     * @param {string} [cpf] - CPF para filtro opcional.
     * @returns {Promise<{ data: User[], total: number }>} Lista de usuários e total.
     */
    async findAll(page?: number, limit?: number, name?: string, email?: string, cpf?: string): Promise<{ data: User[], total: number }> {
        const skip = page && limit ? (page - 1) * limit : 0;

        const where: any = {};

        if (name) {
            where.name = ILike(`%${name}%`);
        }
        if (email) {
            where.email = Like(`%${email}%`);
        }
        if (cpf) {
            where.cpf = Like(`%${cpf}%`);
        }

        const findOptions: FindManyOptions<User> = {
            order: {
                name: 'ASC',
            },
            skip: skip,
            take: limit ?? undefined,
            where: where,
            select: ['id', 'name', 'email', 'cpf','isVerified'],   
        };

        const [data, total] = await this.usersRepository.findAndCount(findOptions);

        return {
            data,
            total,
        };
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });

        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const emailExists = await this.usersRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (emailExists) {
                throw new BadRequestException('Email já está em uso por outro usuário');
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        // Handle role separately
        if (updateUserDto.role) {
            const role = await this.rolesService.findOneByName(updateUserDto.role);
            user.role = role;
        }

        // Create a copy of the DTO without the role property
        const { role: roleFromDto, ...userUpdateData } = updateUserDto;

        // Now merge only the compatible properties
        const updatedUser = this.usersRepository.merge(user, userUpdateData);

        return this.usersRepository.save(updatedUser);
    }

    /**
     * Injeta o código de verificação e a data de expiração no usuário.
     * Chamado logo após a criação da conta.
     */
    async setVerificationData(userId: number, code: string, expires: Date): Promise<void> {
        await this.usersRepository.update(userId, {
            verificationCode: code,
            verificationExpires: expires,
        });
    }

    /**
     * Marca o e-mail do usuário como verificado e limpa os dados temporários.
     * Chamado quando o usuário acerta o código enviado por e-mail.
     */
    async markEmailAsVerified(userId: number): Promise<void> {
        await this.usersRepository.update(userId, {
            isVerified: true,
            verificationCode: null,
            verificationExpires: null,
        });
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ 
        where: { email }, 
        relations: ['role'] 
  });
}
/**
     * Remove um usuário do sistema pelo ID.
     * * @param {number} id - ID do usuário a ser removido.
     * @throws {NotFoundException} Se o usuário não existir.
     * @returns {Promise<{ message: string }>} Mensagem de sucesso.
     */
    async remove(id: number): Promise<{ message: string }> {
        const user = await this.usersRepository.findOneBy({ id });
        
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }

        // Deleta o usuário do banco de dados
        await this.usersRepository.delete(id);

        return { message: `Usuário com ID ${id} foi removido com sucesso.` };
    }

    async exportToExcel(filters: UserFilterDto): Promise<{ buffer: Buffer; fileName: string }> {
            const users = await this.findAll(undefined, undefined, filters.name, filters.email, filters.cpf).then(res => res.data);
    
            const mappedData = users.map(user => ({
                'Nome': user.name,
                'E-mail': user.email,
                'CPF': user.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : null,
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(mappedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
    
            const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            const fileName = `Relatorio_Usuarios_${new Date().toISOString().split('T')[0]}.xlsx`;
    
            return { buffer, fileName };
        }
    

}
