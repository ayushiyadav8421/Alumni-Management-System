import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const context = useTheme();
  
  if (!context) return null;
  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 ml-4 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-university-gold focus:ring-offset-2 focus:ring-offset-theme-bg"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-university-green hover:text-university-gold transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-university-gold hover:text-white transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
