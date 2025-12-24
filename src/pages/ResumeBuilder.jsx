import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiDownload, FiPlus, FiTrash2, FiAward } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const ResumeBuilder = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        summary: '',
        skills: [],
        experience: [],
        education: []
    });

    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill] });
            setNewSkill('');
        }
    };

    const removeSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('ats.builder')}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Create a keyword-optimized resume that beats the bots.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Editor Side */}
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        {[1, 2, 3].map(s => (
                            <div
                                key={s}
                                className={`step-indicator ${step === s ? 'active' : ''}`}
                                style={{ flex: 1, height: '4px', background: step >= s ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', position: 'relative' }}
                            >
                                <span style={{ position: 'absolute', top: '-25px', left: '0', fontSize: '0.8rem', color: step >= s ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold' }}>Step {s}</span>
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '2rem' }}>Personal Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="input-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                                    />
                                </div>
                                <div className="input-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                                    />
                                </div>
                                <div className="input-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>Professional Summary</label>
                                    <textarea
                                        rows="4"
                                        value={formData.summary}
                                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                        placeholder="Briefly describe your career goals and key achievements..."
                                        style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', resize: 'none' }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '2rem' }}>Skills & Expertise</h3>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill (e.g. Python, React)"
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                                />
                                <button onClick={addSkill} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}><FiPlus /></button>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {formData.skills.map(skill => (
                                    <span key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '2rem', fontSize: '0.9rem' }}>
                                        {skill}
                                        <FiTrash2 onClick={() => removeSkill(skill)} style={{ cursor: 'pointer', fontSize: '0.8rem' }} />
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ textAlign: 'center', padding: '2rem' }}>
                            <FiAward style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '2rem' }} />
                            <h3>Your Premium Resume is Ready!</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>We've optimized your details for high-performance ATS readability.</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button className="btn btn-primary" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FiDownload /> Download PDF</button>
                                <button className="btn btn-secondary" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FiSave /> Save to Profile</button>
                            </div>
                        </motion.div>
                    )}

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                        {step > 1 && <button onClick={() => setStep(step - 1)} className="btn btn-secondary">Previous</button>}
                        {step < 3 && <button onClick={() => setStep(step + 1)} className="btn btn-primary" style={{ marginLeft: 'auto' }}>Next Step</button>}
                    </div>
                </div>

                {/* Preview Side */}
                <div className="glass-card" style={{ padding: '4rem', background: 'white', color: '#1a1a1a', transform: 'scale(1)', transformOrigin: 'top center' }}>
                    <header style={{ borderBottom: '2px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
                        <h1 style={{ margin: '0', color: '#000', fontSize: '2.5rem' }}>{formData.name || 'YOUR NAME'}</h1>
                        <p style={{ margin: '0.5rem 0', color: '#666' }}>{formData.email || 'email@example.com'} | {formData.phone || '+91 98765 43210'}</p>
                    </header>
                    <section style={{ marginBottom: '2rem' }}>
                        <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Professional Summary</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{formData.summary || 'A results-driven professional with expertise in...'}</p>
                    </section>
                    <section style={{ marginBottom: '2rem' }}>
                        <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Skills</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
                            {formData.skills.map(s => <div key={s}>• {s}</div>)}
                            {formData.skills.length === 0 && <div>• Skill 1</div>}
                        </div>
                    </section>
                    <div style={{ marginTop: '4rem', textAlign: 'center', color: '#aaa', fontSize: '0.8rem' }}>--- End of Resume ---</div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
