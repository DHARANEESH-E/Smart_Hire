import express from 'express';
import upload from '../middleware/upload.js';
import { checkATS } from '../utils/atsChecker.js';
import Job from '../models/Job.js';
import fs from 'fs';

const router = express.Router();

// @desc    Analyze resume against a job or manual description
// @route   POST /api/ats/analyze
router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume (PDF)' });
        }

        const { jobId, jobDescription, jobSkills } = req.body;
        let requirements = [];
        let skills = [];

        // Determine what to check against
        if (jobId && jobId !== 'undefined' && jobId !== 'null') {
            try {
                // Use a short timeout to prevent hanging if DB is buffering
                const job = await Job.findById(jobId).maxTimeMS(2000);
                if (job) {
                    requirements = job.requirements || [];
                    skills = job.skills || [];
                }
            } catch (dbErr) {
                console.warn('DB issue during ATS scan, falling back to manual input');
            }
        }

        // Manual input / Fallback enhancement
        if (jobDescription) {
            requirements.push(jobDescription);
        }

        if (jobSkills) {
            try {
                // Handle both JSON array string and comma-separated string
                const parsedSkills = JSON.parse(jobSkills);
                skills = Array.isArray(parsedSkills) ? [...new Set([...skills, ...parsedSkills])] : skills;
            } catch (e) {
                const splitSkills = jobSkills.split(',').map(s => s.trim()).filter(s => s);
                skills = [...new Set([...skills, ...splitSkills])];
            }
        }

        // Run Analysis
        const analysis = await checkATS(req.file.path, requirements, skills);

        // Delete file after processing
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.json(analysis);

    } catch (error) {
        console.error('ATS Analysis error:', error);
        // Cleanup file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message || 'ATS Analysis failed' });
    }
});

export default router;
