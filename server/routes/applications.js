import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { checkATS } from '../utils/atsChecker.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const filetypes = /pdf|doc|docx|txt/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Resumes must be PDF, Word, or Text documents!'));
        }
    }
});

// @desc    Apply for a job
// @route   POST /api/applications
router.post('/', protect, upload.single('resume'), async (req, res) => {
    const { jobId, coverLetter } = req.body;

    try {
        // --- HANDLE MOCK USER ---
        if (req.user._id === 'mockuser123') {
            if (!req.file) {
                return res.status(400).json({ message: 'Please upload a resume' });
            }

            // Run ATS Check
            const atsResult = await checkATS(req.file.path, ['React', 'Node.js'], ['React', 'Node.js', 'JavaScript']);

            // Return mock application response
            return res.status(201).json({
                _id: 'mock-app-' + Date.now(),
                user: req.user._id,
                job: jobId,
                resume: req.file.path,
                coverLetter,
                status: 'applied',
                atsScore: atsResult.score,
                atsAnalysis: {
                    matchingSkills: atsResult.matchingSkills,
                    missingSkills: atsResult.missingSkills,
                    suggestions: atsResult.suggestions
                },
                appliedAt: new Date(),
                message: 'Application submitted successfully! (Demo mode)'
            });
        }

        // --- REAL USER FLOW ---
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user already applied
        const existingApplication = await Application.findOne({ user: req.user._id, job: jobId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume' });
        }

        // Run ATS Check
        const atsResult = await checkATS(req.file.path, job.requirements, job.skills);

        const application = await Application.create({
            user: req.user._id,
            job: jobId,
            resume: req.file.path,
            coverLetter,
            atsScore: atsResult.score,
            atsAnalysis: {
                matchingSkills: atsResult.matchingSkills,
                missingSkills: atsResult.missingSkills,
                suggestions: atsResult.suggestions
            }
        });

        // Update user's appliedJobs
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                appliedJobs: {
                    job: jobId,
                    atsScore: atsResult.score
                }
            },
            // Update user's resume field to latest
            resume: req.file.path
        });

        // Increment job's applicant count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

        res.status(201).json(application);
    } catch (error) {
        console.error('Application error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
router.get('/my-applications', protect, async (req, res) => {
    try {
        // --- HANDLE MOCK USER ---
        if (req.user._id === 'mockuser123') {
            // Return mock applications
            return res.json([
                {
                    _id: 'mock-app-1',
                    job: {
                        _id: '1001',
                        title: 'Full Stack Developer',
                        company: { name: 'Zoho', logo: 'https://www.google.com/s2/favicons?domain=zoho.com&sz=128' },
                        location: 'Chennai',
                        type: 'Full-time'
                    },
                    status: 'applied',
                    atsScore: 85,
                    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
                },
                {
                    _id: 'mock-app-2',
                    job: {
                        _id: '1002',
                        title: 'React Developer',
                        company: { name: 'Freshworks', logo: 'https://www.google.com/s2/favicons?domain=freshworks.com&sz=128' },
                        location: 'Chennai',
                        type: 'Full-time'
                    },
                    status: 'reviewed',
                    atsScore: 92,
                    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
                }
            ]);
        }

        // --- REAL USER FLOW ---
        const applications = await Application.find({ user: req.user._id })
            .populate('job')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
