import { Injectable } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { PrismaClient, Post } from '@prisma/client';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PaginationPostDto} from './dto/pagination.dto';

@Injectable()
export class PostsService {

    constructor() {
        // Мы очень часто дублируем код и каждый раз создаём запрос на подключение к БД, не оптимально.
        // Почитай доку по prisma в nestjs там объясняется как использовать prisma с nestjs.
        this.client = new PrismaClient();
        await this.client.$connect();
    }
    
    // Декоратор лишний при получении данных.
    // Не получай не типизированные данные в функции.
    async getAll_p(page: number, limit: number){
        const skip = limit * (page - 1)
        // Сокрашай код ввезде где можно, если при этом не нарушится читаемость.
        // Из за того что ты не типизировал данные на входе тебе приходится типизировать в процессе, это не правильно функция приняла не чистые данные.
        return await this.client.post.findMany({skip: skip, take: limit})
    }

    async getAll(){
        return await this.client.post.findMany()
    }

    // Декоратор лишний при получении данных.
    async getById(id: number){
        return await this.client.post.findMany({ where: {id: id}})
    }

    async createTenThounds(){
        try {
            const array = []
            for(let i = 1; i <= 10000; i++){
                const container = {
                    title: `Title num: ${i}`,
                    description: `description num: ${i}`,
                };
                array.push(container);
            }
            await this.client.post.createMany({data: array})
            return 'Done';
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id: number){
        // Все методы которые могут вызвать ошибку, при котором приложение умрёт оборачивай в try catch и даже если бд умрёт приложение будет жить
        try {
            const post = await this.client.post.delete({where: {id: id}})
            return `Deleted post #${post.id}`
        } catch (e) {
            console.log(e)
        }
    }

    
    async updateById(id: number, data: UpdatePostDto){
        // Все методы которые могут вызвать ошибку, при котором приложение умрёт оборачивай в try catch и даже если бд умрёт приложение будет жить
        try {
            return await this.client.post.update({where: {id: id}, data: { title: data.title, description: data.description}})
        } catch (e) {
            console.log(e)
        }
    }
}
