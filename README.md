# Beginner DevOps CI/CD Backend

A simple Node.js and Express backend built as a beginner-friendly DevOps project. The app exposes a basic API, includes an automated health check route, runs inside Docker, and includes a GitHub Actions CI workflow for test automation.

## Features

- Express backend with JSON responses
- Health endpoint at `/health`
- Dockerized app for container-based deployment
- Basic automated test using Node's built-in test runner
- GitHub Actions workflow for continuous integration

## Project Structure

```text
.
|-- .github/workflows/ci.yml
|-- app.js
|-- server.js
|-- tests/app.test.js
|-- Dockerfile
|-- package.json
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

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

## Run With Docker

Build the image:

```bash
docker build -t express-devops-app .
```

Run the container:

```bash
docker run -p 3000:3000 express-devops-app
```

If port `3000` is already in use on your machine:

```bash
docker run -p 3001:3000 express-devops-app
```

## CI Pipeline

The GitHub Actions workflow:

- installs dependencies with `npm ci`
- runs automated tests on pushes to `main`
- runs automated tests on pull requests

## Resume Description

Built and dockerized a Node.js and Express backend with health-check endpoints, automated testing, and a GitHub Actions CI workflow to demonstrate beginner DevOps and CI/CD practices.
