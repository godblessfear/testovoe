import { Injectable } from '@nestjs/common';
import { Param, Body, UseGuards } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PrismaService} from '../prisma.service';

@Injectable()
export class PostsService {


    constructor(private prisma: PrismaService) { }

    async getAll_p(page: number, limit: number){
        try {
            const skip = limit * (page - 1)
            return await this.prisma.post.findMany({skip: skip, take: limit})
        } catch (error) {
            
        }
    }

    async getAll(){
        try {
            return await this.prisma.post.findMany()
        } catch (error) {
            
        }
        
    }

    async getById(id: number){
        try {
            return await this.prisma.post.findMany({ where: {id: id}})
        } catch (error) {
            
        }
    }

    async createTenThounds(userId: number){
        try {
            const array = []
            for(let i = 1; i <= 10000; i++){
                array.push({
                    title: `Title num: ${i}`,
                    description: `description num: ${i}`,
                    authorId: userId
                });
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
