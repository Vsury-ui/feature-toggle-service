# Feature Toggle Microservice

A highly scalable microservice for managing Feature Toggles across different products and environments, built with NestJS and TypeORM.

## Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL with TypeORM
- **API Documentation**: Swagger UI

## Architecture
See the `FeatureToggleArchitecture.drawio` file for the structural breakdown.

---

## 🚀 Getting Started

### 1. Requirements
- Node.js (v18+)
- Local PostgreSQL instance or Docker.

### 2. Installation
```bash
npm install
```

### 3. Database Setup (Docker)
To instantly start a local PostgreSQL container with the correct credentials:
```bash
docker-compose up -d
```
*(This uses the credentials: User: `postgres`, Password: `postgres`, DB: `feature_toggle_service`)*

### 4. Running the Application
```bash
# development
npm run start

# watch mode
npm run start:dev
```

### 5. Accessing the Service
Once the application is running, navigate to the **Swagger UI Dashboard** to test the API directly from your browser:
👉 **[http://localhost:3000/api](http://localhost:3000/api)**

## 📚 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/toggles` | Create a new toggle for a specific product |
| `GET` | `/toggles/product/:productId` | Get all toggles configured for a product |
| `GET` | `/toggles/product/:productId/env/:env` | Simple `{ "feature_key": true }` map for a specific environment |
| `PATCH` | `/toggles/:id` | Update toggle configuration (e.g., turn off for an environment) |
| `DELETE` | `/toggles/:id` | Delete a toggle completely |

Example POST payload:
```json
{
  "key": "new-dashboard-ui",
  "productId": "internal-crm",
  "description": "Enables the React dashboard for the CRM",
  "environments": {
    "dev": true,
    "staging": true,
    "prod": false
  }
}
```
