import { Controller, Post,Get, Put, Delete } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import {AuthDto} from './dto/auth.dto';


@Controller('auth')
export class AuthController {

    
    
    constructor(private AuthService: AuthService){        
    }

    @Post('/register')
    registration(@Body() AuthDto: AuthDto){
        return this.AuthService.registration(AuthDto)
    }

    @Post('/login')
    login(@Body() AuthDto: AuthDto){
        return this.AuthService.login(AuthDto)
    }
    

}
