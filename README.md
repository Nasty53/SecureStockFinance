# SecureStockFinance# SecureStockFinance — Production-Ready Fintech Platform

A modern, secure investment portfolio management platform built with React, TypeScript, Node.js, Express, PostgreSQL, and Docker.

## Quick Start (Development)

### Prerequisites
- Docker & Docker Compose installed
- Node.js 20+ (for local development without Docker)

### Using Docker Compose

```bash
# Clone the repo
git clone https://github.com/Nasty53/SecureStockFinance.git
cd SecureStockFinance

# Copy environment variables
cp .env.example .env

# Start all services (db, redis, backend, frontend)
docker-compose up --build
