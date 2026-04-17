const { WebSocketServer } = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// ---- Static file server ----
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
        res.end(data);
    });
});

// ---- WebSocket server ----
const wss = new WebSocketServer({ server });

// players: Map<id, { ws, state }>
const players = new Map();
let nextId = 1;

const PLAYER_COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#e91e63'];

function broadcast(senderId, msg) {
    const data = JSON.stringify(msg);
    for (const [id, p] of players) {
        if (id !== senderId && p.ws.readyState === 1) {
            p.ws.send(data);
        }
    }
}

function broadcastAll(msg) {
    const data = JSON.stringify(msg);
    for (const [, p] of players) {
        if (p.ws.readyState === 1) p.ws.send(data);
    }
}

wss.on('connection', (ws) => {
    const id = String(nextId++);
    const color = PLAYER_COLORS[(players.size) % PLAYER_COLORS.length];
    players.set(id, { ws, state: null, color });

    // Welcome message with own id + existing players
    const existing = [];
    for (const [pid, p] of players) {
        if (pid !== id && p.state) existing.push({ id: pid, color: p.color, ...p.state });
    }
    ws.send(JSON.stringify({ type: 'welcome', id, color, players: existing }));

    console.log(`Player ${id} connected (${players.size} total)`);

    ws.on('message', (raw) => {
        let msg;
        try { msg = JSON.parse(raw); } catch { return; }

        if (msg.type === 'state') {
            players.get(id).state = msg;
            // Relay to all others
            broadcast(id, { type: 'state', id, color, ...msg });
        }
    });

    ws.on('close', () => {
        players.delete(id);
        broadcastAll({ type: 'leave', id });
        console.log(`Player ${id} disconnected (${players.size} total)`);
    });
});

server.listen(PORT, () => {
    console.log(`GT2 Multiplayer Server läuft auf http://localhost:${PORT}`);
    console.log(`Andere können sich verbinden über deine LAN-IP:${PORT}`);
});
