# Code Collab

### Enhancing Collaborative Learning with Integrated Visual Exploration

Empower your classroom with the ultimate collaborative code editor, where teaching becomes a team effort and learning knows no bounds.

## Features

- **User Authentication**: Secure signup and login for users to protect their profiles and workspaces.
- **Real-time Collaboration**: Work together with peers to edit code simultaneously with extremely low latency.
- **Code Editing and Compilation**: Full-fledged code editor (Monaco Editor) with execution/compilation capabilities.
- **Real-time Integrated Whiteboard**: A shared visual workspace to brainstorm, draw architectural diagrams, and plan your code.
- **Real-time Chat**: Integrated communication channel to message collaborators seamlessly without leaving the platform.
- **Multi-language Support**: Write and compile code across various programming languages.

## Tech Stack

Code Collab leverages an array of modern technologies to deliver a seamless real-time experience:

- **Frontend**: HTML, CSS, JavaScript (React.js, Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time Communication**: WebSocket (Socket.io)
- **Code Editor**: Monaco Editor

## Local Setup & Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

- Node.js (v14 or above)
- MongoDB installed locally or access to a MongoDB Atlas cluster
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/code-collab.git
   cd code-collab
   ```

2. **Install Root Dependencies:**
   Install backend dependencies from the root directory:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies:**
   Navigate into the frontend (`code-collab`) directory and install its dependencies:
   ```bash
   cd code-collab
   npm install
   cd ..
   ```

4. **Environment Variables:**
   Create a `.env` file in the root folder and add the following configuration:
   ```env
   PORT=8080
   DEV_MODE=development
   URL=mongodb://127.0.0.1:27017/code  # Replace with your MongoDB URI if using Atlas
   JWT_TOKEN=your_super_secret_jwt_token_here
   ```

5. **Run the Application:**
   Start all components (Backend server, WebSocket servers, and React client) concurrently with one command from the project root:
   ```bash
   npm run dev
   ```

   This will spin up:
   - The Express backend server
   - The WebSocket server(s)
   - The React frontend application (usually running on port 5173 or 3000)

Enjoy building and collaborating!
