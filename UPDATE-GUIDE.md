# Fitness Tracker – update guide

Unzip this over your `Fitness-Tracker-App` folder (it keeps the same folder layout and replaces/adds files). Then:

## 1. Delete two old files (replaced by new ones)
```bash
rm -r back-end/controllers
rm front-end/src/components/Auth.jsx
```

## 2. Install dependencies
```bash
cd back-end && npm install
cd ../front-end && npm install
```

## 3. Back-end env (`back-end/.env`, see `.env.example`)
- `MONGO_URI` – your Atlas connection string
- `JWT_SECRET` – 32+ chars: `openssl rand -hex 32`
- `CLIENT_ORIGIN` – your deployed front-end URL (localhost:3000 always allowed)
- `GOOGLE_CLIENT_ID` – optional, enables Google sign-in
- `PORT=5002`

## 4. Front-end env (`front-end/.env`)
```
REACT_APP_API_URL=http://localhost:5002/api
REACT_APP_GOOGLE_CLIENT_ID=   # optional; leave empty to hide the Google button
```

## 5. Run locally
```bash
cd back-end && npm run dev
cd front-end && npm start
```

## 6. Tests
```bash
cd back-end && npm test        # 9 passing
cd front-end && CI=true npm test -- --watchAll=false   # 2 passing
```

## 7. Deploy (Render)
Commit and push to `main`. On Render, set the same back-end env vars (redeploy the API after changing them), and add `REACT_APP_API_URL` / `REACT_APP_GOOGLE_CLIENT_ID` to the front-end service.

## What changed
- **Login fixed + hardened:** validated sign-up/login, bcrypt, JWT, rate limiting, helmet, CORS allow-list, central error handler.
- **Google sign-in** (optional, via `GOOGLE_CLIENT_ID`).
- **Auth context + protected routes** on the front end.
- **New features:** workout stats endpoint (`/api/workouts/stats`), weekly chart on the dashboard, reusable workout form, exercise library.
- **Cleaner architecture:** config / middleware / services / routes / utils layers, plus tests.
