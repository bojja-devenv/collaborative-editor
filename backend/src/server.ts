import * as Y from 'yjs';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import { applyUpdate, encodeStateAsUpdate } from 'yjs';
import * as gemini from "./gemini.ts";
import { fromUint8Array, toUint8Array } from 'js-base64'


const app = express();
app.use(cors());
app.use(express.json());
 
const server = http.createServer(app);

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', ws => {
   console.log('Client connected');

  // Create a new Y document for each connection (or manage documents in a Map/object)
  const doc = new Y.Doc();

const documentState = Y.encodeStateAsUpdate(doc) // is a Uint8Array
//console.log(documentState);
// Transform Uint8Array to a Base64-String
const base64Encoded = fromUint8Array(documentState)
//console.log(base64Encoded);

// Transform Base64-String back to an Uint8Array
const binaryEncoded = toUint8Array(base64Encoded)

ws.on('message', function message(data, isBinary) {
    console.log(`Received message. isBinary: ${isBinary}`);
 
    if (isBinary) {
      console.log('Received binary data:', data);
      const base64String = data.toString('base64');
      console.log('Base64 Encoded String:', base64String);
      const decodedBuffer = Buffer.from(base64String, 'base64');
      console.log('Decoded Buffer:', decodedBuffer);
      const originalString = decodedBuffer.toString('utf8'); // or just decodedBuffer.toString()
      console.log('Base64 Encoded:', base64String);
      console.log('Decoded String:', originalString);
    } else {
      // Handle text data
      // 'data' is a Buffer, so convert it to a string
      const messageString = data.toString(); // Defaults to utf8
      console.log('Received text message:', messageString);
 
      // Example: Parse if JSON is expected
      try {
        const jsonData = JSON.parse(messageString);
        console.log('Parsed JSON:', jsonData);
      } catch (e) {
        console.log('Message is not valid JSON.');
      }
    }
    // Example: Echo the message back to the client
    // ws.send(data, { binary: isBinary });
  });

  // Send the current state of the document to the new client
  ws.send(encodeStateAsUpdate(doc));

  // Listen for updates in the document and broadcast to connected clients
  const updateHandler = update => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(update);
      }
    });
  };
  doc.on('update', updateHandler);

  ws.on('close', () => {
    doc.off('update', updateHandler);
    // Add logic here to destroy the document if no clients are connected and no persistence is used
  });
   ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
app.post('/api/complete', gemini.handleCodeCompletion);
console.log('WebSocket server running on ws://localhost:3000');