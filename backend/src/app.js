const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const alertRoutes = require('./routes/alertRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const alertSocket = require('./sockets/alertSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.set('socketio', io);

app.get('/api/test', (req, res) => res.json({ message: 'API is working' }));

// Routes
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/alerts', alertRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/departments', departmentRoutes);
app.use('/api', apiRouter);

// Fallback 404 handler
app.use((req, res) => {
  console.log(`Fallback 404: ${req.method} ${req.url}`);
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

alertSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
