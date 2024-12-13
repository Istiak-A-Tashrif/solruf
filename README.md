## Solruf

-   Platform: Laravel 11

## Setup

1. clone & run `cp .env.example .env` & `composer install`

1. Create Database

1. create virtualhost on xampp

````
```xml
<VirtualHost *:80>
    DocumentRoot "C:/<project location>/public"
    ServerName myshop.test
    <Directory "C:/<project location>/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order Allow,Deny
        Allow from all
        Require local
    </Directory>
</VirtualHost>
````

1. `php artisan migrate`

1. `php artisan key:generate`

1. `php artisan jwt:secret`

1. open `C:\Windows\System32\drivers\etc\hosts` and add these lines

```
127.0.0.1       solruf.test
```

### Code Structure

User Authentication is done by laravel (MySQL) (PHP ver 8.2.*)
Blog Crud Managed by NestJs (MongoDB)

# Setup with laragon

1. clone project inside www

2. create app on laragon

3. copy cloned project into laragon app folder

4. check database, edit .env, run migrate & cache command

5. create another app on laragon for business "easybiz-one.test"


# NestJS and NextJS Setup

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
