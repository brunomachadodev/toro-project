# toro-project

## About

A fullstack project, built for `TORO-003` [challenge](https://github.com/ToroInvestimentos/desafio-toro-fullstack).
<br>
The project stack is composed by [Next.js](https://nextjs.org/) React framework along with [TailwindCSS](https://tailwindui.com/) as CSS framework in the frontend. [Nestjs](https://nestjs.com/) is the framework chosen for the backend and the database is [PostgreSQL](https://www.postgresql.org/).

Each project have a separated README, providing all details of each application.

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

_To access the endpoints list and expected payloads for them, please consult the specific README inside `nest_api` folder._

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
