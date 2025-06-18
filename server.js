require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const tutorRoutes = require('./routes/tutorRoutes');
app.use('/api/tutor', tutorRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

const reviewRoutes = require('./routes/reviewRoute');
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes will go here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
