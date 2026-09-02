# Student Management System

Full-stack MERN CRUD project.

## Stack
React.js, Node.js, Express.js, MongoDB, Mongoose, Git/GitHub, Postman.

## Features
Add, view, search, edit and delete students.

## Run
1. Install Node.js 18+ and MongoDB, or use MongoDB Atlas.
2. Backend:
```bash
cd backend
npm install
# copy .env.example to .env and set MONGO_URI
npm run dev
```
3. Frontend in another terminal:
```bash
cd frontend
npm install
npm run dev
```
4. Open the Vite URL shown in the terminal, normally http://localhost:5173.

## API
GET /api/students
GET /api/students?search=react
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id

Run it locally and understand the code before listing it on a resume.