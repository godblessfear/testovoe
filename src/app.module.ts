import { CacheModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { PostsModule } from './posts/posts.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

// import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    // SERVER IMPORTS
    // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    CacheModule.register({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PostsModule,
    AuthModule,
    // CUSTOM MODULE IMPORT
    // ...
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule {
}
