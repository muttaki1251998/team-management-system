const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db');

// Api routes
const memberRoutes = require('./api/memberRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect db
connectdb();

// Api routes
app.use('/api/members', memberRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
