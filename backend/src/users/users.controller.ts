// users/users.controller.ts
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, UseGuards, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags('Users')
@ApiBearerAuth() // Indica que as rotas deste controller exigem autenticação via JWT
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protege o controller inteiro!
@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}

// =======================================================
// 🔴 ROTAS DE ADMINISTRAÇÃO (Exigem cargo 'administrador')
// =======================================================

    @Get()
    @Roles('administrador') 
    @ApiOperation({ summary: 'Listar todos os usuários (Apenas Admin)' })
    findAll() {
        return this.usersService.findAll();
    }
    @Delete(':id')
    @Roles('administrador')
    @ApiOperation({ summary: 'Deletar um usuário (Apenas Admin)' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um usuário por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async findById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
            return user;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza parcialmente um usuário' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos ou duplicados' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async update( @Param('id', ParseIntPipe) id: number,  @Body() updateUserDto: UpdateUserDto, ){
    return this.usersService.update(id, updateUserDto);
    }

    @Get()
    @Roles('administrador') // Apenas o admin que veio no seu seed inicial pode ver isso
    @ApiOperation({ summary: 'Listar todos os usuários cadastrados' })
    async listAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    ) {
        return this.usersService.findAll(page, limit);
    }
}
