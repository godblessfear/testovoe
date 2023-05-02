import { Controller, Post,Get, Put, Delete } from '@nestjs/common';
import { Param, Body, UseGuards, Request } from '@nestjs/common/decorators';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('posts')
export class PostsController {
    constructor(private PostsService: PostsService){        
    }
    

    @Get(':limit/:page')
    getAll_p(@Param() params: any){
        return this.PostsService.getAll_p(Number(params.page), Number(params.limit))
    }

    @Get()
    async getAll(): Promise<Object>{
        return await this.PostsService.getAll()
    }

    @UseGuards(AuthGuard)
    @Post('/postup')
    async createTenThounds(@User() user){
        return this.PostsService.createTenThounds(user.id)
    }

    @Get(':id')
    async getById(@Param() params): Promise<Object>{
        return await this.PostsService.getById(Number(params.id))
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteById(@Param() params): Promise<string>{
        return await this.PostsService.deleteById(params)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateById(@Param() params, @Body() UpdatePostDto: UpdatePostDto): Promise<object>{
        return await this.PostsService.updateById(params.id, UpdatePostDto)
    }
}
