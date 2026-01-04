import React from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';
import { Star, Lock, Check, MapPin } from 'lucide-react';
import styles from '../styles/GamificationMap.module.css';

const LEVELS = [
    { id: 1, name: "The Beginning", description: "Algebra Basics", requiredLevel: 1 },
    { id: 2, name: "Number Ninja", description: "Integer Properties", requiredLevel: 2 },
    { id: 3, name: "Geometry Plains", description: "Triangles & Circles", requiredLevel: 3 },
    { id: 4, name: "Inequality Peak", description: "AM-GM Basics", requiredLevel: 4 },
    { id: 5, name: "Combinatorics Cloud", description: "Counting Principles", requiredLevel: 5 },
];

const GamificationMap = () => {
    const { userState } = useGamification();

    return (
        <div className={styles.mapContainer}>
            <header className={styles.header}>
                <h1>Your Journey</h1>
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Current Level</span>
                        <span className={styles.statValue}>{userState.level}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>XP Earned</span>
                        <span className={styles.statValue}>{userState.xp}</span>
                    </div>
                </div>
            </header>

            <div className={styles.pathway}>
                {LEVELS.map((level, index) => {
                    const isUnlocked = userState.level >= level.requiredLevel;
                    const isCompleted = userState.level > level.requiredLevel;

                    return (
                        <div key={level.id} className={`${styles.levelNode} ${index % 2 === 0 ? styles.left : styles.right}`}>
                            <motion.div
                                className={`${styles.nodeCircle} ${isUnlocked ? styles.unlocked : styles.locked}`}
                                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                {isCompleted ? <Check size={32} /> : isUnlocked ? <MapPin size={32} /> : <Lock size={24} />}
                            </motion.div>

                            <div className={styles.nodeInfo}>
                                <h3 className={styles.levelName}>{level.name}</h3>
                                <p className={styles.levelDesc}>{level.description}</p>
                                {!isUnlocked && <span className={styles.requirement}>Requires Level {level.requiredLevel}</span>}
                            </div>
                        </div>
                    );
                })}
                <div className={styles.pathLine}></div>
            </div>
        </div>
    );
};

export default GamificationMap;
