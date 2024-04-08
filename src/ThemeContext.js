import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light-mode-theme'); // Default theme

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light-mode-theme';
        setTheme(storedTheme);
        document.body.className = storedTheme;
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light-mode-theme' ? 'dark-mode-theme' : 'light-mode-theme';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme;
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
