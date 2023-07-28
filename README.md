
# News Application Backend for Sync-Digital-Solutions

This is the backend repository for the News Application built using the MERN stack (MongoDB, Express, React, and Node.js).

# Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

# Introduction

The News Application is a web-based platform that allows users to read and browse the latest news articles across different categories. This repository contains the backend code responsible for handling user authentication, news data management, and serving API endpoints to the frontend application.

# Features

- User authentication (register, login, JWT-based authentication)
- CRUD operations for news articles
- Categorization of news articles
- Secure password storage using bcrypt
- API endpoints to interact with the frontend application

# Technologies

The backend is built using the following technologies:

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication
- bcrypt for password hashing

# Getting Started

To run the backend server locally, follow the steps below:

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/news-backend.git
cd news-backend
npm install
```
# Configuration
Before running the application, you need to configure the database connection. Create a .env file in the root directory and add the following environment variables:
```bash
dbUrl=??????
JWTSECRETKEY=???????
PORT=3000
````
# Usage
Start the development server:
```bash
npm run dev
```
The backend server will be running at http://localhost:3000.

# API Endpoints
/api/users: User authentication and management endpoints.
/api/news: Endpoints for managing news articles.
/api/categories: Endpoints for managing news categories.
# Contributing
Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.
# License
This project is licensed under the MIT License.
# Contact 
For any questions or inquiries, feel free to contact:
Tony Kalalian - tkalalian@gmail.com
