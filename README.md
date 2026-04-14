# Yogesh AI Hub

Frontend + backend setup for editable website content.

## Setup

1. Copy `.env.example` to `.env`
2. Set `ADMIN_API_KEY` in `.env`
3. Install packages:
   - `npm install`

## Run (Development)

- Terminal 1 (backend): `npm run dev:server`
- Terminal 2 (frontend): `npm run dev:client`

Frontend runs on `http://localhost:5173` and backend on `http://localhost:4000`.

## How To Edit Website Data

1. Open site and go to `Admin` section.
2. Paste `Admin API Key`.
3. Edit JSON and click `Save Data to Backend`.
4. Data is stored in: `server/data/site-data.json`.

## Build Frontend

- `npm run build`

## Run Backend in Production Mode

- `npm run start:server`
