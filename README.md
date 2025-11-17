# collaborative-editor
backend: nodejs server - https://nodejs.org/en/download
build: npm install or pnpm install
run server : node src/server.ts , hosts websocket server & endpoint /api/complete (Gemini integration)

frontend: angular application scaffloding using vite
build: npm install or pnpm install
run: npm start
editor library: Codemirror and acrodata wrapper (Codemirror 6 wrapper for Angular)

individual package instllations ( already added to package.json)
pnpm install codemirror @codemirror/basic-setup @codemirror/lang-javascript @codemirror/autocomplete
pnpm install yjs y-websocket y-codemirror.next
npm install ws yjs y-websocket
