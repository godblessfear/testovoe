import { Controller, Post, Get, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Param, Body, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller('/users')
export class UsersController {
    constructor(private UsersService: UsersService){ }


    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id: number){
        return await this.UsersService.findUserId(id)
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
