import { Controller, Post,Get, Put, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Param, Body, UseGuards, Request } from '@nestjs/common/decorators';
import { PostsService } from './posts.service';
import {UpdatePostDto} from './dto/update-posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('posts')
export class PostsController {

    
    
    constructor(private PostsService: PostsService
                ){ }
    

    @Get(':limit/:page')
    getAll_p(@Param() params){
        return this.PostsService.getAll_p(Number(params.page), Number(params.limit))
    }

    @Get()
    getAll(){
        return this.PostsService.getAll()
    }

    @UseGuards(AuthGuard)
    @Get("/my")
    async getUserPosts(@Request() req){
        return await this.PostsService.getUserPosts(req.user.userId)
    }
    
    @UseGuards(AuthGuard)
    @Post('/postup')
    async createTenThounds(@Request() req){
        if(req.user.role != 'ADMIN') throw new HttpException("Only admin allowed", HttpStatus.FORBIDDEN)
        return await this.PostsService.createTenThounds(req.user.userId)
    }

    @Get(':id')
    async getById(@Param() params){
        return await this.PostsService.getById(Number(params.id))
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number){
        return await this.PostsService.deleteById(id)
    }

    @Put(':id')
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePostDto){
        return await this.PostsService.updateById(id, data)
    }
}
