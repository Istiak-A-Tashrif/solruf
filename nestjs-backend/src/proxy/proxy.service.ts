// src/proxy/proxy.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
private readonly laravelUrl = process.env.PROXY_URL;

    
    
    async getAllUsers() {
        const response = await axios.get(`${this.laravelUrl}/users`);
        return response.data;
    }

    async getUserById(id: string) {
        const response = await axios.get(`${this.laravelUrl}/users/${id}`);
        return response.data;
    }

    async createUser(userData: any) {
        const response = await axios.post(`${this.laravelUrl}/users`, userData);
        return response.data;
    }

    async updateUser(id: string, userData: any, token: string) {
        const response = await axios.put(
            `${this.laravelUrl}/users/${id}`,
            userData,
            {
                headers: {
                    Authorization: token, // Use the proper token format
                },
            }
        );
        return response.data;
    }
    

    async login(credentials: any) {
        const response = await axios.post(
            `${this.laravelUrl}/login`,
            credentials,
        );
        return response.data; // Return the data from Laravel (token, user info, etc.)
    }

    async deleteUser(id: string, authorization: any) {
        const response = await axios.delete(`${this.laravelUrl}/users/${id}`,
            {
                headers: {
                    Authorization: authorization, // Use the proper token format
                },
            });
        return response.data;
    }

    async getAuthenticatedUser(token: string) {
        const response = await axios.get(`${this.laravelUrl}/user`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
}
