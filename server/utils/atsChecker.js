import pdf from 'pdf-parse/lib/pdf-parse.js';
const pdfParse = pdf;
import fs from 'fs';

/**
 * Basic ATS Matcher Utility
 * This compares resume text against job requirements/skills
 */
export const checkATS = async (resumePath, jobRequirements, jobSkills) => {
    try {
        const dataBuffer = fs.readFileSync(resumePath);
        let text = '';

        try {
            const data = await pdfParse(dataBuffer);
            text = (data.text || '').toLowerCase();
        } catch (pdfError) {
            // If PDF parsing fails, try reading as plain text (useful for demo/testing)
            text = dataBuffer.toString().toLowerCase();
        }

        if (!text) {
            text = dataBuffer.toString().toLowerCase();
        }

        const matchingSkills = [];
        const missingSkills = [];

        // Check Skills
        jobSkills.forEach(skill => {
            if (text.includes(skill.toLowerCase())) {
                matchingSkills.push(skill);
            } else {
                missingSkills.push(skill);
            }
        });

        // Check Requirements (simplified)
        let reqMatches = 0;
        jobRequirements.forEach(req => {
            if (text.includes(req.toLowerCase().split(' ').slice(0, 2).join(' '))) {
                reqMatches++;
            }
        });

        const skillScore = jobSkills.length > 0 ? (matchingSkills.length / jobSkills.length) * 70 : 0;
        const reqScore = jobRequirements.length > 0 ? (reqMatches / jobRequirements.length) * 30 : 0;

        const totalScore = Math.round(skillScore + reqScore);

        // Generate suggestions
        const suggestions = [];
        if (missingSkills.length > 0) {
            suggestions.push(`Consider adding these missing skills: ${missingSkills.join(', ')}`);
        }
        if (totalScore < 60) {
            suggestions.push("Focus on tailoring your experience to match the specific job requirements.");
        }

        return {
            score: totalScore,
            matchingSkills,
            missingSkills,
            suggestions
        };
    } catch (error) {
        console.error('ATS Check Error:', error);
        return {
            score: 0,
            matchingSkills: [],
            missingSkills: [],
            suggestions: ["Failed to parse resume. Please ensure it is a valid PDF."]
        };
    }
};
