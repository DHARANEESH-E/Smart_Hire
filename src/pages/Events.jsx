import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiTag, FiFilter, FiX, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Events = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState('Technical');
    const [filter, setFilter] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        year: ''
    });

    const eventsData = [
        {
            id: 1,
            title: 'Global AI Summit 2025',
            organizer: 'IIT Madras',
            date: 'Dec 25, 2025',
            location: 'Chennai, TN',
            category: 'Technical',
            type: 'Hackathon',
            description: 'Join the biggest AI hackathon in South India. Build solutions for real-world problems.',
            attendees: 1200,
            image: ''
        },
        {
            id: 2,
            title: 'TechX Symposium',
            organizer: 'Amrita University',
            date: 'Jan 10, 2026',
            location: 'Coimbatore, TN',
            category: 'Technical',
            type: 'Paper Presentation',
            description: 'A national level technical symposium featuring research paper presentations and debates.',
            attendees: 800,
            image: ''
        },
        {
            id: 3,
            title: 'Cultural Fest 2026',
            organizer: 'Anna University',
            date: 'Feb 14, 2026',
            location: 'Chennai, TN',
            category: 'Non-Technical',
            type: 'Cultural',
            description: 'Experience the vibrant culture with music, dance, and art competitions.',
            attendees: 5000,
            image: ''
        },
        {
            id: 4,
            title: 'CodeRed Hackathon',
            organizer: 'NIT Trichy',
            date: 'Mar 05, 2026',
            location: 'Trichy, TN',
            category: 'Technical',
            type: 'Hackathon',
            description: '24-hour coding marathon. Win prizes worth ₹5 Lakhs.',
            attendees: 600,
            image: ''
        },
        {
            id: 5,
            title: 'Future Leaders Summit',
            organizer: 'PSG Tech',
            date: 'Mar 20, 2026',
            location: 'Coimbatore, TN',
            category: 'Non-Technical',
            type: 'Workshop',
            description: 'Leadership and management workshop for aspiring entrepreneurs.',
            attendees: 300,
            image: ''
        },
        {
            id: 6,
            title: 'Innovate 2026',
            organizer: 'SRM University',
            date: 'Apr 15, 2026',
            location: 'Chennai, TN',
            category: 'Technical',
            type: 'Paper Presentation',
            description: 'Showcase your innovative ideas and research papers to industry experts.',
            attendees: 450,
            image: ''
        },
        {
            id: 7,
            title: 'RoboWars 2026',
            organizer: 'CIT Coimbatore',
            date: 'Feb 28, 2026',
            location: 'Coimbatore, TN',
            category: 'Technical',
            type: 'Hackathon',
            description: 'Build and battle your robots in the ultimate arena.',
            attendees: 600,
            image: ''
        },
        {
            id: 8,
            title: 'Art & Soul',
            organizer: 'Loyola College',
            date: 'Jan 25, 2026',
            location: 'Chennai, TN',
            category: 'Non-Technical',
            type: 'Cultural',
            description: 'A celebration of art, music, and dance.',
            attendees: 3000,
            image: ''
        },
        {
            id: 9,
            title: 'Startup Pitch',
            organizer: 'IIT Madras Research Park',
            date: 'Mar 10, 2026',
            location: 'Chennai, TN',
            category: 'Non-Technical',
            type: 'Workshop',
            description: 'Pitch your startup idea to top VCs and angel investors.',
            attendees: 200,
            image: ''
        },
        {
            id: 10,
            title: 'BioTech Symposium',
            organizer: 'Vellore Institute of Technology',
            date: 'Apr 05, 2026',
            location: 'Vellore, TN',
            category: 'Technical',
            type: 'Paper Presentation',
            description: 'Advancements in Biotechnology and Genetic Engineering.',
            attendees: 500,
            image: ''
        },
        {
            id: 11,
            title: 'Short Film Festival',
            organizer: 'MGR Film Institute',
            date: 'Feb 20, 2026',
            location: 'Chennai, TN',
            category: 'Non-Technical',
            type: 'Cultural',
            description: 'Screening of award-winning student short films.',
            attendees: 800,
            image: ''
        },
        {
            id: 12,
            title: 'Velalar Crypto Quest',
            organizer: 'Vellalar College of Engg',
            date: 'Mar 15, 2026',
            location: 'Erode, TN',
            category: 'Technical',
            type: 'Hackathon',
            description: 'A blockchain and crypto-themed hackathon for students.',
            attendees: 400,
            image: ''
        },
        {
            id: 13,
            title: 'Green Earth Symposium',
            organizer: 'Vellalar Arts & Science',
            date: 'Apr 22, 2026',
            location: 'Erode, TN',
            category: 'Non-Technical',
            type: 'Paper Presentation',
            description: 'Symposium on environmental sustainability and green tech.',
            attendees: 350,
            image: ''
        },
        {
            id: 14,
            title: 'Vellalar Cultural Fest',
            organizer: 'Vellalar Institutions',
            date: 'May 05, 2026',
            location: 'Erode, TN',
            category: 'Non-Technical',
            type: 'Cultural',
            description: 'Grand annual cultural fest with dance, music, and food.',
            attendees: 5000,
            image: ''
        }
    ];

    const filteredEvents = eventsData.filter(event =>
        (activeCategory === 'All' || event.category === activeCategory) &&
        (filter === 'All' || event.type === filter)
    );

    const categories = ['Technical', 'Non-Technical'];
    const types = ['All', 'Hackathon', 'Paper Presentation', 'Workshop', 'Cultural'];

    const handleRegister = (event) => {
        setSelectedEvent(event);
        // Pre-fill form if user is logged in
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: '',
                college: '',
                year: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmitRegistration = (e) => {
        e.preventDefault();

        // Close modal and show success animation
        setShowModal(false);
        setShowSuccess(true);

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            college: '',
            year: ''
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setSelectedEvent(null);
        }, 3000);
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('nav.events')}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Discover upcoming hackathons, symposiums, and cultural fests near you.</p>
            </header>

            {/* Category Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                <div style={{ background: 'var(--surface)', padding: '0.5rem', borderRadius: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            border: '1px solid',
                            borderColor: filter === type ? 'var(--primary)' : 'var(--border)',
                            background: filter === type ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            color: filter === type ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                <AnimatePresence>
                    {filteredEvents.map((event) => (
                        <motion.div
                            layout
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card"
                            style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ padding: '2rem', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div>
                                        <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', background: event.category === 'Technical' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)', color: event.category === 'Technical' ? 'var(--success)' : '#ec4899', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginRight: '0.5rem' }}>
                                            {event.category}
                                        </span>
                                        <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', background: 'var(--surface)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            {event.type}
                                        </span>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{event.title}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FiTag /> {event.organizer}
                                </p>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{event.description}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FiCalendar style={{ color: 'var(--primary)' }} /> {event.date}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FiMapPin style={{ color: 'var(--primary)' }} /> {event.location}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FiUsers style={{ color: 'var(--primary)' }} /> {event.attendees}+ Attending</div>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)' }}>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '0.9rem' }}
                                    onClick={() => handleRegister(event)}
                                >
                                    Register Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredEvents.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                    <FiFilter style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No events found for the selected filters.</p>
                </div>
            )}

            {/* Registration Modal */}
            <AnimatePresence>
                {showModal && selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card"
                            style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem'
                                }}
                            >
                                <FiX />
                            </button>

                            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Register for Event</h2>
                            <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '2rem' }}>{selectedEvent.title}</p>

                            <form onSubmit={handleSubmitRegistration}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>College/Institution *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.college}
                                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Year of Study *</label>
                                    <select
                                        required
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="postgrad">Postgraduate</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                    Complete Registration
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Animation */}
            <AnimatePresence>
                {showSuccess && selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1001
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="glass-card"
                            style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: '1rem' }}
                            >
                                <FiCheckCircle />
                            </motion.div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--success)' }}>Registration Successful!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>You're registered for:</p>
                            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>{selectedEvent.title}</p>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', fontSize: '0.9rem' }}>Check your email for confirmation details</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Events;
