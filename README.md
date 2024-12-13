## Solruf

-   Platform: Laravel 11

# Setup with laragon

1. clone project anywhere

2. create a blank app on laragon

3. copy cloned project into laragon app folder

4. check database, edit .env, run migrate & cache command

## Setup

1. clone & run `cp .env.example .env` & `composer install`

1. `php artisan key:generate`

1. `php artisan migrate`

1. `php artisan jwt:secret`

### Code Structure

User Authentication is done by laravel (MySQL) (PHP ver 8.2.*)
Blog Crud Managed by NestJs (MongoDB)
frontend in NextJs

# NestJS and NextJS Setup


1. copy the jwt token from laravel .env

```bash
npm run setup
```

# Run Project

```bash
npm run start
```

```Cmder
php artisan serve
```

# Postman  Collection for Endpoints

1. Backend Endpoints.postman_collection (check  this file in the root)