import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findUserId(id: number){
        const user = await this.prisma.user.findFirst({ where: {id} })
        if(!user) throw new HttpException('wrong id', HttpStatus.BAD_REQUEST)
        const { password, ...rest} = user
        return rest
    }

    async saveUser(data:UserCreateDto): Promise<Object>{
        try {
            const IsUser = await this.prisma.user.findFirst({where: {email: data.email}})

            if(IsUser) return;

            const hash_pass = await bcrypt.hash(data.password, 5)
            const user = await this.prisma.user.create({data: {email: data.email, password: hash_pass}})

            return {id: user.id, email: user.email, role: user.role};
        } catch (error) {
        }
    }

    async findUserEmail(email: string){
        try {
            return await this.prisma.user.findFirst({where: {email: email}})
        } catch (error) {
            
        }
    }

    async updateRefreshToken( id: number,refreshToken?: string){
        try {
            //return await this.prisma.user.update({where: {id: id}})
            return await this.prisma.user.update({where: {id: id}, data: {refreshToken: refreshToken}})
            //return await this.prisma.post.update({where: {id: id}, data})
        } catch (error) {
            
        }
    }

    async validatePassword(passwordDTO: string,passwordDB: string): Promise<boolean>{
        try{
            return await bcrypt.compare(passwordDTO, passwordDB)
        }
        catch{}
    }

    async validateUser(email:string, password:string){
        try {
            const user = await this.prisma.user.findFirst({where: {email: email}})

            if(!user) throw new HttpException('Пользователя с таким login не существует', HttpStatus.BAD_REQUEST);

            const passwordEquals = await bcrypt.compare(password, user.password)

            if(!passwordEquals) throw new HttpException('Не вверный пароль', HttpStatus.BAD_REQUEST);

            return {id: user.id, email: user.email};
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
