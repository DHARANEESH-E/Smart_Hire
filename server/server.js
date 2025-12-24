import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import atsRoutes from './routes/ats.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hiresmart';

import User from './models/User.js';

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 2000, // Fail fast (2s) if DB is not running
})
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        // Seed User if none exists
        try {
            const userCount = await User.countDocuments();
            if (userCount === 0) {
                await User.create({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    role: 'user',
                    skills: ['React', 'Node.js', 'Digital Marketing']
                });
                console.log('\n' + '='.repeat(50));
                console.log('✅ SEED DATA CREATED');
                console.log('Email: test@example.com');
                console.log('Password: password123');
                console.log('='.repeat(50) + '\n');
            }
        } catch (err) {
            console.error('Error seeding user:', err.message);
        }
    })
    .catch((err) => {
        console.error('\n' + '='.repeat(50));
        console.error('❌ MONGODB CONNECTION ERROR');
        console.error('='.repeat(50));
        console.error(`Error details: ${err.message}`);
        console.error('\nTROUBLESHOOTING STEPS:');
        console.error('1. Is MongoDB installed? (https://www.mongodb.com/try/download/community)');
        console.error('2. Is the MongoDB service RUNNING? (Check Services.msc on Windows)');
        console.error('3. Is the connection string correct in server/.env?');
        console.error('='.repeat(50) + '\n');

        // Don't exit immediately so the user can see the error in the console
        console.log('Server process will wait for you to fix the database issue...');
    });

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('HireSmart API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ats', atsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
