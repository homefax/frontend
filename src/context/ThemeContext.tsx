import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with dark mode as default
  const [theme, setTheme] = useState<Theme>('dark');

  // On mount, check if there's a saved theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // If no saved theme, use dark mode (default)
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Set dark mode as default
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Update the document's data-theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};