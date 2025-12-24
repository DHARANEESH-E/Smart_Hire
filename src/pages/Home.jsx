import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const Home = () => {
    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: 'absolute', top: '-40px', left: '-60px', width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), transparent)', opacity: 0.5, filter: 'blur(10px)' }}
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: 1.2, position: 'relative', zIndex: 1 }}
                    >
                        Find Your Dream Job in <br />
                        <span className="gradient-text">Tamil Nadu's Top Tech Hubs</span>
                    </motion.h1>
                    <motion.div
                        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: 'absolute', bottom: '0', right: '-40px', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(236, 72, 153, 0.3)', zIndex: 0 }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 3rem' }}
                >
                    Connecting talent with opportunity across IT, AIML, Physics, Maths, and Commerce.
                    Get smart job recommendations based on your skills and check your ATS score.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass-card"
                    style={{ maxWidth: '800px', margin: '0 auto', padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, paddingLeft: '1rem' }}>
                        <FiSearch style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                        <input
                            type="text"
                            placeholder="Job title, skills, or company"
                            style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', padding: '0.75rem 0' }}
                        />
                    </div>
                    <div style={{ height: '30px', width: '1px', background: 'var(--border)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 0.7, paddingLeft: '0.5rem' }}>
                        <FiMapPin style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                        <select style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', padding: '0.75rem 0', cursor: 'pointer' }}>
                            <option value="">All Locations</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Madurai">Madurai</option>
                        </select>
                    </div>
                    <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Search Jobs</Link>
                </motion.div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                {['AIML', 'IT', 'B.COM', 'Physics', 'Maths'].map((category, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="glass-card"
                        style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{category}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Explore specialized jobs</p>
                    </motion.div>
                ))}
            </section>

            <section className="glass-card" style={{ padding: '4rem', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Revolutionary <span className="gradient-text">ATS Resume Checker</span></h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Don't let recruiters skip your resume. Our advanced AI analyzes your resume against job descriptions
                        and gives you an ATS score with suggestions to improve.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <FiCheckCircle style={{ color: 'var(--success)' }} />
                            <span>Real-time skill matching analysis</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <FiCheckCircle style={{ color: 'var(--success)' }} />
                            <span>Personalized improvement suggestions</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <FiCheckCircle style={{ color: 'var(--success)' }} />
                            <span>Increase interview callbacks by 3x</span>
                        </div>
                    </div>
                    <Link to="/signup" className="btn btn-primary" style={{ marginTop: '2.5rem' }}>Get Started Free</Link>
                </div>
                <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                    <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '400px', background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)' }}>85%</div>
                            <div style={{ color: 'var(--text-muted)' }}>ATS Score</div>
                        </div>
                        <div style={{ height: '8px', background: 'var(--background)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
                            <div style={{ width: '85%', height: '100%', background: 'var(--success)' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text)' }}>
                                ✅ Found "React.js" in resume
                            </div>
                            <div style={{ padding: '1rem', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text)' }}>
                                ✅ Found "Node.js" in resume
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--error)' }}>
                                ❌ Missing "Docker" experience
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
