# NestJS Auth

This project demonstrates an authentication flow using NestJS, TypeORM, and JWT. It includes user registration, login, and protected routes.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/nestjs-auth-flow-blog-post.git
    cd nestjs-auth
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables:
    ```sh
    cp .env.example .env
    ```

4. Update the `.env` file with your database configuration.

## Running the App

1. Start the PostgreSQL database.

2. Run the application:
    ```sh
    npm run start:dev
    ```

3. The application will be available at `http://localhost:3000`.

## Environment Variables

The following environment variables are used in this project:

- `POSTGRES_HOST`: Database host
- `POSTGRES_PORT`: Database port
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

## Scripts

- `start`: Start the application
- `start:dev`: Start the application in development mode
- `start:debug`: Start the application in debug mode
- `start:prod`: Start the application in production mode
- `build`: Build the application
- `format`: Format the code using Prettier
- `lint`: Lint the code using ESLint
- `test`: Run unit tests
- `test:watch`: Run unit tests in watch mode
- `test:cov`: Run unit tests with coverage
- `test:debug`: Run unit tests in debug mode
- `test:integration`: Set up integration tests
- `test:e2e`: Run end-to-end tests
- `migration:generate`: Generate a new migration
- `typeorm:migration:run`: Run migrations

## Testing

To run the tests, use the following command:
```sh
npm run test
```

To run the Integration tests using TestContainers, use the following command:
```sh
npm run test:integration
```

