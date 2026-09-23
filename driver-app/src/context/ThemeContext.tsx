import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    } catch (e) {
      console.error('Failed to update theme mode:', e);
    }
  }, []);

  const toggleDarkMode = () => setIsDark(false);
  const setDarkMode = (_value: boolean) => setIsDark(false);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
