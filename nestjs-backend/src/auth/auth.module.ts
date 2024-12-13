// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Secret for JWT signing
      signOptions: { expiresIn: '60m' }, // JWT expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
