import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiCheckCircle, FiAlertCircle, FiAward, FiFileText } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const ATSScanner = () => {
    const { t } = useLanguage();
    const [file, setFile] = useState(null);
    const [jobDesc, setJobDesc] = useState('');
    const [skills, setSkills] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleScan = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please upload a resume (PDF)');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDesc);
        formData.append('jobSkills', skills);

        try {
            const res = await axios.post('http://localhost:5000/api/ats/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('ats.checker')}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Optimize your resume to beat the Applicant Tracking Systems.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '3rem', maxWidth: result ? '1200px' : '700px', margin: '0 auto' }}>
                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: '3rem' }}
                >
                    <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '1rem',
                                padding: '3rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: file ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => document.getElementById('resume-upload').click()}
                        >
                            <input
                                type="file"
                                id="resume-upload"
                                accept=".pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <FiUpload style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                {file ? file.name : 'Upload Resume (PDF)'}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click to browse or drag file here</p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Job Description</label>
                            <textarea
                                rows="5"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                                placeholder="Paste the job description here..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Skills (Comma Separated)</label>
                            <input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="e.g. React, Node.js, Python"
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                            />
                        </div>

                        {error && (
                            <div style={{ padding: '1rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiAlertCircle /> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}
                        >
                            {loading ? t('common.loading') : 'Scan Resume'}
                        </button>
                    </form>
                </motion.div>

                {/* Results Section */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ padding: '3rem' }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ marginBottom: '2rem' }}>{t('ats.score')}</h2>
                            <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
                                <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                    <circle cx="100" cy="100" r="90" fill="transparent" stroke="var(--surface)" strokeWidth="12" />
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="90"
                                        fill="transparent"
                                        stroke={result.score > 70 ? 'var(--success)' : result.score > 40 ? 'var(--warning)' : 'var(--error)'}
                                        strokeWidth="12"
                                        strokeDasharray={565.48}
                                        strokeDashoffset={565.48 * (1 - result.score / 100)}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                                    />
                                </svg>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>{result.score}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>/ 100</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiCheckCircle style={{ color: 'var(--success)' }} /> Matching Skills
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {result.matchingSkills.length > 0 ? result.matchingSkills.map(skill => (
                                    <span key={skill} style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '2rem', fontSize: '0.9rem' }}>
                                        {skill}
                                    </span>
                                )) : <p style={{ color: 'var(--text-muted)' }}>No skills matched exactly.</p>}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiAlertCircle style={{ color: 'var(--error)' }} /> Missing Key Skills
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {result.missingSkills.length > 0 ? result.missingSkills.map(skill => (
                                    <span key={skill} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '2rem', fontSize: '0.9rem' }}>
                                        {skill}
                                    </span>
                                )) : <p style={{ color: 'var(--text-muted)' }}>No critical skills missing!</p>}
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiAward style={{ color: 'var(--warning)' }} /> Suggestions
                            </h3>
                            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {result.suggestions.map((rec, i) => (
                                    <li key={i} style={{ color: 'var(--text)', lineHeight: 1.6 }}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ATSScanner;
