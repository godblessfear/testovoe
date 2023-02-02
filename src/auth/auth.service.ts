import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { PrismaClient, Post, User } from '@prisma/client';
import {AuthDto} from './dto/auth.dto';
import {PrismaService} from '../prisma.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {


    constructor(private prisma: PrismaService,
                private jwtService: JwtService) { }

    async login(data:AuthDto){
        const user = await this.validateUser(data)

        return this.generateToken(user)
    }

    async registration(data:AuthDto){
        const user = await this.prisma.user.findFirst({where: {login: data.login}})

        if(user){
            throw new HttpException('Email уже занят', HttpStatus.BAD_REQUEST);
        }

        const hash_pass = await bcrypt.hash(data.password, 5)
        const create_user = await this.prisma.user.create({data: {login: data.login, password: hash_pass}})

        return this.generateToken(create_user)
    }

    private async generateToken(user: User){
        const payload = {login: user.login, id: user.id}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(data: AuthDto){
        const user = await this.prisma.user.findFirst({where: {login: data.login}})

        const passwordEquals = await bcrypt.compare(data.password, user.password)

        if(user && passwordEquals){
            return user;
        }
        throw new HttpException('Логин или пароль не совпадают', HttpStatus.BAD_REQUEST);
    }
    
}
