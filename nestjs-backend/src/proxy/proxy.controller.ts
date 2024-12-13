// src/proxy/proxy.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, Query, Headers } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('/users')
  async getAllUsers() {
    return await this.proxyService.getAllUsers();
  }

  @Get('/users/:id')
  async getUserById(@Param('id') id: string) {
    return await this.proxyService.getUserById(id);
  }

  @Post('/users')
  async createUser(@Body() userData: any) {
    return await this.proxyService.createUser(userData);
  }

  @Put('/users/:id')
  async updateUser(  @Headers('Authorization') authorization: string, @Param('id') id: string, @Body() userData: any) {
    return await this.proxyService.updateUser(id, userData, authorization);
  }

  @Delete('/users/:id')
  async deleteUser(  @Headers('Authorization') authorization: string, @Param('id') id: string) {
    return await this.proxyService.deleteUser(id, authorization);
  }

  @Get('/user')
  async getAuthenticatedUser(@Headers('Authorization') authorization: string) {
    return await this.proxyService.getAuthenticatedUser(authorization);
  }

   // Proxy route to handle login
   @Post('/login')
   async login(@Body() credentials: any) {
     return await this.proxyService.login(credentials);
   }
}
