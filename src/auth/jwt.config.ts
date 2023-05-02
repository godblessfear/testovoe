import {ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (ConfigService: ConfigService): Promise<JwtModuleOptions> => {
    return {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '24h'
        }
    }
}