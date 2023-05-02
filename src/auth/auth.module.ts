import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from './jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJWTConfig
  }),
  PassportModule]
})
export class AuthModule {}
