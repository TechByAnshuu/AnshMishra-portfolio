import { useTheme } from '../ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-40 p-3 rounded-full glass hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
                <Moon className="w-5 h-5 text-blue-600 group-hover:-rotate-180 transition-transform duration-500" />
            )}
        </button>
    );
}
