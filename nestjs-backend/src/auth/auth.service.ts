import { HttpService } from '@nestjs/axios';
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  // Function to call Laravel API to validate JWT
  async validateJwt(token: string): Promise<boolean> {
    const url = `${process.env.PROXY_URL}/user`; // Laravel API endpoint for token validation

    try {
      // Send a GET request to Laravel's API to validate the token
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token to Laravel for validation
          },
        }),
      );

      // If Laravel API returns user data, the token is valid
      if (response.status === 200) {
        return true;
      }

      // If Laravel API does not return user data, the token is invalid
      return false;
    } catch (error) {
      // If an error occurs (invalid token, etc.), throw an UnauthorizedException
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}
