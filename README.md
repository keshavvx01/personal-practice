# DevOps CI/CD Todo API

A more production-style Node.js and Express backend built for learning DevOps step by step. The project now includes a PostgreSQL-backed CRUD API, Docker containerization, Docker Compose orchestration, automated tests, and a GitHub Actions CI workflow.

## Features

- Express backend with JSON responses
- PostgreSQL-backed Todo CRUD API
- Health endpoint at `/health`
- Dockerized app for container-based deployment
- Docker Compose setup for app plus database
- Basic automated test using Node's built-in test runner
- GitHub Actions workflow for continuous integration

## Project Structure

```text
.
|-- .github/workflows/ci.yml
|-- app.js
|-- db.js
|-- server.js
|-- docker-compose.yml
|-- init.sql
|-- tests/app.test.js
|-- Dockerfile
|-- .env.example
|-- package.json
```

## API Endpoints

- `GET /`
- `GET /health`
- `GET /api/todos`
- `GET /api/todos/:id`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

## Run Locally With PostgreSQL

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Make sure PostgreSQL is running locally, then start the server:

```bash
npm run dev
```

Test the app:

```bash
npm test
```

Open:

- `http://localhost:3000/`
- `http://localhost:3000/health`

Example request:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker Compose"}'
```

## Run With Docker Compose

Start the API and PostgreSQL together:

```bash
docker compose up --build
```

This will start:

- API on `http://localhost:3000`
- PostgreSQL on `localhost:5432`

To stop everything:

```bash
docker compose down
```

## CI Pipeline

The GitHub Actions workflow:

- installs dependencies with `npm ci`
- runs automated tests on pushes to `main`
- runs automated tests on pull requests

## Resume Description

Built a Dockerized Node.js and Express Todo API with PostgreSQL, CRUD endpoints, automated tests, Docker Compose orchestration, and a GitHub Actions CI workflow to demonstrate practical DevOps and CI/CD skills.
