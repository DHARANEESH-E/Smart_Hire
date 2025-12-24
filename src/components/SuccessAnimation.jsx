import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const SuccessAnimation = ({ isOpen, onClose, message = "Application Submitted Successfully!" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '2rem', textAlign: 'center', border: '1px solid var(--border)', maxWidth: '400px', width: '90%' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--success)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white',
                                fontSize: '3rem'
                            }}
                        >
                            <FiCheck />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Success!</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>
                        <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>Continue</button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessAnimation;
