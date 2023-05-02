import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';


@Injectable()
export class AuthService {


    constructor(private jwtService: JwtService,
                private UsersService: UsersService) { }

    async login(data: UserCreateDto){
        const user = await this.UsersService.validateUser(data.login, data.password)

        return this.generateToken(user)
    }

    async registration(data:UserCreateDto){
        const user = await this.UsersService.saveUser(data)
        
        if(!user) throw new HttpException('Login уже занят', HttpStatus.BAD_REQUEST);
        return this.generateToken(user)
    }

    private async generateToken(payload: Object){
        //const payload = {login: user.login, id: user.id}

        return {
            token: this.jwtService.sign(payload)
        }
    }    
}
