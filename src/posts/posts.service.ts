import { Injectable } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { PrismaClient, Post } from '@prisma/client';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PaginationPostDto} from './dto/pagination.dto';
import {PrismaService} from '../prisma.service';

@Injectable()
export class PostsService {


    constructor(private prisma: PrismaService) { }

    async getAll_p(page: number, limit: number){
        const skip = limit * (page - 1)
        return await this.prisma.post.findMany({skip: skip, take: limit})
    }

    async getAll(){
        return await this.prisma.post.findMany()
    }

    async getById(id: number){
        return await this.prisma.post.findMany({ where: {id: id}})
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
            await this.prisma.post.createMany({data: array})
            return 'Done';
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id: number){
        try {
            const post = await this.prisma.post.delete({where: {id: id}})
            return `Deleted post #${post.id}`
        } catch (e) {
            console.log(e)
        }
    }

    async updateById(id: number, data: UpdatePostDto){
        try {
            return await this.prisma.post.update({where: {id: id}, data: { title: data.title, description: data.description}})
        } catch (e) {
            console.log(e)
        }
    }
}
