import { Injectable } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { PrismaClient, Post } from '@prisma/client';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PaginationPostDto} from './dto/pagination.dto';

@Injectable()
export class PostsService {

    async getAll_p(@Param() params){
        const client = new PrismaClient();
        await client.$connect();
        const skip = params.limit * (params.page - 1)
        const res = await client.post.findMany({skip: skip, take: Number(params.limit)})
        return res;
    }

    async getAll(){
        const client = new PrismaClient();
        await client.$connect();
        const res = await client.post.findMany()
        return res;
    }

    async getById(@Param() params){
        const client = new PrismaClient();
        await client.$connect();
        const res = await client.post.findMany({ where: {id: Number(params.id)}})
        return res;
    }

    async createTenThounds(){
        const client = new PrismaClient();
        const array = []
        for(let i = 1; i <= 10000; i++){
            const container = {
                title: `Title num: ${i}`,
                description: `description num: ${i}`,
            };
            array.push(container);
        }
        await client.$connect();
        await client.post.createMany({data: array})
        return 'Done';
    }

    async deleteById(@Param() params){
        const client = new PrismaClient();
        await client.$connect();
        const post = await client.post.delete({where: {id: Number(params.id)}})
        return `Deleted post #${post.id}`
    }

    async updateById(@Param() params, @Body() UpdatePostDto: UpdatePostDto){
        const client = new PrismaClient();
        await client.$connect();
        const post = await client.post.update({where: {id: Number(params.id)}, data: { title: UpdatePostDto.title, description: UpdatePostDto.description}})
        return post
    }
}
