# Algo Vision AI Guide - Backend

A powerful backend service for an AI-powered Data Structures and Algorithms visualization platform. This service provides APIs for user management and algorithm visualization generation using OpenAI's GPT models.

## Features

- 🔐 User Authentication with JWT
- 🎯 Algorithm Visualization Generation
- 📊 MongoDB Database Integration
- 🔍 Input Validation using Zod
- 🛡️ Error Handling Middleware
- 🔒 Protected Routes
- 📱 CORS Support
- 🧪 TypeScript Support

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- OpenAI API
- JWT for Authentication
- Zod for Validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API Key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd algo-vision-ai-guide-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/algo-vision

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── index.ts        # Application entry point
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}
```

#### Login User
- **POST** `/api/users/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

### User Management

#### Get Current User
- **GET** `/api/users/me`
- **Headers:** `Authorization: Bearer <token>`

#### Update User
- **PATCH** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### Delete User
- **DELETE** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>`

### Visualizations

#### Create Visualization
- **POST** `/api/visualizations`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "algorithmType": "sorting",
  "algorithm": "bubble-sort",
  "input": [64, 34, 25, 12, 22, 11, 90],
  "speed": "medium"
}
```

#### Get User's Visualizations
- **GET** `/api/visualizations`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)

#### Get Single Visualization
- **GET** `/api/visualizations/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Delete Visualization
- **DELETE** `/api/visualizations/:id`
- **Headers:** `Authorization: Bearer <token>`

## Error Handling

The API uses a consistent error response format:

```json
{
  "status": "fail",
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm test`: Run tests

### Adding New Features

1. Create types in `src/types/`
2. Create model in `src/models/`
3. Create service in `src/services/`
4. Create controller in `src/controllers/`
5. Create routes in `src/routes/`
6. Add validation schemas in `src/middleware/validation.middleware.ts`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 