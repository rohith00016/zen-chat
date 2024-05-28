# MERN Chat App with Socket.IO

This is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO for real-time communication.

## Features

- **Real-time Messaging**: Users can send and receive messages instantly without the need to refresh the page.
- **User Authentication**: Users can sign up, log in, and log out securely.
- **User Presence**: Users can see who else is online.
- **Responsive Design**: The application is designed to work seamlessly on various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **MongoDB**: NoSQL database used to store user data and chat messages.
- **Express.js**: Backend framework for handling HTTP requests and routing.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for running the server-side code.
- **Socket.IO**: Library for real-time, bidirectional communication between web clients and servers.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account or local MongoDB server installed.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rohith00016/zen-chat.git
    ```

2. Navigate to the project directory:

    ```bash
    cd zen-chat
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    PORT=your_port_number
    ```

    Replace the placeholders with your actual credentials.

5. Start the development server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:5000` to view the application.

## Acknowledgments

- This project was inspired by [Socket.IO](https://socket.io/) and the MERN stack.
