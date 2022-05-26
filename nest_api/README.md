# toro-project - backend

## Description

A [Nest](https://docs.nestjs.com/) framework system based. Consists of business rules about income transactions depending on financial deposits and transfers.

_This project works with the frontend project, but also could be used as an isolate API._

<br>

# Installation

Install all dependencies.

```bash
$ yarn
```

<br>

# App

## Running for the first time

The project can be runned with Docker.

First, build the project from the docker-compose file.

```bash
# build project
$ yarn docker
```

Enter the app container console to be able to run others commands.

```bash
# enter container console
$ docker exec -it app bash
```

Then run database migrations.

```bash
# run migrations
$ yarn run-migrations
```

## Running the app

```bash
# development
$ yarn docker

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```

# Database

## TypeORM

Actual version using >= **0.3.6** <br>
Pay attention to the ORM documentation as it suggests CLI commands that only works on 0.2.x versions.
<br><br>
No need to install TypeORM global CLI.

```bash
# Using CLI from within the docker container
$ yarn typeorm
```

## Migrations

```bash
# Create
$ yarn typeorm migration:create <PATH/MIGRATION_NAME>

# Example
$ yarn typeorm migration:create src/database/migrations/createAccountForeignKey
```
