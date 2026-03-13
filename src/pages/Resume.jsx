import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Maximize2, FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import LiquidEther from '../components/LiquidEther';
import Socials from '../components/Socials';

/* ── Theme toggle button ── */
function ThemeBtn() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 rounded-full
                       bg-[#0F2854]/6 dark:bg-white/8
                       border border-[#0F2854]/10 dark:border-white/10
                       text-[#0F2854]/60 dark:text-white/50
                       hover:text-[#0F2854] dark:hover:text-white
                       hover:bg-[#0F2854]/10 dark:hover:bg-white/14
                       transition-all duration-250 group"
        >
            {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                : <Moon className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-400" />
            }
        </button>
    );
}

export default function ResumePage() {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeError, setIframeError] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const resumeUrl = '/resume.pdf';

    return (
        <div className="relative min-h-screen">
            {/* ── Animated background ── */}
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

            {/* ── Navbar ── */}
            <header className="fixed top-0 left-0 right-0 z-[100]
                               flex items-center justify-between px-6 md:px-10 h-14
                               bg-white/70 dark:bg-black/55 backdrop-blur-xl
                               border-b border-[#0F2854]/8 dark:border-white/8 shadow-sm">
                {/* Back button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide
                               text-[#0F2854]/60 dark:text-white/50
                               hover:text-[#0F2854] dark:hover:text-[#93C5FD]
                               hover:-translate-x-0.5 transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Portfolio
                </Link>

                {/* Center title */}
                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <FileText className="w-4 h-4 text-[#0F2854]/60 dark:text-[#93C5FD]/70" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase
                                     text-[#0F2854]/60 dark:text-white/50 hidden sm:block">
                        Resume
                    </span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                    {/* Download */}
                    <a
                        href={resumeUrl}
                        download="Ansh_Mishra_Resume.pdf"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                                   bg-[#0F2854]/10 dark:bg-white/10
                                   border border-[#0F2854]/15 dark:border-white/15
                                   text-[#0F2854] dark:text-white
                                   hover:bg-[#0F2854] hover:text-white dark:hover:bg-[#93C5FD]/25 dark:hover:text-[#93C5FD]
                                   transition-all duration-300 hover:scale-105 group"
                        aria-label="Download resume"
                    >
                        <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        <span className="hidden sm:inline">Download</span>
                    </a>

                    {/* Full View */}
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                                   bg-gradient-to-r from-[#0F2854] to-[#1e3a5f] dark:from-[#93C5FD]/25 dark:to-[#60A5FA]/25
                                   border border-[#0F2854]/50 dark:border-[#93C5FD]/25
                                   text-white dark:text-[#93C5FD]
                                   hover:opacity-90 hover:scale-105 transition-all duration-300 group"
                        aria-label="Open in full view"
                    >
                        <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline">Full View</span>
                    </a>

                    <span className="h-4 w-px bg-[#0F2854]/15 dark:bg-white/12" />
                    <ThemeBtn />
                </div>
            </header>

            {/* ── Content ── */}
            <main className="relative z-10 pt-20 pb-10 px-4 md:px-8 min-h-screen flex flex-col items-center">
                <div className={`w-full max-w-5xl transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                    {/* Header info */}
                    <div className="mb-6 text-center">
                        <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-1">
                            Ansh Mishra
                        </p>
                        <h1 className="text-3xl md:text-5xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] mb-1">
                            My Resume
                        </h1>
                        <div className="flex justify-center">
                            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                        </div>
                    </div>

                    {/* Action buttons — mobile */}
                    <div className="flex sm:hidden justify-center gap-3 mb-6">
                        <a
                            href={resumeUrl}
                            download="Ansh_Mishra_Resume.pdf"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold
                                       glass border border-white/30 dark:border-white/15
                                       text-[#0F2854] dark:text-[#93C5FD]
                                       hover:bg-[#0F2854] hover:text-white transition-all duration-300"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download
                        </a>
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold
                                       bg-[#0F2854] dark:bg-[#93C5FD]/20 text-white dark:text-[#93C5FD]
                                       border border-[#0F2854]/50 dark:border-[#93C5FD]/25
                                       hover:opacity-90 transition-all duration-300"
                        >
                            <Maximize2 className="w-3.5 h-3.5" />
                            Full View
                        </a>
                    </div>

                    {/* PDF Viewer card */}
                    <div className="glass rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
                        {/* Toolbar bar inside card */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/20 dark:border-white/8">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#0F2854]/60 dark:text-[#93C5FD]/60" />
                                <span className="text-xs font-medium text-foreground/50">Ansh_Mishra_Resume.pdf</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                            </div>
                        </div>

                        {/* iframe viewer */}
                        <div className="relative bg-black/5 dark:bg-black/20" style={{ height: '80vh', minHeight: '500px' }}>
                            {!iframeLoaded && !iframeError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#0F2854]/20 dark:border-[#93C5FD]/20 border-t-[#0F2854] dark:border-t-[#93C5FD] animate-spin" />
                                    </div>
                                    <p className="text-sm text-foreground/50">Loading resume…</p>
                                </div>
                            )}

                            {iframeError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                                    <FileText className="w-14 h-14 text-[#0F2854]/20 dark:text-[#93C5FD]/20" />
                                    <div>
                                        <p className="text-base font-semibold text-foreground/60 mb-1">Resume preview unavailable</p>
                                        <p className="text-sm text-foreground/40">Place your PDF at <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs">public/resume.pdf</code></p>
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={resumeUrl}
                                            download="Ansh_Mishra_Resume.pdf"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                                                       glass border border-white/30 dark:border-white/15
                                                       text-[#0F2854] dark:text-[#93C5FD]
                                                       hover:bg-[#0F2854] hover:text-white transition-all duration-300"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </a>
                                        <a
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                                                       bg-[#0F2854] dark:bg-[#93C5FD]/20 text-white dark:text-[#93C5FD]
                                                       hover:opacity-90 transition-all duration-300"
                                        >
                                            <Maximize2 className="w-4 h-4" />
                                            Open in Browser
                                        </a>
                                    </div>
                                </div>
                            )}

                            <iframe
                                src={resumeUrl}
                                title="Ansh Mishra — Resume"
                                className={`w-full h-full transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIframeLoaded(true)}
                                onError={() => { setIframeError(true); setIframeLoaded(false); }}
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="mt-5 text-center text-xs text-foreground/35 font-mono">
                        © 2025 Ansh Mishra · Cloud &amp; DevOps Engineer
                    </p>
                </div>
            </main>

            {/* ── Socials section ── */}
            <div className="relative z-10">
                <Socials />
            </div>
        </div>
    );
}
