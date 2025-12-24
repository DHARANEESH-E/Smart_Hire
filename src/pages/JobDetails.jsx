import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiDollarSign, FiCalendar, FiClock, FiCheckCircle, FiUpload, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import CompanyLogo from '../components/CompanyLogo';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setIsApplying(true);
        const formData = new FormData();
        formData.append('jobId', id);
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post('http://localhost:5000/api/applications', formData, config);

            // Artificial delay for stunning animation feel
            setTimeout(() => {
                setIsApplying(false);
                setApplied(true);
                setTimeout(() => setShowApplyModal(false), 3000);
            }, 1500);
        } catch (err) {
            alert(err.response?.data?.message || 'Application failed');
            setIsApplying(false);
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>Loading job details...</div>;
    if (!job) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>Job not found</div>;

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '3rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ width: '100px', height: '100px', background: 'var(--background)', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <CompanyLogo company={job.company} size="100%" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{job.title}</h1>
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiBriefcase /> {job.company.name}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiMapPin /> {job.location}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiClock /> {job.type}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>₹ {job.salary.min / 100000}L - {job.salary.max / 100000}L</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowApplyModal(true)} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Apply Now
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', padding: '3rem' }}>
                    <div>
                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Description</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>{job.description}</p>
                        </section>

                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Requirements</h3>
                            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {job.requirements.map((req, i) => (
                                    <li key={i} style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{req}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Skills Required</h3>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {job.skills.map(skill => (
                                    <span key={skill} style={{ padding: '0.6rem 1.2rem', borderRadius: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '1rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside>
                        <div className="glass-card" style={{ padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Job Overview</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '0.75rem' }}><FiCalendar /></div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted Date</div>
                                        <div style={{ fontWeight: 500 }}>{new Date(job.postedAt).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '0.75rem' }}><FiClock /></div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Experience</div>
                                        <div style={{ fontWeight: 500 }}>{job.experience}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '0.75rem' }}><FiCheckCircle /></div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applicants</div>
                                        <div style={{ fontWeight: 500 }}>{job.applicantsCount} already applied</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--background)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                <h4 style={{ marginBottom: '0.75rem' }}>About {job.company.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{job.company.description}</p>
                                <a href={job.company.website} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>Visit Website</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {showApplyModal && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isApplying && !applied && setShowApplyModal(false)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass-card"
                            style={{ position: 'relative', width: '100%', maxWidth: '600px', padding: '3rem', background: 'var(--background)' }}
                        >
                            {!applied ? (
                                <>
                                    <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}><FiX /></button>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Apply for <span className="gradient-text">{job.title}</span></h2>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Upload your resume and tell us why you're a good fit.</p>

                                    <form onSubmit={handleApply}>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <label style={{ fontWeight: 500 }}>Resume (PDF/DOCX)</label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const blob = new Blob(['Demo resume content for testing purposes. Skills: React, Node.js, JavaScript, MongoDB.'], { type: 'text/plain' });
                                                        const file = new File([blob], 'demo_resume.txt', { type: 'text/plain' });
                                                        setResume(file);
                                                    }}
                                                    style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}
                                                >
                                                    Use Demo Resume
                                                </button>
                                            </div>
                                            <div
                                                style={{ border: resume ? '2px solid var(--success)' : '2px dashed var(--border)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                onClick={() => document.getElementById('resume-upload').click()}
                                            >
                                                <FiUpload style={{ fontSize: '2rem', color: resume ? 'var(--success)' : 'var(--primary)', marginBottom: '1rem' }} />
                                                <p>{resume ? resume.name : 'Click to upload your resume'}</p>
                                                <input
                                                    id="resume-upload"
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => setResume(e.target.files[0])}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '2.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>Cover Letter (Optional)</label>
                                            <textarea
                                                rows="4"
                                                value={coverLetter}
                                                onChange={(e) => setCoverLetter(e.target.value)}
                                                placeholder="Write a brief cover letter..."
                                                style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', resize: 'none' }}
                                            />
                                        </div>

                                        <button type="submit" disabled={isApplying || !resume} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                                            {isApplying ? 'Processing...' : 'Submit Application'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="success-pop"
                                        style={{ width: '100px', height: '100px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white', fontSize: '3rem' }}
                                    >
                                        <FiCheckCircle />
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
                                    >
                                        Successfully Applied!
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}
                                    >
                                        Your application for <span style={{ color: 'var(--text)' }}>{job.title}</span> has been sent to <span style={{ color: 'var(--text)' }}>{job.company.name}</span>.
                                        You can track your application in your profile.
                                    </motion.p>

                                    {/* Confetti-like elements */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 1, x: 0, y: 0 }}
                                            animate={{
                                                opacity: 0,
                                                x: (Math.random() - 0.5) * 400,
                                                y: (Math.random() - 0.5) * 400,
                                                rotate: Math.random() * 360
                                            }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '40%',
                                                width: '10px',
                                                height: '10px',
                                                background: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)',
                                                borderRadius: '2px'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobDetails;
