import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Application from './models/Application.js';
import User from './models/User.js';

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hiresmart');
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log(`Users count: ${users.length}`);

        const applications = await Application.find({}).populate('user').populate('job');
        console.log(`Applications count: ${applications.length}`);

        applications.forEach(app => {
            console.log(`Application: User ${app.user?.email} -> Job ${app.job?.title}`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
