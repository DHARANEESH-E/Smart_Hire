import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SkillAssessment = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('selection'); // selection, quiz, result
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const certificateRef = useRef(null);

    const skills = [
        {
            id: 'react',
            name: 'React.js Development',
            icon: '⚛️',
            questions: [
                { id: 1, text: 'What is the primary purpose of React?', options: ['Database Management', 'Building User Interfaces', 'Server-side Logic', 'Operating System'], correct: 'Building User Interfaces' },
                { id: 2, text: 'Which hook is used to manage state in a functional component?', options: ['useEffect', 'useContext', 'useState', 'useReducer'], correct: 'useState' },
                { id: 3, text: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Syntax eXchange', 'Java Serialized XML'], correct: 'JavaScript XML' },
                { id: 4, text: 'How do you pass data to a child component?', options: ['State', 'Props', 'Context', 'Ref'], correct: 'Props' },
                { id: 5, text: 'What is the virtual DOM?', options: ['A direct copy of the real DOM', 'A lightweight copy of the real DOM', 'A browser plugin', 'A database'], correct: 'A lightweight copy of the real DOM' }
            ]
        },
        {
            id: 'node',
            name: 'Node.js Backend',
            icon: '🟢',
            questions: [
                { id: 1, text: 'What is Node.js?', options: ['A framework', 'A programming language', 'A JavaScript runtime', 'A database'], correct: 'A JavaScript runtime' },
                { id: 2, text: 'Which module is used to handle file operations?', options: ['http', 'fs', 'path', 'os'], correct: 'fs' },
                { id: 3, text: 'What is npm?', options: ['Node Project Manager', 'New Package Manager', 'Node Package Manager', 'Network Packet Manager'], correct: 'Node Package Manager' },
                { id: 4, text: 'Which framework is commonly used with Node.js for web apps?', options: ['Django', 'Flask', 'Spring', 'Express'], correct: 'Express' },
                { id: 5, text: 'What is the Event Loop?', options: ['A loop that blocks I/O', 'A mechanism to handle async callbacks', 'A database query', 'A CSS animation'], correct: 'A mechanism to handle async callbacks' }
            ]
        },
        {
            id: 'aptitude',
            name: 'General Aptitude',
            icon: '🧠',
            questions: [
                { id: 1, text: 'Which number completes the series: 2, 5, 10, 17, ...?', options: ['24', '26', '25', '27'], correct: '26' },
                { id: 2, text: 'If a book costs ₹50 plus half its price, how much does it cost?', options: ['₹75', '₹100', '₹150', '₹50'], correct: '₹100' },
                { id: 3, text: 'Odd one out: Apple, Orange, Banana, Carrot', options: ['Apple', 'Orange', 'Banana', 'Carrot'], correct: 'Carrot' },
                { id: 4, text: 'Speed = Distance / ?', options: ['Time', 'Mass', 'Velocity', 'Force'], correct: 'Time' },
                { id: 5, text: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?', options: ['7', '10', '12', '13'], correct: '10' }
            ]
        }
    ];

    const startQuiz = (skill) => {
        setSelectedSkill(skill);
        setActiveTab('quiz');
        setCurrentQuestion(0);
        setAnswers({});
        setScore(0);
    };

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [currentQuestion]: option });
    };

    const nextQuestion = () => {
        if (currentQuestion < selectedSkill.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateScore();
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        selectedSkill.questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                correctCount++;
            }
        });
        const finalScore = (correctCount / selectedSkill.questions.length) * 100;
        setScore(finalScore);
        setActiveTab('result');
    };

    const downloadCertificate = () => {
        const input = certificateRef.current;
        html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape, A4
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`HireSmart_Certificate_${selectedSkill.name}.pdf`);
        });
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>Skill Assessment & Certification</h1>

            {activeTab === 'selection' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {skills.map(skill => (
                        <motion.div
                            key={skill.id}
                            whileHover={{ scale: 1.02 }}
                            className="glass-card"
                            style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                            onClick={() => startQuiz(skill)}
                        >
                            <div style={{ fontSize: '4rem' }}>{skill.icon}</div>
                            <h2 style={{ fontSize: '1.5rem' }}>{skill.name}</h2>
                            <p style={{ color: 'var(--text-muted)' }}>{skill.questions.length} Questions • 10 Minutes</p>
                            <button className="btn btn-primary" style={{ width: '100%' }}>Start Assessment</button>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'quiz' && selectedSkill && (
                <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{selectedSkill.icon} {selectedSkill.name}</h2>
                        <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Question {currentQuestion + 1}/{selectedSkill.questions.length}</span>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>{selectedSkill.questions[currentQuestion].text}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {selectedSkill.questions[currentQuestion].options.map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: answers[currentQuestion] === option ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        background: answers[currentQuestion] === option ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface)',
                                        color: 'var(--text)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-primary"
                            disabled={!answers[currentQuestion]}
                            onClick={nextQuestion}
                        >
                            {currentQuestion === selectedSkill.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'result' && (
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                        {score >= 60 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{ fontSize: '5rem' }}>✅</span>
                                <h2 style={{ fontSize: '2.5rem' }}>Congratulations!</h2>
                                <p style={{ fontSize: '1.2rem' }}>You passed the <strong>{selectedSkill.name}</strong> assessment.</p>
                                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary)' }}>{score}%</div>
                                <button onClick={downloadCertificate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                                    <span>⬇️</span> Download Certificate
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{ fontSize: '5rem' }}>⚠️</span>
                                <h2 style={{ fontSize: '2.5rem' }}>Assessment Failed</h2>
                                <p style={{ fontSize: '1.2rem' }}>You scored {score}%. You need 60% to pass.</p>
                                <button onClick={() => setActiveTab('selection')} className="btn btn-outline" style={{ marginTop: '1rem' }}>Try Again</button>
                            </div>
                        )}
                    </div>

                    {/* Hidden Certificate Template for PDF Generation */}
                    {score >= 60 && (
                        <div style={{ overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <div
                                id="certificate-template"
                                ref={certificateRef}
                                style={{
                                    width: '1123px', // A4 Landscape width (approx at 96dpi)
                                    height: '794px', // A4 Landscape height
                                    padding: '50px',
                                    background: '#fff',
                                    color: '#000',
                                    position: 'relative', // Changed from absolute to relative for viewing/debugging
                                    // top: '-9999px',
                                    // left: '-9999px', 
                                    fontFamily: "'Playfair Display', serif",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '20px solid #1a237e',
                                    boxSizing: 'border-box',
                                    backgroundImage: 'radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)'

                                }}
                            >
                                <div style={{
                                    border: '5px double #daa520',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '2rem'
                                }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', marginBottom: '1rem' }}>CERTIFICATE</div>
                                    <div style={{ fontSize: '1.5rem', letterSpacing: '2px', color: '#daa520', marginBottom: '3rem' }}>OF ACHIEVEMENT</div>

                                    <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>This is to certify that</div>
                                    <div style={{ fontSize: '3.5rem', fontFamily: "'Great Vibes', cursive", color: '#1a237e', margin: '1rem 0', borderBottom: '2px solid #daa520', paddingBottom: '0.5rem', minWidth: '400px', textAlign: 'center' }}>
                                        {user ? user.name : 'Student Name'}
                                    </div>
                                    <div style={{ fontSize: '1.2rem', marginTop: '1rem' }}>has successfully completed the assessment for</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', margin: '1.5rem 0' }}>{selectedSkill?.name}</div>

                                    <div style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
                                        with a score of <strong>{score}%</strong>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '4rem' }}>
                                        <div style={{ textAlign: 'center', borderTop: '1px solid #000', paddingTop: '1rem', width: '200px' }}>
                                            <div style={{ fontWeight: 'bold' }}>Date</div>
                                            <div>{new Date().toLocaleDateString()}</div>
                                        </div>
                                        <div style={{ width: '100px', height: '100px', background: 'gold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a237e', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                            HIRESMART
                                        </div>
                                        <div style={{ textAlign: 'center', borderTop: '1px solid #000', paddingTop: '1rem', width: '200px' }}>
                                            <div style={{ fontWeight: 'bold' }}>HireSmart Team</div>
                                            <div>CEO Signature</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SkillAssessment;
