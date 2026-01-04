import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Award, Calendar } from 'lucide-react';
import styles from '../styles/OlympiadInfo.module.css';

const OlympiadInfo = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>The World of Math Olympiads</h1>
                <p className={styles.subtitle}>Your guide to the most prestigious mathematical competitions.</p>
            </header>

            <section className={styles.section}>
                <div className={styles.cardHeader}>
                    <Globe className={styles.icon} size={32} />
                    <h2>International Mathematical Olympiad (IMO)</h2>
                </div>
                <p>The pinnacle of pre-university mathematics. The IMO is the World Championship Mathematics Competition for High School students and is held annually in a different country.</p>
                <ul className={styles.detailsList}>
                    <li><Calendar size={16} /> <strong>Format:</strong> 2 days, 4.5 hours each, 3 problems per day.</li>
                    <li><Award size={16} /> <strong>Scoring:</strong> 7 points per problem, 42 points total.</li>
                    <li><BookOpen size={16} /> <strong>Syllabus:</strong> Geometry, Number Theory, Algebra, and Combinatorics. No Calculus.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <div className={styles.cardHeader}>
                    <Award className={styles.icon} size={32} />
                    <h2>USAMO (USA Math Olympiad)</h2>
                </div>
                <p>The highly selective final round for the AMC series in the United States. It identifies the top math talent in the country.</p>
                <ul className={styles.detailsList}>
                    <li><Calendar size={16} /> <strong>Format:</strong> 2 days, 9 hours total, proof-based problems.</li>
                    <li><Award size={16} /> <strong>Eligibility:</strong> Qualification via AMC 10/12 and AIME exams.</li>
                    <li><BookOpen size={16} /> <strong>Focus:</strong> Formal mathematical proofs, critical thinking, and deep understanding.</li>
                </ul>
            </section>

            <section className={styles.gridSection}>
                <div className={styles.infoCard}>
                    <h3>How to Prepare</h3>
                    <p>Start with fundamental concepts in Algebra and Geometry. Master the art of proof-writing. Solve past papers from AMC and AIME steps.</p>
                </div>
                <div className={styles.infoCard}>
                    <h3>Why Participate?</h3>
                    <p>Develops critical thinking, problem-solving skills, and connects you with a global community of like-minded peers.</p>
                </div>
            </section>
        </div>
    );
};

export default OlympiadInfo;
