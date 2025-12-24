import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImage: { type: String },
    resume: { type: String }, // Path to resume file
    bio: { type: String },
    skills: [{ type: String }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }],
    education: [{
        institution: String,
        degree: String,
        year: String
    }],
    appliedJobs: [{
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        appliedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['applied', 'reviewed', 'shortlisted', 'rejected'], default: 'applied' },
        atsScore: Number
    }],
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
