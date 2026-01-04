import React, { createContext, useState, useContext, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
    const [userState, setUserState] = useState(() => {
        const saved = localStorage.getItem('mathOlympiadUser');
        return saved ? JSON.parse(saved) : {
            xp: 0,
            level: 1,
            completedModules: [], // List of module IDs 'algebra-1', etc.
            streak: 1
        };
    });

    useEffect(() => {
        localStorage.setItem('mathOlympiadUser', JSON.stringify(userState));
    }, [userState]);

    const awardXP = (amount) => {
        setUserState(prev => {
            const newXP = prev.xp + amount;
            const newLevel = Math.floor(newXP / 100) + 1; // Simple leveling: 100 XP per level
            return { ...prev, xp: newXP, level: newLevel };
        });
    };

    const completeModule = (moduleId) => {
        setUserState(prev => {
            if (prev.completedModules.includes(moduleId)) return prev;
            return { ...prev, completedModules: [...prev.completedModules, moduleId] };
        });
    };

    return (
        <GamificationContext.Provider value={{ userState, awardXP, completeModule }}>
            {children}
        </GamificationContext.Provider>
    );
};
