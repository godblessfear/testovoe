import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import fastifyCookie from '@fastify/cookie';


@Injectable()
export class AuthService {


    constructor(private jwtService: JwtService,
                private UsersService: UsersService) { }

    async login(data: UserCreateDto){
        const user = await this.UsersService.findUserEmail(data.email)

        if(!user) throw new HttpException('Пользователь с такой почтой уже существует', HttpStatus.BAD_REQUEST);

        const validPassword = await this.UsersService.validatePassword(data.password, user.password)

        if(!validPassword) throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);

        const token = await this.generateTokens({userId: user.id, email: user.email, role: user.role})

        this.UsersService.updateRefreshToken(user.id , token.refreshToken)
        return token.accessToken
    }

    // async login(data: UserCreateDto){
    //     const user = await this.UsersService.validateUser(data.login, data.password)
    //     return await this.generateToken(user)
    // }

    async registration(data:UserCreateDto){
        const user = await this.UsersService.saveUser(data)
        
        if(!user) throw new HttpException('Email уже занят', HttpStatus.BAD_REQUEST);
        //const token = await this.generateTokens(user)

        //this.UsersService.updateRefreshToken(user.id , token.refreshToken)
        return user
    }

    private async generateTokens(payload){
        //const payload = {email: user.email, id: user.id}
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.getRefreshToken(payload.userId)
        }
    }

    private getRefreshToken(sub: string): string {
        return this.jwtService.sign({ sub }, {
          secret: process.env.JWTREFRESH_SECRET, //
          expiresIn: '30d', 
        });
      }
}
