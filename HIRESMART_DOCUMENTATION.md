# HIRESMART - PROJECT DOCUMENTATION

## ABSTRACT

**HireSmart** is a modern, full-stack (MERN) job portal and talent management platform specifically designed to bridge the gap between job seekers and employers in Tamil Nadu's burgeoning tech hubs. The platform goes beyond traditional job boards by integrating advanced features such as an **AI-powered ATS Resume Checker**, **Integrated Skill Assessments**, and **Multi-language support** (English, Tamil, and Hindi). 

Built with scalability and user experience in mind, HireSmart provides a seamless interface for students to find internships and college events while offering professionals a robust ecosystem for career growth. The platform utilizes a responsive React frontend, a flexible Node/Express API, and a MongoDB database for high-performance data management.

---

## TABLE OF CONTENTS

1. [Abstract](#abstract)
2. [Technology Stack](#technology-stack)
3. [Core Features](#core-features)
4. [Website Architecture & Coding](#website-architecture--coding)
    - [Backend Entry Point](#backend-entry-point)
    - [Authentication Logic](#authentication-logic)
    - [ATS Analysis Algorithm](#ats-analysis-algorithm)
5. [Webpages & User Interface](#webpages--user-interface)
    - [Home Dashboard](#home-dashboard)
    - [Job Search Interface](#job-search-interface)
    - [Skill Assessment Portal](#skill-assessment-portal)
    - [ATS Resume Scanner](#ats-resume-scanner)
6. [Conclusion](#conclusion)

---

## TECHNOLOGY STACK

HireSmart utilizes the industry-standard **MERN Stack** to ensure high performance and maintainability:

- **Frontend**: React.js with Vite, Framer Motion (for animations), and Tailwind-inspired CSS.
- **Backend**: Node.js and Express.js RESTful API.
- **Database**: MongoDB with Mongoose ODM for flexible schema management.
- **State Management**: React Context API for Global Auth and Theme state.
- **Tools**: Axios for HTTP requests, JWT for secure authentication, and pdf-parse for resume analysis.

---

## CORE FEATURES

- 🚀 **Advanced Job Filtering**: Search jobs by category, location, and salary with a massive mock dataset support for demonstration.
- 📄 **AI-ATS Resume Checker**: Upload PDF resumes to get instant scores and improvement suggestions based on job requirements.
- 🎓 **Student Modules**: Dedicated sections for Internships and College Events to support early-career growth.
- 🌍 **Linguistic Diversity**: Full support for Tamil, Hindi, and English to ensure accessibility across regions.
- 💡 **Skill Assessments**: Interactive quizzes for React, Node.js, and Aptitude to help users verify their skills.

---

## WEBSITE ARCHITECTURE & CODING

### Backend Entry Point
The server uses **Express.js** with **ES Modules** for a clean, modern architecture.

```javascript
/* server/server.js snippet */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ats', atsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Error:', err));
```

### Authentication Logic
Secure authentication is handled via JWT (JSON Web Tokens) and stored in local storage for a persistent session.

```javascript
/* src/contexts/AuthContext.jsx snippet */
const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
};
```

### ATS Analysis Algorithm
The platform performs text extraction from PDF files and compares keyword frequency and relevance against job descriptions.

```javascript
/* server/utils/atsChecker.js snippet */
export const checkATS = async (resumePath, jobRequirements, jobSkills) => {
    const dataBuffer = fs.readFileSync(resumePath);
    const data = await pdfParse(dataBuffer); // Extracts raw text
    const text = data.text.toLowerCase();
    
    // Match skills and calculate score
    const matchingSkills = jobSkills.filter(skill => text.includes(skill.toLowerCase()));
    const score = (matchingSkills.length / jobSkills.length) * 100;
    
    return { score, matchingSkills };
};
```

---

## WEBPAGES & USER INTERFACE

### Home Dashboard
A premium, animated landing page featuring a sticky navigation bar with light/dark mode and language selection.
![Home Page](file:///C:/Users/karth/.gemini/antigravity/brain/21e32bcc-6756-46ca-b93a-909752295580/home_page_1766215899917.png)

### Job Search Interface
A functional search portal with real-time filtering and high-quality company logos fetched via active APIs.
![Jobs Page](file:///C:/Users/karth/.gemini/antigravity/brain/21e32bcc-6756-46ca-b93a-909752295580/jobs_page_1766215926064.png)

### Skill Assessment Portal
An interactive testing area where candidates can earn digital certifications for their tech skills.
![Skill Assessment](file:///C:/Users/karth/.gemini/antigravity/brain/21e32bcc-6756-46ca-b93a-909752295580/skill_assessment_page_1766216033265.png)

### ATS Resume Scanner
The crown jewel of the platform—a tool that allows users to optimize their resumes for automated recruiting systems.
![ATS Scanner](file:///C:/Users/karth/.gemini/antigravity/brain/21e32bcc-6756-46ca-b93a-909752295580/ats_scanner_page_1766216057841.png)

---

## CONCLUSION

HireSmart is a comprehensive solution for the modern job market. By combining traditional recruitment tools with AI evaluation and multilingual support, it provides a uniquely powerful platform for both localized and global talent management.
