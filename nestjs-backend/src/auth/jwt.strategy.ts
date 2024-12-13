// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';  // To send requests to Laravel API

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'SA7oiEYiLx4xMn5i9rdNDoLQAhyz3koyjF9906UXELS0hzgoPkpWV6VubcDVLTLq', // Your JWT secret
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    try {
      // Send the token to Laravel API to validate it
      const response = await axios.get(`${process.env.PROXY_URL}/user`, {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });

      // If valid, return user data or true
      return response.data; // The data Laravel returns
    } catch (error) {
      // Return null if token is invalid or something goes wrong
      return null;
    }
  }
}
