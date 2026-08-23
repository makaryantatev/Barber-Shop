import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadThemeFromDB = async () => {
        try {
            const response = await fetch('https://barber-shop-api.vercel.app/getTheme');
            const data = await response.json();
            const dbTheme = data.theme === 'dark';
            setDarkMode(dbTheme);

            if (dbTheme) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            localStorage.setItem('theme', dbTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Error loading theme:', error);
            const savedTheme = localStorage.getItem('theme');
            const isDark = savedTheme === 'dark';
            setDarkMode(isDark);
            if (isDark) {
                document.documentElement.classList.add('dark');
            }
        } finally {
            setLoading(false);
        }
    };

    const saveThemeToDB = async (themeValue) => {
        try {
            await fetch('https://barber-shop-api.vercel.app/updateTheme', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ theme: themeValue }),
            });
        } catch (error) {
            console.error('Error saving theme to DB:', error);
        }
    };

    const toggleTheme = async () => {
        const newMode = !darkMode;
        const themeString = newMode ? 'dark' : 'light';

        setDarkMode(newMode);
        localStorage.setItem('theme', themeString);

        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        await saveThemeToDB(themeString);
    };

    useEffect(() => {
        loadThemeFromDB();
    }, []);

    if (loading) {
        return <div>Loading theme...</div>; 
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};