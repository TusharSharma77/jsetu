const WebSocket = require('ws');

// The signaling server listens on port 3001.
const wss = new WebSocket.Server({ port: 3001 });

const rooms = {};

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            const roomId = data.roomId;
            ws.roomId = roomId;
            if (!rooms[roomId]) {
                rooms[roomId] = new Set();
            }
            rooms[roomId].add(ws);
            console.log(`Client joined room: ${roomId}. Total clients: ${rooms[roomId].size}`);

            if (rooms[roomId].size === 2) {
                for (const client of rooms[roomId]) {
                    client.send(JSON.stringify({ type: 'ready', roomId }));
                }
            }
        } else {
            if (ws.roomId && rooms[ws.roomId]) {
                for (const client of rooms[ws.roomId]) {
                    if (client !== ws) {
                        client.send(message);
                    }
                }
            }
        }
    });

    ws.on('close', () => {
        if (ws.roomId && rooms[ws.roomId]) {
            rooms[ws.roomId].delete(ws);
            if (rooms[ws.roomId].size === 0) {
                delete rooms[ws.roomId];
            }
        }
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});

console.log('Signaling server running on ws://localhost:3001');