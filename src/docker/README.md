# **Dockerized Next.js and MySQL Full-Stack Application**

This repository provides Docker configuration files for a Next.js full-stack application with a MySQL database backend. Using Docker, you can build and run the entire application stack in containers, ensuring a consistent development environment and easy deployment.

# **Repository Structure**

The Docker-related files are located within the `docker` directory at the root of the repository. The `docker` directory has the following structure:

```
docker/
├── docker-compose.yml
├── next/
│   └── Dockerfile
└── mysql/
    └── Dockerfile

```

- `docker-compose.yml`: Docker Compose file used to orchestrate multi-container Docker applications.
- `next/Dockerfile`: Dockerfile used to build the Next.js application.

# **Docker Compose File (docker-compose.yml)**

Docker Compose is a tool for defining and managing multi-container Docker applications. It uses YAML files to configure the application's services and handles the creation and startup of all the containers with a single command.

The `docker-compose.yml` file for this project is configured to run both the Next.js application and a MySQL database.

Here is a breakdown of what each section does:

```yaml
version: "3"

services:
  nextjs:
    container_name: nextjs
    build:
      context: .. # root of the project
      dockerfile: docker/next/Dockerfile
    env_file:
      - ../.env
    ports:
      - 3000:3000
    depends_on:
      - db

  db:
    container_name: database
    build:
      context: .. # root of the project
      dockerfile: docker/mysql/Dockerfile # specify the path to your custom Dockerfile
    image: custom-mysql:8.0 # optionally specify a custom image name
    command: --default-authentication-plugin=mysql_native_password
    env_file:
      - ../.env
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - 3306:3306
    volumes:
      - mysqldata:/var/lib/mysql

volumes:
  mysqldata:
```

To run the MySQL database in a Docker container, use the following command:

```bash
docker-compose --env-file .env -f docker/docker-compose.yml up db
```

This command uses the `docker-compose.yml` file and the `.env` file to start the MySQL database container.

# **Dockerfile for Next.js Application (next/Dockerfile)**

The `next/Dockerfile` contains instructions that Docker uses to build the Next.js application's Docker image. It's a multi-stage build process, optimized for the Next.js app.

The detailed explanation of this Dockerfile is provided in the `next` section.

# **Development Database**

The MySQL database is run using the `mysql` image and is configured with environment variables from the `.env` file. This allows you to easily spin up a development database with Docker. The `.env.example` file in the repository is already configured with the required variables to set up the database container. Simply copy this file to `.env` and adjust the values as needed.
