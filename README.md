# Video Library

## Setup

### Step 1: Clone repo
- `git clone git@github.com:nbutenko/video-library.git`

### Step 2: DB and data setup
- Install [Docker](https://docs.docker.com/get-started/)
- Run `docker-compose up -d` from root - this will set up a Docker container for the DB, create all the necessary tables, and seed the data required for testing the app

### Step 3: API setup
- Run `npm i` from api folder
- Run `npm start` - `Server running on port 3001` is a good sign!

### Step 4: UI setup
- Run `npm i` from ui folder
- Run `npm start` - `Compiled successfully` is a good sign!

### Step 5: Testing
- Run `npm test` from ui (added) or api (todo!) separately to run the tests