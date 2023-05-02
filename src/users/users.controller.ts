import { Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Param, Body, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){ }

    @UseGuards(AuthGuard)
    @Get()
    async getUsers(){
        return await this.UsersService.allUsers()
    }
}
