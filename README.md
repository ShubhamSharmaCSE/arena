# DecentSocial - Decentralized Social Media Platform

A full-stack decentralized microblogging platform built with Next.js, NestJS, and Ethereum wallet authentication.

## Overview

DecentSocial is a trustless authentication social media platform that enables users to:

- Log in via their Ethereum wallet (using RainbowKit and ethers.js)
- Create and update their profile details
- Publish short text updates (maximum 280 characters)
- View a consolidated feed of all users' posts
- Like and comment on posts

## Technology Stack

### Frontend
- **React.js / Next.js**: UI framework with App Router
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **RainbowKit**: User-friendly wallet connection UI
- **Wagmi**: React hooks for Ethereum
- **Ethers.js**: Ethereum utility library

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeScript**: For type safety
- **PostgreSQL**: Relational database
- **TypeORM**: Object-relational mapping
- **Ethers.js**: For signature validation

## Features

### Authentication
- Wallet-based authentication via message signing
- Trustless authentication without passwords

### User Management
- Create and update profile details (username, bio, profile picture URL)
- Wallet address serves as the unique identifier

### Posts
- Create short text posts (max 280 chars)
- View global feed of all user posts
- View individual post details

### Interactions
- Like posts
- Comment on posts
- View all comments for a post

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Ethereum wallet (MetaMask, Coinbase Wallet, etc.)

### Environment Setup

#### Backend

1. Create a `.env` file in the `backend` directory with the following contents:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=decentralized_social
DB_SYNC=true

# API Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

2. Create the PostgreSQL database:

```sql
CREATE DATABASE decentralized_social;
```

#### Frontend

1. Create a `.env.local` file in the `frontend` directory:

```
# Application URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK=mainnet

# Optional: Infura or Alchemy API key for better RPC 
NEXT_PUBLIC_INFURA_ID=your_infura_id_here
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/decentralized-social-media.git
cd decentralized-social-media
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Database Schema

- **users**
  - wallet_address (PRIMARY KEY)
  - username
  - bio
  - profile_pic_url

- **posts**
  - id (PRIMARY KEY)
  - wallet_address (FOREIGN KEY → users)
  - content
  - timestamp

- **likes**
  - post_id (PRIMARY KEY, FOREIGN KEY → posts)
  - wallet_address (PRIMARY KEY, FOREIGN KEY → users)

- **comments**
  - id (PRIMARY KEY)
  - post_id (FOREIGN KEY → posts)
  - wallet_address (FOREIGN KEY → users)
  - content
  - timestamp

## API Endpoints

### Authentication
- POST `/auth/verify`: Validate a signed message

### User Management
- GET `/users/:wallet`: Get user profile by wallet address
- POST `/users`: Create or update user profile

### Posts
- GET `/posts`: Get all posts
- POST `/posts`: Create a new post
- GET `/posts/:id`: Get post details
- POST `/posts/:id/like`: Like/unlike a post

### Comments
- POST `/posts/:id/comment`: Add a comment to a post
- GET `/posts/:id/comments`: Get all comments for a post

## Future Improvements

- IPFS integration for media storage
- Private messaging
- Following/follower functionality
- Advanced feed algorithms
- Notification system

## License

[MIT](LICENSE)
