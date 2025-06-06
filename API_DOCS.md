# DecentSocial API Documentation

## Authentication

### Verify Wallet Signature
Verifies a wallet's signature to authenticate the user.

```
POST /auth/verify
```

**Request Body:**
```json
{
  "walletAddress": "0x1234...5678",
  "signature": "0xabcd...ef01",
  "message": "Login to Decentralized Social Media"
}
```

**Response:**
```json
{
  "success": true,
  "walletAddress": "0x1234...5678"
}
```

## Users

### Get User Profile
Gets a user's profile by wallet address.

```
GET /users/:wallet
```

**Response:**
```json
{
  "wallet_address": "0x1234...5678",
  "username": "user123",
  "bio": "This is my profile bio",
  "profilePicUrl": "https://example.com/image.jpg"
}
```

### Update User Profile
Updates the current user's profile.

```
POST /users
```

**Request Body:**
```json
{
  "username": "newUsername",
  "bio": "Updated bio information",
  "profilePicUrl": "https://example.com/new-image.jpg"
}
```

**Response:**
```json
{
  "wallet_address": "0x1234...5678",
  "username": "newUsername",
  "bio": "Updated bio information",
  "profilePicUrl": "https://example.com/new-image.jpg"
}
```

## Posts

### Get All Posts
Gets a list of all posts.

```
GET /posts
```

**Response:**
```json
[
  {
    "id": "uuid-string",
    "wallet_address": "0x1234...5678",
    "content": "This is a post content",
    "timestamp": "2023-06-06T12:00:00Z",
    "username": "user123",
    "profilePicUrl": "https://example.com/image.jpg",
    "likesCount": 5,
    "commentsCount": 2,
    "isLiked": true
  },
  ...
]
```

### Get Post by ID
Gets details of a specific post.

```
GET /posts/:id
```

**Response:**
```json
{
  "id": "uuid-string",
  "wallet_address": "0x1234...5678",
  "content": "This is a post content",
  "timestamp": "2023-06-06T12:00:00Z",
  "username": "user123",
  "profilePicUrl": "https://example.com/image.jpg",
  "likesCount": 5,
  "commentsCount": 2,
  "isLiked": true
}
```

### Create Post
Creates a new post.

```
POST /posts
```

**Request Body:**
```json
{
  "content": "This is my new post"
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "wallet_address": "0x1234...5678",
  "content": "This is my new post",
  "timestamp": "2023-06-06T12:00:00Z"
}
```

### Like/Unlike Post
Toggles like status for a post.

```
POST /posts/:id/like
```

**Response:**
```json
{
  "success": true
}
```

## Comments

### Get Comments for Post
Gets all comments for a specific post.

```
GET /posts/:id/comments
```

**Response:**
```json
[
  {
    "id": "uuid-string",
    "post_id": "post-uuid-string",
    "wallet_address": "0x1234...5678",
    "content": "This is a comment",
    "timestamp": "2023-06-06T12:30:00Z",
    "username": "user123",
    "profilePicUrl": "https://example.com/image.jpg"
  },
  ...
]
```

### Create Comment
Adds a new comment to a post.

```
POST /posts/:id/comment
```

**Request Body:**
```json
{
  "content": "This is my comment on the post"
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "post_id": "post-uuid-string",
  "wallet_address": "0x1234...5678",
  "content": "This is my comment on the post",
  "timestamp": "2023-06-06T12:35:00Z"
}
```

## Authentication Headers

For authenticated endpoints, include these headers:

```
Authorization: Bearer <signature>
x-wallet-address: <wallet_address>
```

Where `<signature>` is the signature returned from the `/auth/verify` endpoint and `<wallet_address>` is the user's Ethereum wallet address.
