import { Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Param, Body, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){ }

    @Get()
    users(){
        return this.UsersService.allUsers()
    }

    // @Post('/reg')
    // registration(@Body() data:UserCreateDto){
    //     return this.UsersService.saveUser(data)
    // }

    // @Post('/login')
    // login(@Body() data:UserCreateDto){
    //     console.log(data)
    //     return this.UsersService.LoginUser(data.login, data.password)
    // }
}
