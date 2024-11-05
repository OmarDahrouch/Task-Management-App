# Task Management Application

Welcome dear Company T.W, this is a Task Management application built with a Vue 3 frontend and a NestJS backend, styled with Tailwind CSS, and using PostgreSQL as the database. Docker is used for containerization, and Jest for testing. Swagger is implemented to document the API endpoints.

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## Project Overview

- **Frontend**: Vue 3 with the Composition API and Tailwind CSS.
- **Backend**: NestJS for the REST API, with CRUD functionality for tasks.
- **Database**: PostgreSQL.
- **Documentation**: Swagger for API documentation.
- **Testing**: Jest for unit and integration tests.

## Prerequisites

Make sure you have these elements installed on your machine:
- Docker
- Docker Compose
- Node.js and npm

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Environment Configuration**
   Set up a `.env` file in the project root directory. (See [Environment Variables](#environment-variables) for details.)

3. **Run Application with Docker**
   Build and start the containers with the following command from the root directory:
   ```bash
   docker-compose up --build
   ```

The application will be accessible at:
- **Frontend**: `http://localhost:8080`
- **Backend**: `http://localhost:3000`
- **PostgreSQL**: `localhost:5432`

### Docker Services Overview
The application consists of three main services:
- **PostgreSQL**: Database for storing tasks.
- **Backend**: The NestJS application that handles API requests.
- **Frontend**: The Vue 3 application for user interaction.

## API Documentation

The API follows RESTful principles with the following endpoints for managing tasks:

### Task Endpoints

- **Create a Task**: **POST** `/tasks` with body `{ "title": "Task Title", "description": "Task Description", "status": "Task Status" }`
- **Get All Tasks**: **GET** `/tasks`
- **Get Task by ID**: **GET** `/tasks/:id` (where `id` is the Task ID)
- **Update Task**: **PATCH** `/tasks/:id` with body `{ "title": "Updated Title", "status": "Updated Status" }`
- **Delete Task**: **DELETE** `/tasks/:id` (where `id` is the Task ID)

### Swagger Documentation
Swagger is enabled for documenting and testing API endpoints. Once the backend is running, access the Swagger documentation at:
- `http://localhost:3000/api`

## Testing

To run tests with Jest in the backend, execute the following command:
```bash
npm run test
```
To run tests with Jest in the frontend, execute the following command:
```bash
npm run test:unit
```

## Environment Variables

The `.env` file should contain the following environment variables to configure the PostgreSQL database connection:

```plaintext
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=post123
DB_NAME=task_management
```

## UI Preview

![image](https://github.com/user-attachments/assets/24e1cd0d-c329-422c-8350-34653eb7618c)



