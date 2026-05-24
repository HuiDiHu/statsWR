# statsWR frontend + backend API

## A website that tracks gameplay statistics of champions from Wild Rift over time

This project is a MERN stack website designed to track and display the overall statistical trends of champions from Wild Rift.

Features include:

* interactive tierlist table and champion page
* Dynamic assignment of ranks and tiers depending on champion performance
* Comment section for each champion (account required to access)
* A public backend API for all data used in this project

Website Link: <https://statswr.vercel.app>

## Dev setup instructions

> Tested with npm v10.2.4 Node v20.11.1

statsWR has three main local development components:

* Frontend: Vite + React app in `frontend`
* Backend: Express API in `backend`
* Database: MongoDB, used by the backend for champion data, abilities, users, and comments

1. `git clone` the repository
2. Copy the example environment files:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   The example values are ready for the default local setup:
   - note that backend
   - frontend: `http://localhost:5173`
   - backend: `http://localhost:5555`
   - MongoDB: `mongodb://localhost:27017/statswr`
3. Start MongoDB locally, or update `backend/.env` with your MongoDB Atlas URI.
   For local development with Docker see 'How to set up the database below'

4. Install dependencies and run the backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

5. In another terminal, install dependencies and run the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The chatbot route also needs a real `OPENAI_API_KEY` and MCP server URL. The default `.env.example` values are enough to start the core frontend, backend, and database setup, but chatbot responses require those optional services to be configured.

## How to set up the database

* if using local mongodb instance, navigate to `./database/` directory

```bash
# create new local docker container for atlas
docker-compose up -d
# connect to the atalas server with mongosh. install mongosh if it isn't
mongosh "mongodb://user:pass@localhost:27019/?directConnection=true"
# create database named statswr
use statswr
exit
```

* to stop the container, in the `./database/` directory
```bash
docker compose down
```


MongoDB must be running before these scripts are used. The scripts read `backend/.env`, so confirm `MONGO_URI` points to your local Docker database or your MongoDB Atlas database.

In the backend terminal:

* Run `node scripts/populateAbilities.js` to populate abilities. (Make sure the dependencies within `webscraper/requirements.txt` are installed on your machine)
* Run `node scripts/autoUpdate.js` to upload the gameplay data within the `rawChampionsData` folder (can be updated)
* Run `node scripts/deleteAllGameplayDataByDate.js` to delete all gameplayData entries with the date field equal to targetPatchDate

## Known issues (Work In Progress)

* Graph hover attribute sometimes not zeroing when moving cursor off of the graph
* Components within the Champion page not rendering uniformly upon first render
* Up to 50 seconds for backend to reconnect if server is inactive for more than 15 minutes
* WIP: Confirmation popup when users try to report or delete a comment
* WIP: User profile page
* WIP: Graph on hover label for path

## Endpoints

v1 backend API Documentation: <https://statswr-api.onrender.com/api-docs> (DM for cors access)

## Testing

Vitest + Jest + Selenium (DM for access)

## Find a bug?

Before sending a PR, squash all your merges and file an issue first.

Contact <andyhhdi@gmail.com> or <huidihu@utexas.edu> for any questions.

**statsWR v1 - 7/9/2024**
