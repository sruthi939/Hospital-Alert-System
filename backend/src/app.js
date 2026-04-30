const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const alertRoutes = require('./routes/alertRoutes');
const authRoutes = require('./routes/authRoutes');
const alertSocket = require('./sockets/alertSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

app.set('socketio', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes); // Protect this in routes with middleware

alertSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
