import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMathQuestion } from '../services/gemini';
import { Loader2, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from '../styles/TrainingModule.module.css';

const TOPICS = [
    "Algebra", "Number Theory", "Geometry", "Combinatorics", "Calculus", "Inequalities"
];

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const TrainingModule = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [questionData, setQuestionData] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleGenerate = async (topic) => {
        setLoading(true);
        setQuestionData(null);
        setShowAnswer(false);
        setShowHint(false);
        setSelectedTopic(topic);
        try {
            const data = await generateMathQuestion(topic);
            setQuestionData(data);
        } catch (error) {
            alert("Failed to generate question. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Training Ground</h1>

            {!questionData && !loading && (
                <div className={styles.topicGrid}>
                    {TOPICS.map((topic) => (
                        <motion.button
                            key={topic}
                            className={styles.topicCard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleGenerate(topic)}
                        >
                            {topic}
                        </motion.button>
                    ))}
                </div>
            )}

            {loading && (
                <div className={styles.loaderContainer}>
                    <Loader2 className={styles.spinner} size={48} />
                    <p>Consulting the Oracle...</p>
                </div>
            )}

            {questionData && (
                <motion.div
                    className={styles.questionCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.headerRow}>
                        <span className={styles.topicBadge}>{selectedTopic}</span>
                        {questionData.isPastOlympiad && (
                            <span className={styles.olympiadBadge}>
                                <AlertTriangle size={16} /> Seen in {questionData.olympiadSource}
                            </span>
                        )}
                    </div>

                    <div className={styles.questionText}>
                        <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                            {questionData.question}
                        </ReactMarkdown>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.actionBtn}
                            onClick={() => setShowHint(!showHint)}
                        >
                            <Lightbulb size={20} /> {showHint ? "Hide Intuition" : "Intuitive Idea"}
                        </button>
                        <button
                            className={`${styles.actionBtn} ${styles.primaryBtn}`}
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            <CheckCircle size={20} /> {showAnswer ? "Hide Solution" : "Reveal Solution"}
                        </button>
                    </div>

                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                className={styles.hintBox}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                <h4>Intuitive Idea:</h4>
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {questionData.intuitiveIdea}
                                </ReactMarkdown>
                            </motion.div>
                        )}

                        {showAnswer && (
                            <motion.div
                                className={styles.solutionBox}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                <h3>Answer:
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                        components={{ p: 'span' }} // Render inline
                                    >
                                        {" " + questionData.answer}
                                    </ReactMarkdown>
                                </h3>
                                <div className={styles.explanation}>
                                    <h4>Full Explanation:</h4>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {questionData.explanation}
                                    </ReactMarkdown>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        className={styles.nextBtn}
                        onClick={() => handleGenerate(selectedTopic)}
                    >
                        Next Problem
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default TrainingModule;
