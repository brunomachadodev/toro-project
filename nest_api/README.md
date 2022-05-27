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

Then run database migrations to create tables and relations.

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

# API routes and payload examples

## Create account

```json
// POST http://localhost:3333/account/create

{
  "name": "Bruno Machado",
  "cpf": "949.192.620-94",
  "email": "bruno@test.com"
}
```

## Find account

```json
// POST http://localhost:3333/account/find-by-cpf

{
  "cpf": "949.192.620-94",
}
```

## Create balance

```json
// POST http://localhost:3333/account/balance/create

{
  "accountId": 3,
  "balance": 1000,
}
```

## Create deposit

```json
// POST http://localhost:3333/account/events/deposit

{
  "event": "TRANSFER", //["TRANSFER", "DEPOSIT", "PIX"]
  "target": {
    "bank": "352",
    "branch": "0001",
    "account": 3
  },
  "origin": {
    "bank": "100",
    "branch": "34534",
    "cpf": "949.192.620-94",
  }
  "amount": 1000
}
```

# Database

## TypeORM

Actual version used >= **0.3.6** <br>
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
