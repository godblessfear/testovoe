import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';


@Injectable()
export class AuthService {


    constructor(private jwtService: JwtService,
                private UsersService: UsersService) { }


    async signUp(data: UserCreateDto): Promise<boolean>{
        const IsUser = await this.UsersService.findUser(data.login)

        if(IsUser) throw new HttpException('Пользователя с таким login уже существует', HttpStatus.BAD_REQUEST);

        const hashPassword = await this.UsersService.hashPassword(data.password)
        data = {...data, password: hashPassword}

        const user = await this.UsersService.saveUser(data)

        
        return true
    }

    async signIn(data: UserCreateDto){
        const user = await this.UsersService.findUser(data.login)

        if(!user) throw new HttpException('Пользователя с таким login не существует', HttpStatus.BAD_REQUEST);

        const verifyPassword = this.UsersService.validatePassword(user.password, data.password)

        if(!verifyPassword) throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);

        const payload = { id: user.id, login: user.login }

        return this.generateToken(payload)
    }

    private async generateToken(payload: Object){
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }    
}
