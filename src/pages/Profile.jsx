import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCheckCircle, FiFileText, FiAward, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Mock data for immediate "Professional" feel even without full backend
    const profileData = {
        name: user?.name || 'Karthi M',
        email: user?.email || 'karthi@example.com',
        role: user?.role || 'Job Seeker',
        phone: '+91 98765 43210',
        bio: 'Passionate Full Stack Developer with 2 years of experience in building scalable web applications. Eager to leverage skills in React and Node.js.',
        skills: ['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'Figma'],
        location: 'Chennai, Tamil Nadu'
    };

    const applications = [
        {
            _id: '1',
            job: { title: 'Frontend Developer', company: { name: 'Zoho Corporation' } },
            status: 'interview',
            appliedAt: '2025-12-15',
            atsScore: 85,
        },
        {
            _id: '2',
            job: { title: 'Product Designer', company: { name: 'Freshworks' } },
            status: 'applied',
            appliedAt: '2025-12-10',
            atsScore: 72,
        },
        {
            _id: '3',
            job: { title: 'React Intern', company: { name: 'Kissflow' } },
            status: 'rejected',
            appliedAt: '2025-12-01',
            atsScore: 60,
        }
    ];

    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(profileData); // Initial state from profileData (which falls back to user context)

    // Sync with user context when available
    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'Job Seeker',
                phone: user.phone || '',
                bio: user.bio || '',
                skills: user.skills || [],
                location: user.location || ''
            });
        }
    }, [user]);

    const handleUpdateProfile = async (updatedData) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const res = await axios.put('http://localhost:5000/api/auth/profile', updatedData, config);
            setUserData({ ...userData, ...updatedData });
            setShowEditModal(false);
            // Ideally update global auth context here too
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
                {/* User Sidebar */}
                <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', position: 'sticky', top: '2rem' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', border: '4px solid rgba(255,255,255,0.1)' }}>
                                {userData.name[0]}
                            </div>
                            <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '20px', height: '20px', background: '#10B981', borderRadius: '50%', border: '3px solid var(--surface)' }}></div>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{userData.name}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>{userData.role}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button onClick={() => setActiveTab('profile')} className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', borderRadius: '0.8rem' }}><FiUser /> Profile Overview</button>
                            <button onClick={() => setActiveTab('applications')} className={`btn ${activeTab === 'applications' ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', borderRadius: '0.8rem' }}><FiBriefcase /> Applications</button>
                            <button onClick={() => setActiveTab('stats')} className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', borderRadius: '0.8rem' }}><FiTrendingUp /> Statistics</button>
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main>
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '2rem' }}>About Me</h2>
                                    <button onClick={() => setShowEditModal(true)} className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Edit Profile</button>
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '3rem' }}>
                                    {userData.bio || 'No bio added yet. Click edit to add specific details about your professional journey.'}
                                </p>

                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Skills & Expertise</h3>
                                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                                    {userData.skills.length > 0 ? userData.skills.map(skill => (
                                        <span key={skill} style={{ padding: '0.6rem 1.2rem', borderRadius: '2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', fontSize: '0.95rem', color: 'var(--text)' }}>{skill}</span>
                                    )) : <span style={{ color: 'var(--text-muted)' }}>No skills listed</span>}
                                </div>

                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Contact Information</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                            <FiMail style={{ color: 'var(--primary)' }} /> {userData.email}
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                            <FiPhone style={{ color: 'var(--primary)' }} /> {userData.phone || 'Not provided'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* ... other tabs ... */}
                    {activeTab === 'applications' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Recent Applications</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {applications.map((app) => (
                                    <div key={app._id} className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{app.job.company.name[0]}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{app.job.title}</h4>
                                                <p style={{ color: 'var(--text-muted)' }}>{app.job.company.name}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                            <span style={{ padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600, background: app.status === 'interview' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)', color: app.status === 'interview' ? '#10B981' : app.status === 'rejected' ? '#EF4444' : '#6366F1' }}>{app.status.toUpperCase()}</span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Applied on {app.appliedAt}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'stats' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="glass-card" style={{ padding: '3rem' }}>
                                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Performance Analytics</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                                    <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: '1.5rem', textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>75%</div>
                                        <div style={{ color: 'var(--text-muted)' }}>Average ATS Score</div>
                                    </div>
                                    <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: '1.5rem', textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)', marginBottom: '0.5rem' }}>12</div>
                                        <div style={{ color: 'var(--text-muted)' }}>Applications Sent</div>
                                    </div>
                                </div>
                                <h3 style={{ marginBotton: '1.5rem' }}>Profile Strength</h3>
                                <div style={{ marginTop: '1.5rem', height: '1rem', background: 'var(--surface)', borderRadius: '1rem', overflow: 'hidden' }}>
                                    <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
                                </div>
                                <p style={{ marginTop: '0.75rem', textAlign: 'right', color: 'var(--text-muted)' }}>Top 15% of candidates</p>
                            </div>
                        </motion.div>
                    )}
                </main>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                        <button onClick={() => setShowEditModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        <h2 style={{ marginBottom: '2rem' }}>Edit Profile</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updated = {
                                name: formData.get('name'),
                                phone: formData.get('phone'),
                                bio: formData.get('bio'),
                                skills: formData.get('skills').split(',').map(s => s.trim()).filter(s => s),
                            };
                            handleUpdateProfile(updated);
                        }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                                <input name="name" defaultValue={userData.name} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                                <input name="phone" defaultValue={userData.phone} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Skills (comma separated)</label>
                                <input name="skills" defaultValue={userData.skills.join(', ')} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                                <textarea name="bio" defaultValue={userData.bio} rows="4" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
