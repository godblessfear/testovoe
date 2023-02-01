import { Controller, Post,Get, Put, Delete } from '@nestjs/common';
import { Param, Body } from '@nestjs/common/decorators';
import { PostsService } from './posts.service';
import {UpdatePostDto} from './dto/update-posts.dto';
import {PaginationPostDto} from './dto/pagination.dto';


@Controller('posts')
export class PostsController {

    
    
    constructor(private PostsService: PostsService){        
    }
    

    @Get(':limit/:page')
    getAll_p(@Param() params){
        return this.PostsService.getAll_p(Number(params.page), Number(params.limit))
    }

    @Get()
    getAll(){
        return this.PostsService.getAll()
    }

    @Post('/postup')
    createTenThounds(){
        return this.PostsService.createTenThounds()
    }

    @Get(':id')
    getById(@Param() params){
        return this.PostsService.getById(Number(params.id))
    }

    @Delete(':id')
    deleteById(@Param() params){
        return this.PostsService.deleteById(params)
    }

    @Put(':id')
    updateById(@Param() params, @Body() UpdatePostDto: UpdatePostDto){
        return this.PostsService.updateById(params.id, UpdatePostDto)
    }
    

}
