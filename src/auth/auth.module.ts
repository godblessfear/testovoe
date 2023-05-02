import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '24h'
    }
  })]
})
export class AuthModule {}
