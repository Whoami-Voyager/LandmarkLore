
# LandmarkLore

The idea for LandmarkLore was born out of a conversation with a classmate, where we both realized that everyone has a unique story to tell. This inspired me to create a platform dedicated to sharing and preserving these stories, particularly those related to the evolution of technology.

LandmarkLore allows users to create markers pinpointing the exact longitude and latitude of significant locations around the world. Users can upload detailed captions, add images, and explore markers created by others. This interactive map, powered by LeafletJs, makes it possible to visually and contextually explore technological milestones and personal anecdotes associated with them.

Through this project, I hope to bring an extra depth to every part of the world, encouraging users to develop a deeper appreciation for these stories. As users navigate the map, I want them to think, "Hey, I should explore that.". I hope you enjoy.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Features

- **User Authentication**: Secure login and registration.
- **Interactive Map**: Browse landmarks using an interactive map.
- **Marker Clustering**: Efficiently display many markers using clustering.
- **User Profiles**: Each user has a profile displaying their markers.
- **Add Landmarks**: Users can add new landmarks with descriptions and images.

## Features I need to get working

- **Favorite Landmarks**: Users can favorite landmarks for easy access.
- **Friends**: Users can connect with friends to share their discoveries.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Whoami-Voyager/LandmarkLore.git
   cd client
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Set up the backend server:**
   ```bash
   cd server
   pipenv install && pipenv shell
   ```

5. **Initialize Database**
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. **Start Flask API:**
    ```bash
    python app.py
    ```

7. **(Optional) Seed Database:**
    ```bash
    python seed.py
    ```

## Usage

1. **Navigate to the application in your browser:**
   ```
   http://localhost:3000
   ```

2. **Register or log in:**
   Create a new account or log in with existing credentials.

3. **Explore the map:**
   Use the interactive map to explore existing landmarks.

4. **Add a new landmark:**
   Click on the map to add a new marker with details about the landmark.

## API

The backend API supports the following endpoints:

- **User Endpoints:**
  - `GET /api/user/:userId` - Retrieve user information.
  - `POST /api/user` - Create a new user.
  - `DELETE /api/user/:userId` - Delete a user.
  - `PATCH /api/user/:userId` - Update a user.

- **Marker Endpoints:**
  - `GET /api/markers` - Retrieve all markers.
  - `POST /api/markers` - Create a new marker.
  - `DELETE /api/marker/:markerId` - Delete a marker.
  - `PATCH /api/marker/:markerId` - Update caption in marker.

### Hope you enjoy!