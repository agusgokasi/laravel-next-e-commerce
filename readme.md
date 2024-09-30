# Project Credentials

## Database Configuration

- **Database Name**: `your_database_name`
- **Username**: `your_database_user`
- **Password**: `your_database_password`

## Scripts

- **Laravel**:
  - To set up the Laravel project:
    ```bash
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve
    ```

- **Next.js**:
  - To set up the Next.js project:
    ```bash
    npm install
    npm run dev
    ```

## Admin Login Credentials

You can log in using the following admin credentials (pre-seeded):

- **Email**: `admin@example.com`
- **Password**: `password`
