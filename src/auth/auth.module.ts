import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
  imports: [JwtModule.register({
    secret: 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })]
})
export class AuthModule {}
