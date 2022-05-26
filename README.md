# toro-project

- [toro-project](#toro-project)
  - [About](#about)
- [Running the project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API routes and payload examples](#api-routes-and-payload-examples)
  - [Create account](#create-account)
  - [Find account](#find-account)
  - [Create balance](#create-balance)
  - [Create deposit](#create-deposit)

## About

A fullstack project, built for `TORO-003` [challenge](https://github.com/ToroInvestimentos/desafio-toro-fullstack).
<br><br>
The project is composed by [Next.js](https://nextjs.org/) React framework along with [TailwindCSS](https://tailwindui.com/) as CSS framework in the frontend. [Nestjs](https://nestjs.com/) is the framework chosen for the backend and the database is [PostgreSQL](https://www.postgresql.org/).

Each project have a separated README, providing all details of each application.

<br>

# Running the project

Both projects use yarn as the package manager.

```bash
# Install yarn
$ npm install --global yarn
```

## Backend

First navigate to `nest_api` folder then run the docker script.

```bash
# change directory
$ cd nest_api

# build project
$ yarn docker
```

It should be running on `http://localhost:3333`

<br>

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

_To access the endpoints list and their expected payloads, please consult the [API routes and payload examples](#api-routes-and-payload-examples) section._

## Frontend

To start the application, navigate to `next_client` folder and run the start script.

```bash
# on project root folder
$ cd next_client

# install dependencies
$ yarn

# start script
$ yarn next
```

# API routes and payload examples

## Create account

```json
// POST http://localhost:3333/account/create

{
  "name": string,
  "cpf": string,
  "email": string
}
```

## Find account

```json
// POST http://localhost:3333/account/find-by-cpf

{
  "cpf": string,
}
```

## Create balance

```json
// POST http://localhost:3333/account/balance/create

{
  "accountId": number,
  "balance": number,
}
```

## Create deposit

```json
// POST http://localhost:3333/account/events/deposit

{
  "event": string, //["TRANSFER", "DEPOSIT", "PIX"]
  "target": {
    "bank": "352",
    "branch": "0001",
    "account": string
  },
  "origin": {
    "bank": string,
    "branch": string,
    "cpf": string,
  }
  "amount": number
}
```
