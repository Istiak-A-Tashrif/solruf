import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.schema';

@Controller('posts')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async getAllPosts(@Headers('Authorization') authorization: string): Promise<Blog[]> {
    return this.blogsService.getAllPosts(authorization);
  }

  @Get(':id')
  async getPostById(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ): Promise<Blog> {
    return this.blogsService.getPostById(authorization, id);
  }

  @Post()
  async createPost(
    @Headers('Authorization') authorization: string,
    @Body() data: Partial<Blog>,
  ): Promise<Blog> {
    return this.blogsService.createPost(authorization, data);
  }

  @Put(':id')
  async updatePost(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
    @Body() data: Partial<Blog>,
  ): Promise<Blog> {
    return this.blogsService.updatePost(authorization, id, data);
  }

  @Delete(':id')
  async deletePost(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.blogsService.deletePost(authorization, id);
  }
}
