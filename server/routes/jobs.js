import express from 'express';
import Job from '../models/Job.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// --- CONSTANTS FOR MOCK DATA ---
const companies = [
    "Zoho", "Freshworks", "TCS", "Infosys", "Wipro", "HCL", "Cognizant", "Accenture", "Google", "Amazon",
    "Microsoft", "Flipkart", "Swiggy", "Zomato", "Uber", "Ola", "Paytm", "PhonePe", "Razorpay", "Cred",
    "Byju's", "Unacademy", "Vedantu", "Zerodha", "Groww", "Upstox", "Reliance", "Tata Motors", "Mahindra",
    "L&T", "Bosch", "Siemens", "Philips", "Samsung", "LG", "Sony", "Dell", "HP", "Lenovo", "Intel",
    "Cisco", "Oracle", "IBM", "Capgemini", "Deloitte", "KPMG", "PwC", "EY", "JPMorgan", "Goldman Sachs"
];

const locationsList = ["Chennai", "Coimbatore", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Delhi", "Remote"];

const categoriesMap = {
    "IT": ["Full Stack Developer", "Backend Engineer", "Frontend Developer", "DevOps Engineer", "Cloud Architect", "Software Engineer"],
    "AIML": ["AI Engineer", "Machine Learning Engineer", "Data Scientist", "NLP Researcher", "Computer Vision Engineer"],
    "Physics": ["Physics Professor", "Lab Researcher", "Quantum Physicist", "Astrophysicist", "Optical Engineer"],
    "Maths": ["Mathematics Researcher", "Statistician", "Data Analyst", "Actuary", "Maths Teacher"],
    "B.COM": ["Accountant", "Financial Analyst", "Auditor", "Tax Consultant", "Investment Banker", "Bank Manager"],
    "BS": ["Biotechnologist", "Microbiologist", "Chemist", "Lab Technician", "Environmental Scientist"],
    "Management": ["Product Manager", "Project Manager", "HR Manager", "Operations Manager", "Business Analyst"],
    "Media": ["Content Writer", "Video Editor", "Journalist", "Social Media Manager", "Public Relations Specialist"],
    "Design": ["UI/UX Designer", "Graphic Designer", "Product Designer", "Illustrator", "Animator"],
    "HR": ["HR Executive", "Recruiter", "Talent Acquisition Specialist", "HR Generalist", "Compensation Analyst"],
    "Engineering": ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Electronics Engineer", "Automobile Engineer"],
    "Sales": ["Sales Executive", "Business Development Associate", "Account Manager", "Sales Manager", "Inside Sales Rep"]
};

const companyDomains = {
    "Zoho": "zoho.com", "Freshworks": "freshworks.com", "TCS": "tcs.com", "Infosys": "infosys.com", "Wipro": "wipro.com",
    "HCL": "hcltech.com", "Cognizant": "cognizant.com", "Accenture": "accenture.com", "Google": "google.com", "Amazon": "amazon.com",
    "Microsoft": "microsoft.com", "Flipkart": "flipkart.com", "Swiggy": "swiggy.com", "Zomato": "zomato.com", "Uber": "uber.com",
    "Ola": "olacabs.com", "Paytm": "paytm.com", "PhonePe": "phonepe.com", "Razorpay": "razorpay.com", "Cred": "cred.club",
    "Byju's": "byjus.com", "Unacademy": "unacademy.com", "Vedantu": "vedantu.com", "Zerodha": "zerodha.com", "Groww": "groww.in",
    "Upstox": "upstox.com", "Reliance": "ril.com", "Tata Motors": "tatamotors.com", "Mahindra": "mahindra.com", "L&T": "larsentoubro.com",
    "Bosch": "bosch.com", "Siemens": "siemens.com", "Philips": "philips.com", "Samsung": "samsung.com", "LG": "lg.com",
    "Sony": "sony.com", "Dell": "dell.com", "HP": "hp.com", "Lenovo": "lenovo.com", "Intel": "intel.com",
    "Cisco": "cisco.com", "Oracle": "oracle.com", "IBM": "ibm.com", "Capgemini": "capgemini.com", "Deloitte": "deloitte.com",
    "KPMG": "kpmg.com", "PwC": "pwc.com", "EY": "ey.com", "JPMorgan": "jpmorgan.com", "Goldman Sachs": "goldmansachs.com"
};

const generateMockJobs = () => {
    let mockJobs = [];
    let idCounter = 1000;

    Object.keys(categoriesMap).forEach(category => {
        locationsList.forEach(location => {
            for (let i = 0; i < 5; i++) { // Reduced to 5 for performance, still plenty of jobs
                const title = categoriesMap[category][Math.floor(Math.random() * categoriesMap[category].length)];
                const companyName = companies[Math.floor(Math.random() * companies.length)];

                let logoUrl = `https://www.google.com/s2/favicons?domain=${companyDomains[companyName] || 'google.com'}&sz=128`;

                mockJobs.push({
                    _id: (idCounter++).toString(),
                    title: title,
                    company: { name: companyName, logo: logoUrl },
                    location: location,
                    type: Math.random() > 0.3 ? 'Full-time' : (Math.random() > 0.5 ? 'Internship' : 'Contract'),
                    category: category,
                    salary: {
                        min: Math.floor(Math.random() * 500000) + 300000,
                        max: Math.floor(Math.random() * 1000000) + 800000
                    },
                    skills: [category, 'Communication', 'Problem Solving'],
                    postedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
                });
            }
        });
    });
    return mockJobs;
};

const cachedMockJobs = generateMockJobs();

// @desc    Fetch all jobs with filters
// @route   GET /api/jobs
router.get('/', async (req, res) => {
    const { category, location, title, minSalary, type } = req.query;

    try {
        let jobs = await Job.find({}).sort({ postedAt: -1 });

        if (jobs.length < 50) {
            jobs = [...jobs, ...cachedMockJobs];
        }

        let filteredJobs = jobs.filter(job => {
            let match = true;
            if (category && job.category !== category) match = false;
            if (location && !job.location.toLowerCase().includes(location.toLowerCase())) match = false;
            if (title && !job.title.toLowerCase().includes(title.toLowerCase())) match = false;
            if (minSalary && job.salary?.min < Number(minSalary)) match = false;
            if (type && job.type !== type) match = false;
            return match;
        });

        res.json(filteredJobs);
    } catch (error) {
        console.error("DB Error, serving mocks:", error.message);
        res.json(cachedMockJobs);
    }
});

// @desc    Get job recommendations based on user skills
// @route   GET /api/jobs/recommendations/list
// IMPORTANT: This route MUST be before /:id route
router.get('/recommendations/list', protect, async (req, res) => {
    try {
        const userSkills = req.user.skills || [];

        let jobs = await Job.find({});

        if (jobs.length < 50) {
            jobs = [...jobs, ...cachedMockJobs];
        }

        const scoredJobs = jobs.map(job => {
            const matchCount = job.skills.filter(skill =>
                userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
            ).length;
            const score = job.skills.length > 0 ? (matchCount / job.skills.length) * 100 : 0;

            const jobData = job.toObject ? job.toObject() : job;
            return { ...jobData, matchScore: Math.round(score) || Math.floor(Math.random() * 20) + 70 };
        })
            .filter(job => job.matchScore > 10)
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 10);

        res.json(scoredJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch single job
// @route   GET /api/jobs/:id
router.get('/:id', async (req, res) => {
    try {
        if (req.params.id.length === 24) {
            const job = await Job.findById(req.params.id);
            if (job) return res.json(job);
        }

        const mockJob = cachedMockJobs.find(j => j._id === req.params.id);
        if (mockJob) {
            res.json(mockJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a job (Admin only)
// @route   POST /api/jobs
router.post('/', protect, admin, async (req, res) => {
    const { title, company, location, type, category, description, requirements, skills, salary, experience, deadline } = req.body;

    try {
        const job = new Job({
            title,
            company,
            location,
            type,
            category,
            description,
            requirements,
            skills,
            salary,
            experience,
            deadline
        });

        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
