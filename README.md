# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

Task Manager Application
========================

This repository contains a Task Management application built with a React (TypeScript) frontend and a Node.js (Express, TypeScript) backend using PostgreSQL as the database.

Features
--------

-   **User Authentication:**

    -   Registration and login endpoints with secure password hashing (bcrypt)
    -   JWT-based authentication
-   **Task Management:**

    -   Create, update, view, and delete tasks
    -   Tasks are tied to the authenticated user
-   **Frontend UI:**

    -   Responsive React app with a table view of tasks
    -   Radio button selection to choose a single task for editing or deletion
    -   Modal popup for creating and editing tasks

Project Structure
-----------------
```
lumaa-spring-2025-swe/
├── backend/         # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── utils/
│   │   │   └── db.ts
│   │   └── server.ts
│   ├── migrations.sql    # SQL migration script for setting up the database tables
│   ├── .env              # Environment variables for backend (see below)
│   ├── package.json
│   └── tsconfig.json
├── frontend/        # React + TypeScript frontend
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── TasksPage.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── .env              # Environment variables for frontend (see below)
│   ├── package.json
│   └── tsconfig.json      (if applicable)
└── README.md
```
Setup Instructions
------------------

### 1\. Database Setup

#### 1.1 Install PostgreSQL

-   **Windows:**\
    Download the installer from the [PostgreSQL official website](https://www.postgresql.org/download/windows/) and follow the installation instructions.

-   **macOS:**

    `brew install postgresql
    brew services start postgresql`

-   **Linux:**

    `sudo apt update
    sudo apt install postgresql postgresql-contrib
    sudo systemctl start postgresql`

#### 1.2 Create the Database

1.  Open Command Prompt (or terminal) and run:

    `psql -U postgres`

    When prompted, enter your PostgreSQL password.

2.  Create the database:

    `CREATE DATABASE task_manager_db;`

#### 1.3 Run the Migration Script

A migration file (`migrations.sql`) is provided in the `/backend` directory. It contains SQL commands to create the necessary tables.

1.  Open a Command Prompt and navigate to the `/backend` directory.
2.  Run the migration using:

    `"C:\Program Files\PostgreSQL\17\bin\psql" -U postgres -d task_manager_db -f migrations.sql`

    Adjust the path to `psql` if necessary.

### 2\. Environment Variables

#### 2.1 Backend

In the `/backend` directory, create a `.env` file with the following:

`PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/task_manager_db
JWT_SECRET=your_jwt_secret_here`

-   Replace `your_password` with your actual PostgreSQL password.
-   Replace `your_jwt_secret_here` with a secure secret key for JWT.

#### 2.2 Frontend

In the `/frontend` directory, create a `.env` file with the following:

`REACT_APP_API_URL=http://localhost:5000`

### 3\. Running the Application

#### 3.1 Running the Backend

1.  Open a terminal and navigate to the `/backend` folder.
2.  Install dependencies:

    `npm install`

3.  Start the backend server:

    `npm run dev`

    The backend will run on <http://localhost:5000>.

#### 3.2 Running the Frontend

1.  Open a terminal and navigate to the `/frontend` folder.
2.  Install dependencies:

    `npm install`

3.  Start the frontend development server:

    `npm start`

    The frontend will run on <http://localhost:3000>.

### 4\. Testing

-   **Backend Testing:**\
    Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints:

    -   **Registration:** POST to `http://localhost:5000/auth/register`
    -   **Login:** POST to `http://localhost:5000/auth/login`
    -   **Tasks CRUD:** Test GET, POST, PUT, and DELETE on `http://localhost:5000/tasks` (ensure to pass the JWT in the Authorization header).
-   **Frontend Testing:**

    -   Register a new user and log in through the UI.
    -   Test creating, editing, and deleting tasks using the provided modal popup.
    -   Verify that the tasks table correctly allows single task selection for edit and deletion.

### 5\. Additional Notes

-   **CORS:**\
    The backend is configured with CORS (using the `cors` middleware) to allow requests from <http://localhost:3000>.

-   **TypeScript:**\
    Both backend and frontend projects are built with TypeScript for improved type safety.

-   **Deployment Considerations:**\
    For production, consider adding more robust error handling, security measures, and logging.
