import { Controller, Post,Get, Put, Delete } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { User } from 'src/decorators/user.decorator';


@Controller('auth')
export class AuthController {

    
    
    constructor(private AuthService: AuthService,
        private UsersService: UsersService){        
    }

    @Post('/signup')
    async signUp(@Body() data:UserCreateDto){
        return await this.AuthService.signUp(data)
    }

    @Post('/signin')
    async login(@Body() data:UserCreateDto){
        return await this.AuthService.signIn(data)
    }

}
