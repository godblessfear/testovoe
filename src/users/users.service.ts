import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async saveUser(data:UserCreateDto): Promise<Object>{
        try {
            const IsUser = await this.prisma.user.findFirst({where: {login: data.login}})

            if(IsUser) return;

            const hash_pass = await bcrypt.hash(data.password, 5)
            const user = await this.prisma.user.create({data: {login: data.login, password: hash_pass}})

            return {id: user.id, login: user.login};
        } catch (error) {
        }
        
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
