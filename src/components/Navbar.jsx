import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
// import { FiBriefcase, FiUser, FiLogOut, FiCalendar, FiAward, FiStar } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Top Header Area */}
            <header style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/assets/logo_circle.png" alt="HireSmart" style={{ height: '50px', width: '50px', objectFit: 'contain', borderRadius: '50%' }} />
                    <span className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>HireSmart</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    {user ? (
                        <>
                            <Link to="/profile" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>👤</span> {user.name ? user.name.split(' ')[0] : 'User'}
                            </Link>
                            <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Logout <span style={{ fontSize: '1.1rem' }}>🚪</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none' }}>{t('nav.login')}</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>{t('nav.signup')}</Link>
                        </>
                    )}
                </div>
            </header>

            {/* Sticky Navigation Bar */}
            <nav className="glass-card" style={{ margin: '0 auto 2rem', width: 'fit-content', position: 'sticky', top: '1rem', zIndex: 1000, padding: '0.4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '2rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Link to="/jobs" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>💼</span> {t('nav.jobs')}
                    </Link>
                    <Link to="/internships" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>🎓</span> {t('nav.internships')}
                    </Link>
                    <Link to="/events" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>📅</span> {t('nav.events')}
                    </Link>
                    <Link to="/assessment" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>🧠</span> Skill Test
                    </Link>
                    <Link to="/recommendations" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>⭐</span> {t('nav.recommendations')}
                    </Link>
                    <Link to="/ats-scanner" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '1.5rem', transition: 'all 0.2s', fontSize: '0.95rem' }} className="nav-link">
                        <span style={{ fontSize: '1.1rem' }}>📄</span> ATS
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
