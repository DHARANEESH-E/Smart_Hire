import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu } from 'react-icons/fi';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your AI Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const suggestions = [
        "How do I apply for jobs?",
        "Check my resume score",
        "Find internships near me",
        "Upcoming hackathons"
    ];

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking and response
        setTimeout(() => {
            let replyText = "I'm still learning! Check out our Jobs page for more opportunities.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('apply') || lowerText.includes('job')) {
                replyText = "To apply for jobs, go to the 'Find Jobs' page, select a job card, and click 'Apply Now'. Make sure your profile is updated!";
            } else if (lowerText.includes('resume') || lowerText.includes('ats') || lowerText.includes('score')) {
                replyText = "You can check your resume score using our ATS Scanner. Go to Recommendations -> ATS Checker to upload your PDF.";
            } else if (lowerText.includes('intern') || lowerText.includes('internship')) {
                replyText = "We have many internships available! Check the 'Internships' tab to see listings for Frontend, Data Science, and more.";
            } else if (lowerText.includes('hackathon') || lowerText.includes('event')) {
                replyText = "Check the 'College Events' page for the latest Hackathons and Symposiums happening in Tamil Nadu.";
            }

            const botMsg = { id: Date.now() + 1, text: replyText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                    cursor: 'pointer',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}
            >
                {isOpen ? <FiX /> : <FiMessageSquare />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: '7rem',
                            right: '2rem',
                            width: '350px',
                            height: '500px',
                            background: 'rgba(30, 41, 59, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '1.5rem',
                            border: '1px solid var(--border)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 9999
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '35px', height: '35px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <FiCpu />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>HireSmart AI</h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span style={{ width: '6px', height: '6px', background: 'currentColor', borderRadius: '50%' }}></span> Online
                                </span>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        padding: '0.8rem 1.2rem',
                                        borderRadius: '1rem',
                                        borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
                                        borderTopLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
                                        background: msg.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', background: 'var(--surface)', padding: '0.8rem 1.2rem', borderRadius: '1rem', borderTopLeftRadius: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Typing...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length < 3 && (
                            <div style={{ padding: '0 1rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                                {suggestions.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '2rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-muted)',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '0.75rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                style={{
                                    flex: 1,
                                    background: 'var(--surface)',
                                    border: 'none',
                                    borderRadius: '2rem',
                                    padding: '0.8rem 1.25rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                onClick={() => handleSend()}
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <FiSend />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
