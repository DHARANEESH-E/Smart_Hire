import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from '../components/CompanyLogo';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        title: ''
    });
    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.location) params.append('location', filters.location);
            if (filters.title) params.append('title', filters.title);

            const res = await axios.get(`http://localhost:5000/api/jobs?${params.toString()}`);
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const categories = ['AIML', 'IT', 'B.COM', 'Physics', 'Maths'];
    const locations = ['Chennai', 'Coimbatore', 'Madurai', 'Hosur'];

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2.5rem' }}>
                {/* Filters Sidebar */}
                <aside>
                    <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '7rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiBriefcase /> Filters
                        </h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text)', fontWeight: '500' }}>Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text)', fontWeight: '500' }}>Location</label>
                            <select
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                            >
                                <option value="">All Locations</option>
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>

                        <button
                            onClick={() => setFilters({ category: '', location: '', title: '' })}
                            className="btn btn-outline"
                            style={{ width: '100%', fontSize: '0.9rem' }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* Job Listings */}
                <main>
                    <div className="glass-card" style={{ padding: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiSearch style={{ marginLeft: '1rem', color: 'var(--primary)' }} />
                        <input
                            type="text"
                            placeholder="Search by job title or keywords..."
                            value={filters.title}
                            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                            style={{ border: 'none', background: 'transparent', color: 'var(--text)', padding: '1rem', outline: 'none', flex: 1 }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="glass-card" style={{ height: '150px', animate: 'pulse' }}></div>
                            ))
                        ) : jobs.length > 0 ? (
                            <AnimatePresence>
                                {jobs.map((job, index) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="glass-card"
                                        style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                    >
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '60px', background: 'var(--surface-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                                <CompanyLogo company={job.company} size="100%" />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text)' }}>{job.title}</h4>
                                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        {job.company?.name || 'Top Company'}
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <FiMapPin /> {job.location}
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <FiBriefcase /> {job.type}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                                                    {job.skills?.slice(0, 3).map(skill => (
                                                        <span key={skill} style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {job.skills?.length > 3 && <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', color: 'var(--text-muted)' }}>+{job.skills.length - 3} more</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                                                ₹ {(job.salary?.min || 0) / 100000}L - {(job.salary?.max || 0) / 100000}L
                                            </div>
                                            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                                                View Details
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No jobs found matching your criteria. Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Jobs;
