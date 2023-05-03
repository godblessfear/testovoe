import { Controller, Post,Get, Put, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Param, Body, Res, Req,  } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import {Response} from 'express';
import { FastifyReply } from 'fastify';


@Controller('auth')
export class AuthController {

    
    
    constructor(private AuthService: AuthService,
        private UsersService: UsersService){        
    }

    @UsePipes(new ValidationPipe())
    @Post('/reg')
    async registration(@Body() data: UserCreateDto){
        const findUser = await this.UsersService.findUserEmail(data.email)

        if(findUser) throw new HttpException('Пользователь с таким Логином уже существует', HttpStatus.BAD_REQUEST);

        const user = await this.UsersService.saveUser(data);


        return user
        //return this.AuthService.registration(data)
    }

    @UsePipes(new ValidationPipe())
    @Post('/login')
    async login(@Body() data: UserCreateDto){
        return this.AuthService.login(data)

    }

    // @Post('/login')
    // async login(@Body() data:UserCreateDto, @Res({passthrough:true}) res:Response){
    //     const JWTToken = await this.AuthService.login(data)
    //     console.log(JWTToken)
    //     const secretData = JWTToken
    //       res.cookie('auth-cookie', secretData,{
    //         httpOnly: true,
    //         expires: new Date(new Date().getTime()+86409000),
    //       });
    //     return JWTToken
    // }

    // @Post('/login')
    // async login(@Body() data:UserCreateDto, @Res() response: FastifyReply){
    //     const jwtToken = await this.AuthService.login(data)
    //     response.cookie('jwt', jwtToken, {httpOnly: true, path: "/"});
    //     response.code(201).send(jwtToken)
    // }

    @Get("/test")
    findAll(@Req() request) {
        return request
    }

}
