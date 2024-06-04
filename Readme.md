# Ride-Sharing Web Application for Steel Plant

## Overview

This is a ride-sharing web application designed for a steel plant. The application facilitates transportation within the plant by allowing visitors to find rides with employees, as external vehicles are not permitted inside the plant premises.

## Features

- **User Authentication**: Users can sign up and log in using their email or username.
- **Employee and Visitor Roles**: Different roles for employees and visitors with relevant permissions.
- **Ride Management**: Employees can offer rides, and visitors can book rides.
- **Booking System**: Visitors can book available rides based on time slots and locations.
- **Responsive Design**: The frontend is built with React and is responsive for various devices.

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Mongoose

## Contributors
Akhil Binoy

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running



### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/akhil888binoy/ride-sharing-app.git
   cd ride-sharing-app
2. Install server dependencies:

    ```sh
    cd server
    npm install
3. Create a .env file in the server directory with the following content:


    ```sh
    PORT=3001
    MONGO_URI=mongodb://localhost:27017/rideshare
    JWT_SECRET=

4. Start backend server:


    ```sh
    nodemon

### Frontend Setup

1. Install client dependencies:

   ```sh
        cd ../client
        npm install

2. Start the React development server:

   ```sh
        npm run dev

3. Open your browser and navigate to :

   ```sh
        http://localhost:3000





