import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.schema';
import axios from 'axios';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  // Private method to validate the token using Laravel API
  private async validateToken(token: string): Promise<void> {
    try {
      console.log(token);
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: token,
        },
      });

      

      if (response.status !== 200) {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalidaaaa or expired token');
    }
  }

  // Service methods with token validation
  async getAllPosts(token: string): Promise<Blog[]> {
    await this.validateToken(token); // Validate the token
    return await this.blogModel.find().exec();
  }

  async getPostById(token: string, id: string): Promise<Blog> {
    await this.validateToken(token); // Validate the token
    const post = await this.blogModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }
    return post;
  }

  async createPost(token: string, data: Partial<Blog>): Promise<Blog> {
    await this.validateToken(token); // Validate the token
    const newPost = new this.blogModel(data);
    return newPost.save();
  }

  async updatePost(token: string, id: string, data: Partial<Blog>): Promise<Blog> {
    await this.validateToken(token); // Validate the token
    const updatedPost = await this.blogModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedPost) {
      throw new NotFoundException('Blog post not found');
    }
    return updatedPost;
  }

  async deletePost(token: string, id: string): Promise<void> {
    await this.validateToken(token); // Validate the token
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Blog post not found');
    }
  }
}
