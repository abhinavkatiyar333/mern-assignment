# MERN Task Manager Frontend

This frontend is a React + Vite application built to work with the existing backend APIs at `http://localhost:5000/api`.

## Features

- Login and registration pages
- JWT authentication stored in `localStorage`
- Protected dashboard route
- Fetch, create, edit, and delete tasks
- Clean responsive UI with a navbar

## Setup

1. Open a terminal in `frontend`
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open the browser at the URL shown by Vite (typically `http://localhost:5173`).

## Notes

- The app uses `Authorization: Bearer TOKEN` for protected backend calls.
- If the backend is running on `http://localhost:5000`, no extra proxy configuration is needed.
