import { useState, useEffect } from 'react';

const sections = [
    { id: 'meet-me', label: 'Meet Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'My Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'socials', label: 'Socials' },
];

export default function Controller() {
    const [activeSection, setActiveSection] = useState('meet-me');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') || 'meet-me';
            setActiveSection(hash);
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.location.hash = sectionId;
        }
    };

    return (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
            <div className="bg-[#0F2854] dark:bg-[#93C5FD] rounded-full p-4 space-y-4 shadow-lg">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative block"
                        aria-label={section.label}
                    >
                        <div
                            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${activeSection === section.id
                                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 scale-125 ring-2 ring-white/70 ring-offset-1 ring-offset-transparent'
                                : 'bg-white/60 dark:bg-[#0F2854]/70 group-hover:bg-white dark:group-hover:bg-[#0F2854]'
                                }`}
                        />
                        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0F2854] dark:bg-[#93C5FD] text-white dark:text-[#0F2854] px-3 py-1 rounded-full text-xs font-medium shadow-md pointer-events-none">
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
