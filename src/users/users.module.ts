import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [JwtModule],
  providers: [UsersService,PrismaService, JwtService],
  exports: [UsersService]
})
export class UsersModule {}
