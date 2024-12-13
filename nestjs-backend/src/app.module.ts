import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { ProxyModule } from './proxy/proxy.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables available globally
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // Reads from .env
    BlogsModule, ProxyModule, AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
