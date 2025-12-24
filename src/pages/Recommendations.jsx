import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const res = await axios.get('http://localhost:5000/api/jobs/recommendations/list', config);
                setRecommendations(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchRecommendations();
    }, [user]);

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>Analyzing your skills...</div>;

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Smart <span className="gradient-text">Job Recommendations</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Based on your skills: {user.skills?.join(', ') || 'Update your profile to get better matches'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {recommendations.length > 0 ? (
                    recommendations.map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ width: '50px', height: '50px', background: 'var(--surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {job.company?.name ? job.company.name[0] : '?'}
                                </div>
                                <div style={{ px: '1rem', py: '0.4rem', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                                    <FiTrendingUp /> {job.matchScore || 85}% Match
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                            <p style={{ color: 'var(--text)', marginBottom: '1.5rem', opacity: 0.8 }}>{job.company?.name || 'Unknown Company'}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontSize: '0.9rem', opacity: 0.8 }}>
                                    <FiMapPin /> {job.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontSize: '0.9rem', opacity: 0.8 }}>
                                    <FiBriefcase /> {job.type}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {job.skills.slice(0, 4).map(skill => (
                                        <span key={skill} style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', background: 'var(--surface)', borderRadius: '1rem' }}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                            >
                                View & Apply
                            </button>
                        </motion.div>
                    ))
                ) : (
                    <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No recommendations found yet. Start applying to see matches!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
