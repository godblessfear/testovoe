import { Controller, Post,Get, Put, Delete } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';


@Controller('auth')
export class AuthController {

    
    
    constructor(private AuthService: AuthService,
        private UsersService: UsersService){        
    }

    @Post('/reg')
    registration(@Body() data:UserCreateDto){
        return this.AuthService.registration(data)
    }

    @Post('/login')
    login(@Body() data:UserCreateDto){
        console.log(data)
        return this.AuthService.login(data)
    }    

}
