import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SuccessAnimation from '../components/SuccessAnimation';

const Internships = () => {
    const { t } = useLanguage();
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock data for immediate visual gratification if API is empty/slow
    const mockInternships = [
        {
            _id: '201',
            title: 'React Frontend Intern',
            company: { name: 'TechCorp', logo: '' },
            location: 'Chennai',
            category: 'Development',
            duration: '3 Months',
            salary: { min: 15000, max: 20000 }
        },
        {
            _id: '202',
            title: 'UI/UX Design Intern',
            company: { name: 'CreativeStudio', logo: '' },
            location: 'Remote',
            category: 'Design',
            duration: '6 Months',
            salary: { min: 10000, max: 15000 }
        },
        {
            _id: '203',
            title: 'Data Science Intern',
            company: { name: 'DataFlow', logo: '' },
            location: 'Bangalore',
            category: 'Data',
            duration: '2 Months',
            salary: { min: 20000, max: 25000 }
        },
        {
            _id: '204',
            title: 'Digital Marketing Intern',
            company: { name: 'BrandBoost', logo: '' },
            location: 'Coimbatore',
            category: 'Marketing',
            duration: '3 Months',
            salary: { min: 8000, max: 12000 }
        },
        {
            _id: '205',
            title: 'Cybersecurity Intern',
            company: { name: 'SecureNet', logo: '' },
            location: 'Chennai',
            category: 'Security',
            duration: '6 Months',
            salary: { min: 18000, max: 25000 }
        },
        {
            _id: '206',
            title: 'Content Writing Intern',
            company: { name: 'WordSmiths', logo: '' },
            location: 'Madurai',
            category: 'Content',
            duration: '2 Months',
            salary: { min: 5000, max: 10000 }
        },
        {
            _id: '207',
            title: 'Mobile App Dev Intern',
            company: { name: 'Appify', logo: '' },
            location: 'Remote',
            category: 'Development',
            duration: '4 Months',
            salary: { min: 12000, max: 18000 }
        },
        {
            _id: '208',
            title: 'HR Intern',
            company: { name: 'PeopleFirst', logo: '' },
            location: 'Chennai',
            category: 'HR',
            duration: '3 Months',
            salary: { min: 10000, max: 12000 }
        }
    ];

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                // Try fetching real data, fall back to mock if empty
                const res = await axios.get('http://localhost:5000/api/jobs?type=Internship');
                if (res.data.length > 0) {
                    setInternships(res.data);
                } else {
                    setInternships(mockInternships);
                }
            } catch (err) {
                console.error(err);
                setInternships(mockInternships);
            } finally {
                setLoading(false);
            }
        };
        fetchInternships();
    }, []);

    const handleApply = (e) => {
        e.preventDefault(); // Prevent navigation for demo
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Auto close after 3s
    };

    return (
        <div className="container" style={{ paddingTop: '3rem' }}>
            <SuccessAnimation isOpen={showSuccess} onClose={() => setShowSuccess(false)} message="Internship Applied Successfully!" />

            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('nav.internships')}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Gain hands-on experience at top companies in Tamil Nadu.</p>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>{t('common.loading')}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {internships.map((internship, index) => (
                        <motion.div
                            key={internship._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ width: '60px', height: '60px', background: 'var(--surface-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                    {internship.company?.logo ? <img src={internship.company.logo} alt={internship.company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : (internship.company?.name ? internship.company.name[0] : '?')}
                                </div>
                                <span style={{ padding: '0.4rem 0.8rem', borderRadius: '2rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '600', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                    {internship.category}
                                </span>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{internship.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{internship.company?.name || 'Partner Company'}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiMapPin /> {internship.location}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiClock /> {internship.duration || '3-6 Months'}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiBriefcase /> ₹{(internship.salary?.min || 0) / 1000}k - ₹{(internship.salary?.max || 0) / 1000}k</span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                <Link to={`/jobs/${internship._id}`} className="btn btn-outline" style={{ flex: 1, textAlign: 'center', padding: '0.8rem' }}>
                                    {t('common.viewDetails')}
                                </Link>
                                <button onClick={handleApply} className="btn btn-primary" style={{ flex: 1, textAlign: 'center', padding: '0.8rem' }}>
                                    {t('common.applyNow')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Internships;
