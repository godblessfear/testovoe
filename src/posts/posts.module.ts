import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {PrismaService} from '../prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, JwtService],
  imports: [JwtModule]
})
export class PostsModule {}
