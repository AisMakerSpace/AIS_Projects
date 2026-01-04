import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Brain, Map, Info } from 'lucide-react';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <div className={`container ${styles.navContainer}`}>
                <Link to="/" className={styles.logo}>MathOlympiad.AI</Link>
                <div className={styles.links}>
                    <Link to="/" className={styles.link}><Home size={20} /> Home</Link>
                    <Link to="/train" className={styles.link}><Brain size={20} /> Train</Link>
                    <Link to="/map" className={styles.link}><Map size={20} /> Journey</Link>
                    <Link to="/info" className={styles.link}><Info size={20} /> Info</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
