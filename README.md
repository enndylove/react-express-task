# React-Express Task

## Overview

This project is a full-stack application built with React for the frontend and Express for the backend. It aims to demonstrate a typical PERN (PostgreSQL, Express, React, Node.js) stack architecture, allowing for a seamless interaction between client and server.

## Architecture

- **Frontend**: The frontend is built using React, leveraging modern React features. It communicates with the backend via RESTful APIs, enabling a responsive and interactive user interface.

- **Backend**: The backend is developed using Express.js, serving as a REST API to handle requests from the frontend. It connects to a PostgreSQL database to perform CRUD operations and manage application data.

- **Database**: PostgreSQL is used as the relational database management system (RDBMS) for storing application data. The choice of PostgreSQL provides robustness and the capability to handle complex queries and relationships.

### Design Decisions

1. **REST API Architecture**: The backend is designed using REST principles to provide a clear separation between client and server. This facilitates easy integration with various frontend technologies and allows for scalability.

2. **State Management**: The frontend utilizes React's Context API for state management, allowing for a global state that can be accessed by any component in the application. This decision helps reduce prop drilling and simplifies data flow.

3. **Modular Structure**: Both the frontend and backend are organized in a modular fashion, with separate directories for components, services, and routes. This structure enhances maintainability and makes it easier to navigate the codebase.

4. **Environment Configuration**: Sensitive data such as database connection strings are stored in environment variables, allowing for secure and flexible configuration based on the deployment environment.

## Installation & Run Instructions

### Prerequisites

- Node.js (v12 or later)
- PostgreSQL (ensure it is installed and running)
- Git
- Docker

### FullStack Setup

Clone the repository:
```shell
git clone https://github.com/enndylove/react-express-task.git
```
   
Go to the project folder
```shell
cd react-express-task
```

Install node packages
```shell
npm install
```

Create .env.local file:
```dotenv
POSTGRES_USER=YOUR_PROSTGRES_LOGIN

POSTGRES_PASSWORD=YOUR_PROSTGRES_PASSWORD

POSTGRES_DB=YOUR_DATABASE_NAME
```

### Frontend(client) setup
Go to the client folder
```shell
cd client
```
Install client packages
```shell
npm install
```
Exit folder
```shell
cd ../
```

### Backend(server) Setup
Go to the server folder
```shell
cd server
```
Install server packages
```shell
npm install
```

Create .env file:
```dotenv
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://EXAMPLE_NAME:EXAMPLE_PASSWORD@localhost:5432/EXAMPLE_DB_NAME?schema=public"
```
#### Prisma
Generate prisma
```shell
npx prisma generate
```

Do new migrate prisma
```shell
npx prisma migrate dev --name init
```

Run backend server
```shell
npm start
```

Exit folder
```shell
cd ../
```

### Docker

1. Open docker desktop app

2. Run docker-compose file
```shell
docker-compose up --build
```

![Interface![img.png](readmePicture/img.png)](readmePicture/interface.png)

### You can check interface version in http://localhost:3000

## You can test the backend server using curl, postman, insomnia 

### Curl examples:
#### GET all orders
```shell
curl -X GET http://localhost:4000/orders
```

#### POST of an existing client
```shell
curl -X POST http://localhost:4000/orders \
-H "Content-Type: application/json" \
-d '{
    "clientId": "1",
    "orderName": "New Order"
}'
```

#### POST of a new client
```shell
curl -X POST http://localhost:4000/orders \
-H "Content-Type: application/json" \
-d '{
    "clientName": "New Client",
    "orderName": "New Order"
}'
```

#### More details about the request

```shell
curl -v -X GET http://localhost:4000/orders
```

### Postman | Insomnia

#### Testing the `GET` request
```text
Method: GET
URL: http://localhost:4000/orders
Click: Send
See: Response in the Response tab.
```

![get request](readmePicture/GET.png)

#### Testing the `POST` request
```text
Method: POST
URL: http://localhost:4000/orders
Body:
Select raw and JSON.
Enter data (for example):

{
    "clientId": "1",
    "orderName": "New Order"
}

Click: Send
See: Response in the Response tab.
```

![post request](readmePicture/POST.png)

## License
### This project is licensed under the [MIT License](https://github.com/enndylove/react-express-task/blob/main/LICENSE).
## Delicious coffee to you friends ☕