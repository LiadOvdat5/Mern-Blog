import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO)
    .then( () => { console.log('Connected to MongoDB') 
    }).catch( (err) => { console.log('Error:', err.message);
});

// Initialize express
const app = express();

// Allow express to parse incoming JSON data
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
} );


// Routes
app.use('/api/user', userRoutes); //test api route
app.use('/api/auth', authRoutes);


