# MERN Task Manager

This repository contains a backend Express API and a React + Vite frontend in `frontend/`.

## Deploy Backend on Render

1. Push your repo to GitHub.
2. Create a new Render Web Service.
3. Connect the repo and select branch `main`.
4. Use the following settings:
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Root Directory: repository root
5. Render will use `render.yaml` to configure the backend service.

### Notes

- The backend listens on `process.env.PORT || 5000`.
- CORS is enabled for the frontend.

## Deploy Frontend on Vercel

1. Create a new Vercel project.
2. Select the `frontend/` directory as the project root.
3. Use the default build settings or set:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. The file `frontend/vercel.json` ensures SPA routing works correctly.

### Environment

- Frontend base URL: `http://localhost:5173` for local development
- Backend base URL: `http://localhost:5000/api`

## Local Development

### Backend

```bash
cd c:\Users\abhin\OneDrive\Desktop\mern-assignment
npm install
npm start
```

### Frontend

```bash
cd c:\Users\abhin\OneDrive\Desktop\mern-assignment\frontend
npm install
npm run dev
```
