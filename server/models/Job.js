import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: {
        name: { type: String, required: true },
        logo: String,
        website: String,
        description: String
    },
    location: { type: String, required: true }, // e.g., "Chennai, TN", "Coimbatore, TN"
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    category: { type: String, enum: ['AIML', 'B.COM', 'IT', 'Physics', 'Maths'], required: true },
    description: { type: String, required: true },
    requirements: [String],
    skills: [{ type: String }],
    salary: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'INR' }
    },
    experience: { type: String }, // e.g., "0-2 years", "3-5 years"
    postedAt: { type: Date, default: Date.now },
    deadline: Date,
    applicantsCount: { type: Number, default: 0 }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
