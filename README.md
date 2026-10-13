# Skill Swap Platform

## About the Project

The **Skill Swap Platform** is a full-stack web application where users can share the skills they can teach and find skills they want to learn from other users.

Users can create their profiles, add skills, explore other users, and send swap requests to exchange knowledge without buying or selling services.

## Features

- **User Authentication:** Register and log in securely using JWT authentication.
- **User Profile:** View and update personal profile information.
- **Skills Management:** Add and remove skills you can teach or want to learn.
- **Explore Users:** View other users and their skills.
- **Swap Requests:** Send, accept, and reject skill swap requests.
- **Request Management:** View received and sent swap requests.
- **Admin Role:** Support for an admin role to improve platform management.

## Tech Stack

### Frontend
- React.js
- TypeScript
- React Router
- Axios
- CSS

### Backend
- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Class Validator
- Swagger API Documentation

## Project Structure

```text
skill-swap-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── skills/
│   │   ├── user-skills/
│   │   ├── swap-requests/
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── README.md
```

## Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd skill-swap-platform
```

### 2. Set Up the Backend

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file in the backend root directory and configure your environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

Start the backend server:

```bash
npm run start:dev
```

### 3. Set Up the Frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## API Documentation

The backend API documentation is available through Swagger.

After starting the backend, open:

```text
http://localhost:3000/api
```

This allows you to explore and test the available API endpoints.

## Authentication

The application uses JWT-based authentication to protect user-specific routes.

After logging in, include the access token in the request headers:

```text
Authorization: Bearer <your_access_token>
```

## How It Works

1. Register and log in to the platform.
2. Create or update your user profile.
3. Add skills you can teach and skills you want to learn.
4. Explore other users and their skills.
5. Send a swap request to a suitable user.
6. Accept or reject incoming swap requests.
7. Exchange knowledge and learn new skills.

## Future Improvements

- User profile images.
- Search and filter users by skills.
- Session scheduling.
- Ratings and reviews.
- Notifications for swap requests.
- Enhanced admin dashboard.

## Author

Developed as a full-stack project to practice React, TypeScript, NestJS, MongoDB, and REST API development.
