import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
///import { setupWSConnection } from 'y-websocket/bin/utils';
//import { setupWSConnection } from '../../node_modules/y-websocket/bin/utils.js'
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

///import * as Y from 'yjs';
import { config } from 'dotenv';
//import { handleCodeCompletion } from './gemini';
import * as gemini from "./gemini.ts";
 
config(); // Load .env file
 
const app = express();
app.use(cors());
app.use(express.json());
 
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
 
wss.on('connection', (ws, req) => {
    // y-websocket's setupWSConnection handles document sharing and awareness
    setupWSConnection(ws, req);
});
 
// Gemini API Proxy Endpoint
app.post('/api/complete', gemini.handleCodeCompletion);
 
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});