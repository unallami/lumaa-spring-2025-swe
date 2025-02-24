Task Manager Application
========================

This repository contains a Task Management application built with a React (TypeScript) frontend and a Node.js (Express, TypeScript) backend using PostgreSQL as the database.

Features
--------

*   **User Authentication:**
    
    *   Registration and login endpoints with secure password hashing (bcrypt)
        
    *   JWT-based authentication
        
*   **Task Management:**
    
    *   Create, update, view, and delete tasks
        
    *   Tasks are tied to the authenticated user
        
*   **Frontend UI:**
    
    *   Responsive React app with a table view of tasks
        
    *   Radio button selection to choose a single task for editing or deletion
        
    *   Modal popup for creating and editing tasks
        

Project Structure
-----------------

task-manager-app/  ├── backend/         # Node.js + Express + TypeScript backend  │   ├── src/  │   │   ├── controllers/  │   │   │   ├── authController.ts  │   │   │   └── taskController.ts  │   │   ├── middleware/  │   │   │   └── authMiddleware.ts  │   │   ├── utils/  │   │   │   └── db.ts  │   │   └── server.ts  │   ├── migrations.sql    # SQL migration script for setting up the database tables  │   ├── .env              # Environment variables for backend (see below)  │   ├── package.json  │   └── tsconfig.json  ├── frontend/        # React + TypeScript frontend  │   ├── src/  │   │   ├── context/  │   │   │   └── AuthContext.tsx  │   │   ├── pages/  │   │   │   ├── LoginPage.tsx  │   │   │   ├── RegisterPage.tsx  │   │   │   └── TasksPage.tsx  │   │   ├── App.tsx  │   │   └── index.tsx  │   ├── .env              # Environment variables for frontend (see below)  │   ├── package.json  │   └── tsconfig.json      (if applicable)  └── README.md   `

Setup Instructions
------------------

### 1\. Database Setup

#### 1.1 Install PostgreSQL

*   **Windows:**Download the installer from the [PostgreSQL official website](https://www.postgresql.org/download/windows/) and follow the installation instructions.
    
*   bashCopybrew install postgresqlbrew services start postgresql
    
*   bashCopysudo apt updatesudo apt install postgresql postgresql-contribsudo systemctl start postgresql
    

#### 1.2 Create the Database

1.  bashCopypsql -U postgresWhen prompted, enter your PostgreSQL password.
    
2.  sqlCopyCREATE DATABASE task\_manager\_db;\\q
    

#### 1.3 Run the Migration Script

A migration file (migrations.sql) is provided in the /backend directory. It contains SQL commands to create the necessary tables.

1.  Open a Command Prompt and navigate to the /backend directory.
    
2.  bashCopy"C:\\Program Files\\PostgreSQL\\17\\bin\\psql" -U postgres -d task\_manager\_db -f migrations.sqlAdjust the path to psql if necessary.
    

### 2\. Environment Variables

#### 2.1 Backend

In the /backend directory, create a .env file with the following:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   iniCopyPORT=5000  DATABASE_URL=postgresql://postgres:your_password@localhost:5432/task_manager_db  JWT_SECRET=your_jwt_secret_here   `

*   Replace your\_password with your actual PostgreSQL password.
    
*   Replace your\_jwt\_secret\_here with a secure secret key for JWT.
    

#### 2.2 Frontend

In the /frontend directory, create a .env file with the following:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   iniCopyREACT_APP_API_URL=http://localhost:5000   `

### 3\. Running the Application

#### 3.1 Running the Backend

1.  Open a terminal and navigate to the /backend folder.
    
2.  bashCopynpm install
    
3.  bashCopynpm run devThe backend will run on [http://localhost:5000](http://localhost:5000).
    

#### 3.2 Running the Frontend

1.  Open a terminal and navigate to the /frontend folder.
    
2.  bashCopynpm install
    
3.  bashCopynpm startThe frontend will run on [http://localhost:3000](http://localhost:3000).
    

### 4\. Testing

*   **Backend Testing:**Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints:
    
    *   **Registration:** POST to http://localhost:5000/auth/register
        
    *   **Login:** POST to http://localhost:5000/auth/login
        
    *   **Tasks CRUD:** Test GET, POST, PUT, and DELETE on http://localhost:5000/tasks (ensure to pass the JWT in the Authorization header).
        
*   **Frontend Testing:**
    
    *   Register a new user and log in through the UI.
        
    *   Test creating, editing, and deleting tasks using the provided modal popup.
        
    *   Verify that the tasks table correctly allows single task selection for edit and deletion.
        

### 5\. Additional Notes

*   **CORS:**The backend is configured with CORS (using the cors middleware) to allow requests from [http://localhost:3000](http://localhost:3000).
    
*   **TypeScript:**Both backend and frontend projects are built with TypeScript for improved type safety.
    
*   **Deployment Considerations:**For production, consider adding more robust error handling, security measures, and logging.