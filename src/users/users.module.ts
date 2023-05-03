import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [UsersService,PrismaService, JwtService],
  exports: [UsersService]
})
export class UsersModule {}
