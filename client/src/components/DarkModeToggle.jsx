import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            setIsDark(true);
            document.documentElement.removeAttribute('data-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            // Dark mode
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Light mode
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="group relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                    : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                border: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(251,191,36,0.3)'
            }}
            aria-label="Toggle dark mode"
        >
            {/* Sliding Circle */}
            <div
                className="absolute top-0.5 transition-all duration-300 ease-in-out"
                style={{
                    left: isDark ? '4px' : 'calc(100% - 28px)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isDark
                        ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)',
                    boxShadow: isDark
                        ? '0 2px 8px rgba(59, 130, 246, 0.4)'
                        : '0 2px 8px rgba(251, 191, 36, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Icon */}
                <span className="text-xs transition-transform duration-300 group-hover:scale-110">
                    {isDark ? '🌙' : '☀️'}
                </span>
            </div>

            {/* Background Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2 text-xs pointer-events-none">
                <span className={`transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'}`}>☀️</span>
                <span className={`transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'}`}>🌙</span>
            </div>
        </button>
    );
};

export default DarkModeToggle;
