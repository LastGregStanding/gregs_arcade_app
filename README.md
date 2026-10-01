# Greg's Arcade

I originally taught myself programming by building various games in the browser using JavaScript/HTML/CSS.
Rather than have them go to waste, I decided to create a full stack web app where users can create accounts and play the games.
It stores users game data and allows users to compete with each other on the site's leaderboard.

**Live demo:** _https://gregs-arcade-app.vercel.app_

## Features

- User registration and login (bcrypt-hashed passwords, JWT stored in an httpOnly cookie)
- Per-user stats: play count and high score for each game
- Global leaderboards per game
- Account page showing your personal stats

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React 19, React Router, Vite, Axios, Swiper |
| Backend  | Node.js, Express                            |
| Database | PostgreSQL                                  |
| Auth     | JSON Web Tokens, bcrypt, cookie-parser      |

## Architecture & Hosting

| Piece    | Host                                        | Directory          |
| -------- | ------------------------------------------- | ------------------ |
| Frontend | [Vercel](https://vercel.com)                | `client/`          |
| API      | [Render](https://render.com) (Docker)       | `server/`          |
| Database | [Supabase](https://supabase.com) (Postgres) | `server/database/` |

The React app on Vercel calls the Express API on Render, which connects to the Supabase Postgres
database using a single `DATABASE_URL` connection string.

## Running Locally

### Prerequisites

- Node.js 20+
- A PostgreSQL database (local install, Docker, or a free Supabase project)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd gregs-arcade-app

cd server && npm install
cd ../client && npm install
```

### 2. Set up the database

Create a database and run the schema (optionally followed by the sample data):

```bash
createdb arcade
psql arcade -f server/database/DDL.sql
psql arcade -f server/database/sample_data.sql   # optional
```

If you're using Supabase instead, paste the contents of `DDL.sql` into the SQL Editor.

> Note: `DDL.sql` drops and recreates the `users` and `game_data` tables, so don't run it against a
> database that has data you want to keep.

### 3. Configure the server

Create `server/.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/arcade
JWT_SECRET=<any long random string>
CORS_ORIGIN=http://localhost:3000
PORT=8000
```

Supabase connection strings generally need SSL; if you connect to a hosted database, check that your
connection string / pool settings match your provider's requirements.

### 4. Configure the client

Create `client/.env` (this repo already includes one pointing at the default local API):

```env
VITE_API_URL=http://localhost:8000
```

### 5. Start both apps

In two terminals:

```bash
# Terminal 1 - API on http://localhost:8000
cd server
npm run dev

# Terminal 2 - frontend on http://localhost:3000
cd client
npm run dev
```

Open http://localhost:3000.

## Environment Variables

**Server (`server/.env`, or Render's environment settings)**

| Variable       | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `DATABASE_URL` | Postgres connection string                                                         |
| `JWT_SECRET`   | Secret used to sign auth tokens                                                    |
| `CORS_ORIGIN`  | Comma-separated list of allowed frontend origins (default `http://localhost:3000`) |
| `PORT`         | Port to listen on (default `8000`)                                                 |
| `NODE_ENV`     | Set to `production` when deployed                                                  |

**Client (`client/.env`, or Vercel's environment settings)**

| Variable       | Description                 |
| -------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API |

## Deployment

1. **Supabase** – Create a project and run `server/database/DDL.sql` in the SQL Editor. Copy the
   Postgres connection string.
2. **Render** – Create a Web Service from this repo with the root directory set to `server/` and the
   Docker runtime (it uses `server/Dockerfile`). Set `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`,
   and `CORS_ORIGIN` (your Vercel URL).
3. **Vercel** – Import the repo with the root directory set to `client/` (Vite preset). Set
   `VITE_API_URL` to your Render service URL.

## API Overview

| Route                | Purpose                  |
| -------------------- | ------------------------ |
| `/api/auth/*`        | Register, login, logout  |
| `/api/user/*`        | Authenticated user stats |
| `/api/leaderboard/*` | Leaderboard data         |
