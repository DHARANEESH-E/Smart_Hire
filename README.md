# HireSmart - Job Portal

This project is a MERN stack application consisting of a React frontend and an Express/MongoDB backend.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

1.  **Node.js**: [Download and install](https://nodejs.org/) (Version 16+ recommended).
2.  **MongoDB**: [Download and install MongoDB Community Server](https://www.mongodb.com/try/download/community) (Required for the local database).

## Setup Instructions

### 1. Backend Setup

The backend handles API requests and database connections.

1.  Open a terminal.
2.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up environment variables:
    - Ensure a `.env` file exists in the `server` directory with the following content:
      ```env
      PORT=5000
      MONGODB_URI=mongodb://localhost:27017/hiresmart
      JWT_SECRET=your_jwt_secret_key_here
      NODE_ENV=development
      ```
5.  Start the server:
    ```bash
    npm start
    ```
    - You should see "Server running on port 5000" and "MongoDB Connected".

### 2. Frontend Setup

The frontend is the user interface built with React and Vite.

1.  Open a **new** terminal window (keep the backend running in the first one).
2.  Navigate to the root directory of the project (where this README is located):
    ```bash
    # If you are in the 'server' folder, go back one level
    cd ..
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`).

## Quick Start for VS Code (The Easy Way)

If you are using VS Code, follow these steps to get running in seconds:

1.  **Open the Folder**: Open VS Code, go to `File > Open Folder...` and select the `HIRESMART` folder.
2.  **Open Terminal**: Press `` Ctrl + ` `` (backtick) to open the integrated terminal.
3.  **Run Backend**:
    *   In the terminal, type: `cd server`
    *   Type: `npm install`
    *   Type: `npm start`
4.  **Run Frontend (Split Terminal)**:
    *   Click the **"+"** icon or the **"Split Terminal"** icon (looks like a square split in two) in the terminal panel.
    *   In the new terminal, stay in the root folder.
    *   Type: `npm install`
    *   Type: `npm run dev`
5.  **Browser**: Ctrl + Click the link (e.g., `http://localhost:5173`) in the terminal.

> [!TIP]
> You can keep both terminals open side-by-side in VS Code to see logs from both the server and the frontend at the same time!

## Troubleshooting

-   **MongoDB Connection Error**: Ensure MongoDB service is running on your machine.
-   **Dependencies**: If you encounter errors, try deleting `node_modules` and running `npm install` again.
