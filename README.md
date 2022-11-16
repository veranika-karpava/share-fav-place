# UrFavPlace
UrFavPlace is a fully responsive full-stack web app that allows users to share/update/delete their favourite places(title, description, picture and location) in the world. The user gets a list of favourite places from other users.

Current functionality:
* sign up and login to the web app 
* upload an avatar for the user profile
* share/update/delete(title, description, location, picture) user's place
* get location of the user's favorite place 
* log out

# Project Structure
* `/` - homepage with a list of users with counted shared places
* `/:userId/places` - specified user's places page with a list of places with option find place's location
* `/auth` - sign up or login page with sign up/login forms
* `/places/new` - new place page with option to add picture, title, description and address(the street number, the street name, the city, the State/Provincial (example: 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA))
* `/places/:placeId` - place's update page with option to update title and description

# Enviroment Variables
Check `.env.sample` in the client and the server directory to set up enviroment variables file (.env). For variable STORAGE_TYPE set "cloud" for deploying the project and "local" for using the project locally.

# Project Tech Stack
* Sass
* ReactJS
* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* Multer
* JWT Authentication

# Project 3rd-party API
* Google Map API
* Geocoding API
* Cloudinary API

# Running the Project
1. Clone or download this repository
2. Start the server
   * **`cd server`** - change project directory to server diretory
   * **`npm install`** - install all the node modules and dependecies
   * **`npm start`** - start run server on port
3. Start the client
   * **`cd client`** - change project directory to client diretory
   * **`npm install`** - install all the node modules and dependecies
   * **`npm start`** - start run UrFavPlace app on http://localhost:3000 in browser

# Link to the demo
https://share-ur-fav-place.web.app/


