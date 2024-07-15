# statsWR frontend + backend API

## A website that tracks gameplay statistics of champions from Wild Rift over time

This project is a MERN stack website designed to track and display the overall statistical trends of champions from Wild Rift.

Features include:
* interactive tierlist table and champion page
* Dynamic assignment of ranks and tiers depending on champion performance 
* Comment section for each champion (account required to access)
* A public backend API for all data used in this project

Website Link: https://statswr.vercel.app

## Dev setup instructions
> Tested with npm v10.2.4 Node v20.11.1 

1. ```git clone``` the repository
2. run ```npm install```
3. to run locally, switch all instances of ```https://statswr-api.onrender.com``` --> ```http://localhost:5555``` and ```https://statswr.vercel.app``` --> ```http://localhost:5173```
4. set up environment variables in the backend folder by creating a .env file and adding 
   ```
   PORT = 5555
   
   MONGO_URI = (your mongodb URI)
   
   JWT_SECRET = (128 byte string)
   ```
5. Run development backend server with ```cd backend``` and ```npm run dev```
6. Run development frontend server on another terminal with ```cd frontend``` and ```npm run dev```

## How to set up the database
In the backend terminal 
* Run ```node populateAbilities.js``` to populate abilities
* Run ```node uploadPatchData.js``` to upload the gameplay data within the rawChampionsData folder (can be updated)
* nuke the champions collection to reset

## Known issues (Work In Progress)
* Graph hover attribute sometimes not zeroing when moving cursor off of the graph
* Components within the Champion page not rendering uniformly upon first render
* Up to 50 seconds for backend to reconnect if server is inactive for more than 15 minutes
* WIP: Confirmation popup when users try to report or delete a comment
* WIP: User profile page
* WIP: Graph on hover label for path

## Endpoints
v1 backend API Documentation: https://statswr-api.onrender.com/api-docs (DM for cors access)

## Testing
unit tested using Vitest

## Find a bug?
Before sending a PR, squash all your merges and file an issue first.

Contact andyhhdi@gmail.com or huidihu@utexas.edu for any questions.

**statsWR v1 - 7/9/2024**
