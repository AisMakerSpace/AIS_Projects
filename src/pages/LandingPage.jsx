import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Trophy } from 'lucide-react';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landing}>
            <header className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container"
                >
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>
                            Unlocking Mathematical <span className={styles.highlight}>Genius</span>
                        </h1>
                        <p className={styles.subtitle}>
                            The first AI-powered platform tailored for Math Olympiad excellence.
                            Personalized training, infinite practice, and a gamified journey to mastery.
                        </p>
                        <div className={styles.ctaGroup}>
                            <Link to="/train" className="btn btn-primary">
                                Start Training <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <div className={styles.heroBackground}>
                    <div className={styles.orb1}></div>
                    <div className={styles.orb2}></div>
                </div>
            </header>

            <section className={`container ${styles.featuresSection}`}>
                <motion.div
                    className={styles.featureCard}
                    whileHover={{ y: -5 }}
                >
                    <Sparkles className={styles.icon} color="#f472b6" size={40} />
                    <h3>AI-Generated Problems</h3>
                    <p>Never run out of practice. Gemini creates unique, Olympiad-level questions tailored to your skill.</p>
                </motion.div>

                <motion.div
                    className={styles.featureCard}
                    whileHover={{ y: -5 }}
                >
                    <Brain className={styles.icon} color="#8b5cf6" size={40} />
                    <h3>Deep Concept Learning</h3>
                    <p>Don't just solve. Understand. Get intuitive explanations and concept breakdowns.</p>
                </motion.div>

                <motion.div
                    className={styles.featureCard}
                    whileHover={{ y: -5 }}
                >
                    <Trophy className={styles.icon} color="#fbbf24" size={40} />
                    <h3>Gamified Mastery</h3>
                    <p>Level up, earn badges, and track your progress through our structured learning modules.</p>
                </motion.div>
            </section>
        </div>
    );
};

export default LandingPage;
