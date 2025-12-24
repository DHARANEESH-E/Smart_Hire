import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/Job.js';

dotenv.config({ path: './.env' });

const jobs = [
    {
        title: 'AI/ML Engineer',
        company: {
            name: 'Zoho Corporation',
            logo: 'https://logo.clearbit.com/zoho.com',
            website: 'https://www.zoho.com',
            description: 'Zoho is a leading Indian technology company.'
        },
        location: 'Chennai, TN',
        type: 'Full-time',
        category: 'AIML',
        description: 'We are looking for an AI/ML Engineer to join our research team in Chennai. You will work on NLP and Computer Vision projects.',
        requirements: [
            'Strong knowledge of Python and PyTorch/TensorFlow',
            'Experience with deep learning models',
            'Understanding of NLP techniques',
            'Good mathematical background'
        ],
        skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow'],
        salary: { min: 800000, max: 1500000 },
        experience: '1-3 years',
        deadline: new Date('2026-01-30')
    },
    {
        title: 'Full Stack Developer',
        company: {
            name: 'Freshworks',
            logo: 'https://logo.clearbit.com/freshworks.com',
            website: 'https://www.freshworks.com',
            description: 'Freshworks makes software that your teams will actually love.'
        },
        location: 'Chennai, TN',
        type: 'Full-time',
        category: 'IT',
        description: 'Join our engineering team to build world-class SaaS products. Use React, Node.js and Ruby on Rails.',
        requirements: [
            "Proficiency in React and Node.js",
            "Experience with PostgreSQL",
            "Knowledge of cloud platforms (AWS)",
            "Strong problem-solving skills"
        ],
        skills: ['React', 'Node.js', 'JavaScript', 'AWS', 'PostgreSQL'],
        salary: { min: 600000, max: 1200000 },
        experience: '2-4 years',
        deadline: new Date('2026-02-15')
    },
    {
        title: 'Accountant',
        company: {
            name: 'TVS Motors',
            logo: 'https://logo.clearbit.com/tvsmotor.com',
            website: 'https://www.tvsmotor.com',
            description: 'TVS Motor Company is a reputed two and three-wheeler manufacturer.'
        },
        location: 'Hosur, TN',
        type: 'Full-time',
        category: 'B.COM',
        description: 'We are seeking a qualified accountant to manage financial records and tax filings at our Hosur plant.',
        requirements: [
            'B.Com or M.Com degree',
            'Knowledge of Tally and GST',
            'Experience in industrial accounting',
            'Good communication skills'
        ],
        skills: ['Accounting', 'Tally', 'GST', 'Financing', 'Excel'],
        salary: { min: 400000, max: 700000 },
        experience: '2-5 years',
        deadline: new Date('2026-01-20')
    },
    {
        title: 'Physics Researcher',
        company: {
            name: 'IIT Madras Research Park',
            logo: 'https://logo.clearbit.com/iitmrp.com',
            website: 'https://respark.iitm.ac.in/',
            description: 'IIT Madras Research Park is where technology meets innovation.'
        },
        location: 'Chennai, TN',
        type: 'Contract',
        category: 'Physics',
        description: 'Work on cutting edge quantum physics research projects.',
        requirements: [
            'Master/PhD in Physics',
            'Strong research background',
            'Experience with lab equipment',
            'Analytical mindset'
        ],
        skills: ['Quantum Mechanics', 'Optics', 'Lab Testing', 'Research', 'Mathematics'],
        salary: { min: 500000, max: 900000 },
        experience: '0-2 years',
        deadline: new Date('2026-03-01')
    },
    {
        title: 'Mathematics Faculty',
        company: {
            name: 'Amrita Vishwa Vidyapeetham',
            logo: 'https://logo.clearbit.com/amrita.edu',
            website: 'https://www.amrita.edu',
            description: 'Amrita is a world-class university based in Coimbatore.'
        },
        location: 'Coimbatore, TN',
        type: 'Full-time',
        category: 'Maths',
        description: 'We are looking for passionate Mathematics teachers for our Coimbatore campus.',
        requirements: [
            'MSc/PhD in Mathematics',
            'Previous teaching experience',
            'NET/SET qualified preferred',
            'Active researcher'
        ],
        skills: ['Calculus', 'Linear Algebra', 'Teaching', 'Statistics', 'Mathematics'],
        salary: { min: 450000, max: 1000000 },
        experience: '3-7 years',
        deadline: new Date('2026-02-28')
    },
    {
        title: 'Software Engineer (Java)',
        company: {
            name: 'TCS',
            logo: 'https://logo.clearbit.com/tcs.com',
            website: 'https://www.tcs.com',
            description: 'Tata Consultancy Services is a global leader in IT services.'
        },
        location: 'Chennai, TN',
        type: 'Full-time',
        category: 'IT',
        description: 'Entry-level software engineering positions in our Chennai delivery centers.',
        requirements: [
            'B.E/B.Tech in CSE/IT',
            'Good understanding of Core Java',
            'Willingness to learn new tech',
            'Problem solving aptitude'
        ],
        skills: ['Java', 'SQL', 'Git', 'Data Structures', 'Spring Boot'],
        salary: { min: 350000, max: 550000 },
        experience: '0-1 years',
        deadline: new Date('2026-04-10')
    }
];

const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hiresmart';
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding');

        await Job.deleteMany({});
        console.log('🗑️ Deleted old jobs');

        await Job.insertMany(jobs);
        console.log('🌱 Seeded jobs successfully');

        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedDB();
