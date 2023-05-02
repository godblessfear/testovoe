import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate( payload){
        return payload
    }
}