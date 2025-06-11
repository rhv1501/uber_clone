# 🚗 Uber Microservices Project

This project is a microservices-based backend for an Uber-like ride-hailing platform. It is built using Node.js, Express, MongoDB, RabbitMQ, and follows a modular, service-oriented architecture.

## 🏗️ Architecture Overview

- **Communication:** HTTP (REST) & 🐇 RabbitMQ (for ride events)
- **Authentication:** 🔑 JWT-based with token blacklisting
- **Database:** Each service uses its own 🗄️ MongoDB
- **Queue:** RabbitMQ for ride event distribution

---

# 🚀 Running the Project

## 🐳 Using Docker Compose (Recommended)

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
2. In the project root, run:
   ```bash
   docker-compose up --build
   ```
3. This will:
   - 🏗️ Build and start all services (user, captain, ride, gateway)
   - 🗄️ Start a separate MongoDB instance for each service
   - 🐇 Start RabbitMQ with the management UI ([http://localhost:15672](http://localhost:15672), guest/guest)
   - 🌐 Expose all service ports (3000: gateway, 3001: user, 3002: captain, 3003: ride)
4. To stop all services:
   ```bash
   docker-compose down
   ```

## 💻 Running Locally (Without Docker)

1. Make sure you have Node.js, npm, and MongoDB & RabbitMQ running locally.
2. For each service (`user`, `captain`, `ride`, `gateway`):
   - Copy the example `.env` file or create your own with the required variables:
     - `MONGO_URL` (e.g., mongodb://localhost:27017/userdb)
     - `JWT_SECRET`
     - `RABBIT_URL` (for ride/captain, e.g., amqp://localhost:5672)
     - `GATEWAY_URL` (for ride, e.g., http://localhost:3000)
   - Install dependencies:
     ```bash
     cd user   # or captain, ride, gateway
     npm install
     ```
   - Start the service:
     ```bash
     npm start
     # or, for development with auto-reload:
     npm run dev
     ```
3. Start all services in separate terminals, or use a tool like `npm-run-all` or `concurrently` in the gateway for parallel startup.

---

# 📚 API Documentation

## 👤 User Service (Port 3001)

### 🔐 Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login
- `POST /auth/logout` — Logout (blacklists token)

### 👤 User

- `GET /user/profile` — Get user profile (auth required)

## 🚕 Captain Service (Port 3002)

### 🔐 Auth

- `POST /auth/register` — Register a new captain
- `POST /auth/login` — Login
- `POST /auth/logout` — Logout (blacklists token)

### 🧑‍✈️ Captain

- `GET /profile` — Get captain profile (auth required)
- `POST /toggle-availability` — Toggle captain's availability
- `GET /wait-for-new-ride` — Long-poll for new ride events (auth required)

## 🛣️ Ride Service (Port 3003)

### 🚗 Ride

- `POST /ride/create` — Create a new ride (user auth required)
- `POST /ride/accept` — Captain accepts a ride (captain auth required)

## 🌐 Gateway Service (Port 3000)

- Proxies requests to `/user`, `/captain`, `/ride` to the respective services.
- Handles logging and request routing.

---

# ⚙️ Environment Variables

Each service requires a `.env` file with the following variables:

- `MONGO_URL` — 🗄️ MongoDB connection string
- `JWT_SECRET` — 🔑 Secret for JWT signing
- `RABBIT_URL` — 🐇 RabbitMQ connection string (for ride, user and captain services)
- `GATEWAY_URL` — 🌐 Gateway service URL (for ride service)

---

# 📝 Message Queue Events

- **newRide**: Published by the ride service when a new ride is created. Consumed by the captain service for real-time ride assignment.
- **acceptRide**: Published by the ride service when a captain accepts a ride. Consumed by the user service for real-time ride acceptance updates.

---

# ❗ Error Handling

- All services return errors in JSON format:
  ```json
  { "status": "error", "message": "..." }
  ```
- JWT-protected routes require a valid token in cookies.
- Blacklisted tokens are rejected.

---

# 🛣️ What's Coming Next?

- 📱 Frontend web and mobile apps for users and captains
- 🗺️ Real-time location tracking and mapping
- 💳 Payment gateway integration
- 📊 Analytics and admin dashboard
- 🧪 More automated tests and CI/CD pipeline
- 🌍 Multi-language and internationalization support
- 🔒 Enhanced security and rate limiting

---

# 🤝 Contributions

Contributions are **open and welcome**! If you'd like to add features, fix bugs, or improve documentation:

- Fork the repo, create a branch, and submit a pull request.
- Please follow the code style and add tests for new features.
- Open issues for suggestions, bugs, or questions.

---

# 🪪 License

MIT
