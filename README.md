# Code Sharing App Server

This is the server-side application for a real-time code sharing platform. The server is built with Node.js and Express, and it uses MongoDB for data storage and Socket.IO for real-time communication.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Socket.IO**: Library for real-time web applications.
- **MongoDB**: NoSQL database for storing code blocks.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

## Server Functionality

- **Code Blocks Management**: The server stores and manages code blocks in MongoDB. Each code block has a title, code snippet, and a solution.
- **Real-Time Collaboration**: The server uses Socket.IO to facilitate real-time code sharing and collaboration. The first user to join a code block is assigned as the mentor (read-only mode), and subsequent users are students who can edit the code.
- **Mentor and Student Roles**: The mentor can see code changes in real-time but cannot edit the code. If the mentor leaves, the next student becomes the mentor.
- **Success Detection**: When a student's code matches the solution, a success message is displayed.

## Deployment

The server is deployed on Heroku. It connects to a MongoDB database using a URI stored in environment variables. The server listens on a specified port for incoming connections.
