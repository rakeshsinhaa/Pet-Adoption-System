# JWT Authentication Setup Guide

If you have just pulled the latest code from GitHub, follow these steps to get the authentication system working.

## 1. Install Server Dependencies
New packages (`jsonwebtoken`, `bcryptjs`) have been added. You need to install them.

```bash
cd server
npm install
```

## 2. Environment Variables
Ensure your `server/.env` file has the following variables:

```env
mongooseURL=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```
*Note: If `JWT_SECRET` is not provided, it defaults to 'secret', but this is not recommended for production.*

## 3. Create an Admin User
You need at least one admin user in the database to log in.

I have included a script to help you with this.
1. Make sure your server is running or you have a valid DB connection.
2. Run the test/setup script:

```bash
cd server
node test_auth.js
```

This script will:
- Attempt to register a user with username: `admin` and password: `123`.
- If the user already exists, it will skip registration.
- It will then test the login to ensure everything is working.

## 4. Start the Server
```bash
cd server
npm run dev
# or
nodemon server
```

## 5. Login
Go to the Admin Login page on the client application and log in with:
- **Username**: `admin`
- **Password**: `123`
