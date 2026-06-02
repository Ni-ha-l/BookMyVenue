# BookMyVenue – Auth Service

Authentication & Authorization microservice for the BookMyVenue platform.

## Tech Stack
- Node.js / Express.js / TypeScript
- MongoDB + Mongoose ODM
- Redis (refresh token storage)
- JWT (Access + Refresh tokens)
- Winston (logging)
- Docker + Docker Compose

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your values
```

### 3. Start MongoDB locally
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### 4. Start in development
```bash
npm run dev
```

### 5. Start with Docker Compose
```bash
docker-compose up --build
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register user |
| POST | `/api/auth/register-owner` | ❌ | Register owner (PENDING) |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/auth/refresh-token` | ❌ | Refresh access token |
| POST | `/api/auth/logout` | ✅ | Logout |
| POST | `/api/auth/forgot-password` | ❌ | Send OTP |
| POST | `/api/auth/verify-otp` | ❌ | Verify OTP |
| POST | `/api/auth/reset-password` | ❌ | Reset password |
| GET  | `/api/auth/me` | ✅ | Get current user |
| GET  | `/api/docs` | ❌ | Swagger UI |
| GET  | `/health` | ❌ | Health check |

## Architecture

```
src/
├── config/         # Env, MongoDB, Redis, Swagger config
├── models/         # Mongoose schemas (User, OtpRecord)
├── constants/      # HTTP status codes, messages, Redis keys
├── controllers/    # HTTP request handlers (thin layer)
├── services/       # Business logic (auth, token, email)
├── repositories/   # Database access layer (Mongoose)
├── routes/         # Express routers + Swagger JSDoc
├── middlewares/    # Auth, RBAC, error, rate limiter, validation
├── validators/     # express-validator rules
├── interfaces/     # TypeScript interfaces, DTOs, enums
├── types/          # Express Request augmentation
├── utils/          # AppError, JWT helpers, bcrypt, OTP, logger
├── templates/      # Email HTML templates
├── app.ts          # Express app setup
└── server.ts       # Entry point
```

## Roles & RBAC

- `USER` – Standard user
- `OWNER` – Venue owner (starts as `PENDING`, activated by Admin Service)
- `ADMIN` – Platform administrator

Use the `authorize` middleware:
```ts
import { Role } from './interfaces';
router.get('/admin-only', authMiddleware, authorize([Role.ADMIN]), handler);
```

## Database Models

### User (Mongoose)
```ts
{
  email: string (unique, indexed)
  password: string (bcrypt hashed)
  role: 'USER' | 'OWNER' | 'ADMIN'
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED'
  isVerified: boolean
  refreshToken: string | null
  ownerProfile?: {
    businessName: string
    ownerName: string
    phone: string
    address: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### OtpRecord (Mongoose with TTL Index)
```ts
{
  userId: ObjectId (ref User, unique)
  otpHash: string (bcrypt hashed)
  expiresAt: Date (TTL index — auto-deletes expired docs)
}
```

## Logs

```
logs/
├── error.log     # Error-level logs only
└── combined.log  # All logs
```
