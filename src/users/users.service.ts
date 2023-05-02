import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async saveUser(data:UserCreateDto): Promise<User>{
        try {
            return await this.prisma.user.create({data: data})
        } catch (error) {
        }
    }

    async hashPassword(password: string): Promise<string>{
        try {
            return await bcrypt.hash(password, 10)
        } catch (error) {
            
        }
        
    }

    async findUser(login: string): Promise<User>{
        try {
            return await this.prisma.user.findFirst({where: {login: login}})
        } catch (error) {
            
        }
    }

    async validatePassword(passwordDB: string, passwordDTO: string): Promise<boolean>{
        return await bcrypt.compare(passwordDB, passwordDTO);
    }


    async validateUser(login:string, password:string){
        try {
            const user = await this.prisma.user.findFirst({where: {login: login}})

            if(!user) throw new HttpException('Пользователя с таким login не существует', HttpStatus.BAD_REQUEST);

            const passwordEquals = await bcrypt.compare(password, user.password)

            if(!passwordEquals) throw new HttpException('Не вверный пароль', HttpStatus.BAD_REQUEST);

            return {id: user.id, login: user.login};
        } catch (error) {
            
        }
    }

    async allUsers(){
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            
        }
    }
}
