import { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import LiquidEther from './components/LiquidEther';
import { useTheme } from './ThemeContext';
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle';
import Controller from './components/Controller';
import MeetMe from './components/MeetMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Socials from './components/Socials';

function AppContent() {
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1100);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* LiquidEther Background */}
            <div className="fixed inset-0 z-0">
                <LiquidEther
                    colors={theme === 'dark' ? ['#B388FF'] : ['#4FC3F7']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Navigation Controller */}
            <Controller />

            {/* Main Content */}
            <main className="relative z-10">
                <MeetMe />
                <Skills />
                <Projects />
                <Experience />
                <Socials />
            </main>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
