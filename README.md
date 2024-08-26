
## Setup

### Step 1: clone repo
- `git clone git@github.com:nbutenko/video-library.git`

### Step 2: DB and data setup
- Install [Docker](https://docs.docker.com/get-started/)
- Run `docker-compose up -d` - this will setup a DB container, as well as all the tables and data needed for testing the app

### Step 3: API setup
- Run `npm i` from api folder
- Run `npm start` - `Server running on port 3001` is a good sign!

### Step 4: UI setup
- Run `npm i` from ui folder
- Run `npm start` - `Compiled successfully` is a good sign!

### Step 5: Testing
TODO