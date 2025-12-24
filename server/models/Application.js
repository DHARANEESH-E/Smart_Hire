import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resume: { type: String, required: true }, // Path to the resume used for this application
    coverLetter: String,
    status: {
        type: String,
        enum: ['applied', 'reviewed', 'shortlisted', 'rejected'],
        default: 'applied'
    },
    atsScore: { type: Number, default: 0 },
    atsAnalysis: {
        matchingSkills: [String],
        missingSkills: [String],
        suggestions: [String],
        experienceMatch: Boolean
    },
    appliedAt: { type: Date, default: Date.now }
});

// Ensure a user can only apply once to the same job
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
