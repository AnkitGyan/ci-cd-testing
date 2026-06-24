# Beautiful CI/CD Testing Backend

A lightweight, production-ready Express backend designed specifically for testing CI/CD pipelines. No database dependencies - just pure API endpoints.

## Features

-  Health check endpoint
-  User management endpoints
-  Data storage endpoints
-  Echo service
-  Statistics endpoint
-  Comprehensive error handling
-  Structured logging
-  CORS enabled
-  Full test coverage with Jest

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Testing

```bash
npm test
```

### Production

```bash
npm start
```

## API Endpoints

### Health Check

- **GET** `/health` - Server health status

### Users

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get specific user

### Data

- **GET** `/api/data` - Get all data entries
- **POST** `/api/data` - Create new data entry
  ```json
  {
    "title": "Entry Title",
    "description": "Optional description"
  }
  ```

### Utilities

- **GET** `/api/echo/:message` - Echo service
- **GET** `/api/stats` - Server statistics

## Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
DEBUG=false
```

## Project Structure

```
├── src/
│   ├── server.js              # Main server setup
│   ├── routes/
│   │   └── api.js             # API routes
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling
│   └── utils/
│       └── logger.js          # Logging utility
├── tests/
│   └── api.test.js            # Test suite
├── index.js                   # Entry point
└── package.json               # Dependencies
```

## Testing

This backend includes comprehensive Jest tests covering:

- Health checks
- User endpoints
- Data management
- Error handling
- Edge cases

Run tests with:

```bash
npm test
```

## CI/CD Ready

This backend is optimized for CI/CD pipelines:

- Health checks for deployment verification
- Structured logging for monitoring
- Graceful shutdown handling
- Error boundaries
- No external dependencies (database, cache, etc.)

Perfect for testing deployment pipelines, load testing, and integration testing!
