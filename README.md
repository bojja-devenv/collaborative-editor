# Collaborative Editor
 
A real-time collaborative code editor application featuring a Node.js backend and an Angular frontend.
 
## Features
 
*   Real-time collaborative code editing using CodeMirror and Yjs.
*   WebSocket communication for synchronization.
*   Angular frontend scaffolded with Vite.
*   Node.js backend server.
*   Includes an API endpoint `/api/complete` for AI-powered code completion (Gemini integration).
 
## Tech Stack
 
*   **Frontend:**
    *   Angular
    *   Vite
    *   CodeMirror 6
    *   Yjs
    *   y-codemirror.next (CodeMirror 6 binding for Yjs)
    *   ngx-codemirror (Acrodata wrapper - Likely refers to an Angular wrapper for CodeMirror)
*   **Backend:**
    *   Node.js
    *   `ws` (WebSocket library)
    *   Yjs
    *   y-websocket (WebSocket provider for Yjs)
*   **Real-time Sync:** Yjs
 
## Prerequisites
 
*   **Node.js:** Ensure you have Node.js installed. You can download it from [https://nodejs.org/en/download](https://nodejs.org/en/download).
*   **Package Manager:** npm (comes with Node.js) or pnpm.
 
## Getting Started
 
1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd collaborative-editor
    ```
 
2.  **Install Dependencies:**
    Install the necessary packages for both the frontend and backend.
    ```bash
    # Using npm
    npm install
 
    # Or using pnpm
    pnpm install
    ```
    This will install dependencies listed in `package.json`, which should include:
    *   `codemirror`
    *   `@codemirror/basic-setup`
    *   `@codemirror/lang-javascript`
    *   `@codemirror/autocomplete`
    *   `yjs`
    *   `y-websocket`
    *   `y-codemirror.next`
    *   `ws`
    *   Angular dependencies
    *   Vite dependencies
 
3.  **Environment Variables (Optional):**
    If your Gemini integration requires an API key, you'll likely need to set up environment variables. Create a `.env` file in the root directory if needed:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY
    ```
 
## Running the Application
 
1.  **Start the Backend Server:**
    This command runs the Node.js server, which hosts the WebSocket server for collaboration and the `/api/complete` endpoint.
    ```bash
    node src/server.ts
    ```
    (Note: You might need `ts-node` or a build step if you're not pre-compiling the TypeScript server code.)
 
2.  **Start the Frontend Development Server:**
    This command starts the Vite development server for the Angular application.
    ```bash
    npm start
    ```
    The application should typically be accessible at `http://localhost:5173` (Vite's default port).
 
## Key Dependencies Used
 
*   **CodeMirror 6:** The core editor library.
*   **Yjs:** A CRDT library for real-time collaboration.
*   **y-websocket:** WebSocket provider for Yjs to sync document updates.
*   **y-codemirror.next:** Binds Yjs documents to CodeMirror 6 instances.
*   **ws:** Node.js WebSocket library for the backend.
*   **Angular:** Framework for the frontend application.
*   **Vite:** Build tool and dev server for the frontend.