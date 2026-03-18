import { intro } from '../data';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MeetMe() {
    return (
        <section id="about" className="flex items-center justify-center px-4 py-8 md:px-8 lg:py-16 xl:px-16 relative z-20">
            <div className="max-w-6xl w-full">
                <div className="glass rounded-3xl p-6 md:p-12 lg:p-16 space-y-8 border border-white/40 dark:border-white/10 shadow-xl">
                    <div className="space-y-4">
                        <h2 className="text-sm uppercase tracking-widest text-[#0F2854]/60 dark:text-white/60 font-sans font-medium">
                            {/* About Me */}
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] leading-tight break-words">
                            {intro.name}
                        </h1>
                        <div className="inline-block">
                            <p className="text-lg md:text-2xl font-sans font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                {intro.title}
                            </p>
                            <div className="mt-1 h-[3px] w-3/4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                        </div>
                    </div>

                    <div className="text-base md:text-lg lg:text-[19px] text-foreground/75 font-sans font-normal leading-relaxed tracking-wide max-w-5xl space-y-4">
                        {intro.description.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <a
                            href="https://github.com/TechByAnshuu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass border border-white/30 hover:bg-[#1e3a5f] dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group/icon"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6 group-hover/icon:text-white dark:group-hover/icon:text-white transition-colors" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ansh-mishra-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass border border-white/30 hover:bg-[#1e3a5f] dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group/icon"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 group-hover/icon:text-white dark:group-hover/icon:text-white transition-colors" />
                        </a>
                        <a
                            href="mailto:anshmishra14.14@gmail.com"
                            className="p-3 rounded-full glass border border-white/30 hover:bg-[#1e3a5f] dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group/icon"
                            aria-label="Email"
                        >
                            <Mail className="w-6 h-6 group-hover/icon:text-white dark:group-hover/icon:text-white transition-colors" />
                        </a>

                        {/* Resume button */}
                        <Link
                            to="/view-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass border border-white/30 hover:bg-gradient-to-br hover:from-[#0F2854] hover:to-[#1e3a5f] dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group/icon relative"
                            aria-label="View Resume"
                            title="View Resume"
                        >
                            <FileText className="w-6 h-6 group-hover/icon:text-white dark:group-hover/icon:text-white transition-colors" />
                            {/* Tooltip */}
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-semibold
                                            bg-[#0F2854] dark:bg-white/90 text-white dark:text-[#0F2854]
                                            opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                                View Resume
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
