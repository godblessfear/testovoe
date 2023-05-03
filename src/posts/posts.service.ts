import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { Post, PrismaClient } from '@prisma/client';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PaginationPostDto} from './dto/pagination.dto';
import {PrismaService} from '../prisma.service';
import { take } from 'rxjs';

@Injectable()
export class PostsService {


    constructor(private prisma: PrismaService) { }

    async getAll_p(skip: number, take: number): Promise<Post[]>{
        try {
            return await this.prisma.post.findMany({skip, take})
        } catch (error) {
            
        }
    }

    async getUserPosts(userId: number): Promise<object>{
        const data = await this.prisma.user.findMany({
            select: {
              _count: {
                select: { posts: true },
              },
              posts: {
                take: 20
              }
            },
            where: {id: userId},
          })

        return {
            data: data[0].posts,
            total: data[0]._count.posts
        }
    }

    async getAll(): Promise<Post[]>{
        try {
            return await this.prisma.post.findMany()
        } catch (error) {
            
        }
        
    }

    async getById(id: number): Promise<Post>{
        try {
            return await this.prisma.post.findFirst({ where: {id: id}})
        } catch (error) {
            
        }
    }

    async createTenThounds(userId: number): Promise<boolean>{
        const array = []
            for(let i = 1; i <= 10000; i++){
                array.push({
                    title: `Title num: ${i}`,
                    description: `description num: ${i}`,
                    authorId: userId
                });
            }
        try {
            await this.prisma.post.createMany({data: array})
            return true;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id: number): Promise<string>{
        try {
            const post = await this.prisma.post.delete({where: {id: id}})
            return `Deleted post #${post.id}`
        } catch (e) {
            console.log(e)
        }
    }

    async updateById(id: number, data: UpdatePostDto): Promise<Post>{
        try {
            return await this.prisma.post.update({where: {id: id}, data})
        } catch (e) {
            console.log(e)
        }
    }
}
