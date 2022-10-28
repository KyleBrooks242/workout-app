# Swole Naysh

This project was started with a few goals in mind. The main goals of this project were the following:
* Become more familiar with non-relational databases 
* Connecting a frontend app to a backend server with the capability of writing to a database
* Setting up a way to easily create, record, and save workouts
* Ability to query and perform analysis on workout data

---
## Requirements

* Node
* CouchDB

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### CouchDB

https://docs.couchdb.org/en/3.2.2-docs/
- Follow the docs for your relevant OS

---

## Install Node Dependencies

    $ git clone https://github.com/KyleBrooks242/workout-app.git
    $ cd backend
    $ npm install
    $ cd ../workout-app
    $ npm install

## Configure app

This project uses dotenv for managing the DB credentials as well as the JWT secret. To set this up, you will need to do the following

    $ cd backend
    $ touch .env

Open the .env file and add the following:

    DBUSER="your_db_user"
    DBPASS="your_db_pass"

    JWT_TOKEN_KEY="your_jwt_token_key"


## Running the backend server (dev)

    $ cd backend
    $ npm run dev

## Running the frontend (dev)

    $ cd workout-app
    $ npm run start
    

## Simple build for production
WIP