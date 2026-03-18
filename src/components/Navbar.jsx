import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

/* ── Nav items ── */
const NAV_ITEMS = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Education', id: 'education' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Activity', id: 'coding-activity' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Socials', id: 'socials' },
];

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ──────────────────────────────────────
   Scroll progress bar
────────────────────────────────────── */
function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200]
                       bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#38BDF8]"
            style={{ scaleX }}
        />
    );
}

/* ──────────────────────────────────────
   Active section tracker
   — updates instantly on click (via setActiveOnClick)
   — IntersectionObserver handles passive scroll tracking
────────────────────────────────────── */
function useActiveSection() {
    const [active, setActive] = useState('hero');
    // Lock prevents observer overriding a user-clicked selection mid-scroll
    const locked = useRef(false);
    const lockTimer = useRef(null);

    // Expose a click handler that locks briefly
    const setActiveOnClick = (id) => {
        setActive(id);
        locked.current = true;
        clearTimeout(lockTimer.current);
        lockTimer.current = setTimeout(() => { locked.current = false; }, 900);
    };

    useEffect(() => {
        const observers = [];
        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !locked.current) setActive(id);
                },
                { threshold: 0.2, rootMargin: '-72px 0px -20% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => {
            observers.forEach(o => o.disconnect());
            clearTimeout(lockTimer.current);
        };
    }, []);

    return { active, setActiveOnClick };
}

/* ──────────────────────────────────────
   Desktop nav link
────────────────────────────────────── */
function NavLink({ item, active, onClick }) {
    const isActive = active === item.id;
    return (
        <button
            onClick={() => onClick(item.id)}
            className="group relative flex flex-col items-center gap-0.5 cursor-pointer"
        >
            <span className={`
                text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200
                ${isActive
                    ? 'text-[#0F2854] dark:text-[#93C5FD]'
                    : 'text-[#0F2854]/40 dark:text-white/35 group-hover:text-[#0F2854]/75 dark:group-hover:text-white/75'
                }
            `}>
                {item.label}
            </span>

            {/* Underline */}
            <span className="relative h-[1.5px] w-full overflow-hidden rounded-full">
                <span className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out
                    ${isActive ? 'w-full bg-[#0F2854] dark:bg-[#93C5FD]' : 'w-0 bg-[#0F2854]/40 dark:bg-[#93C5FD]/40 group-hover:w-full'}`}
                />
            </span>

            {/* Active dot */}
            {isActive && (
                <motion.span
                    layoutId="nav-dot"
                    className="w-1 h-1 rounded-full bg-[#0F2854] dark:bg-[#93C5FD]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
            )}
        </button>
    );
}

/* ──────────────────────────────────────
   Theme toggle button (inline)
────────────────────────────────────── */
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

/* ──────────────────────────────────────
   Mobile slide-in panel
────────────────────────────────────── */
function MobileMenu({ open, onClose, active, onClickItem }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[150] bg-black/25 backdrop-blur-sm"
                    />
                    <motion.nav
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed top-0 right-0 bottom-0 z-[160] w-60
                                   bg-white/95 dark:bg-[#0a0a14]/95 backdrop-blur-xl
                                   border-l border-[#0F2854]/10 dark:border-white/10
                                   shadow-2xl flex flex-col pt-20 px-8 gap-5"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-xl
                                       text-[#0F2854]/45 dark:text-white/35
                                       hover:text-[#0F2854] dark:hover:text-white
                                       hover:bg-[#0F2854]/5 dark:hover:bg-white/8
                                       transition-all duration-200"
                        >
                            <X className="w-4.5 h-4.5" />
                        </button>

                        {NAV_ITEMS.map((item, i) => {
                            const isActive = active === item.id;
                            return (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.3 }}
                                    onClick={() => { onClickItem(item.id); onClose(); }}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#0F2854] dark:bg-[#93C5FD]' : 'bg-[#0F2854]/20 dark:bg-white/20'}`}
                                    />
                                    <span className={`text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${isActive
                                        ? 'text-[#0F2854] dark:text-[#93C5FD]'
                                        : 'text-[#0F2854]/50 dark:text-white/40 hover:text-[#0F2854] dark:hover:text-white'
                                        }`}>
                                        {item.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
}

/* ──────────────────────────────────────
   Main export
────────────────────────────────────── */
export default function Navbar() {
    const { active, setActiveOnClick } = useActiveSection();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <>
            <ScrollProgressBar />

            {/* ── Full-width top bar (no pill) ── */}
            <motion.header
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className={`
                    fixed top-0 left-0 right-0 z-[100]
                    hidden md:flex items-center justify-between
                    px-10 h-14
                    transition-all duration-400
                    ${scrolled
                        ? 'bg-white/70 dark:bg-black/55 backdrop-blur-xl border-b border-[#0F2854]/8 dark:border-white/8 shadow-sm'
                        : 'bg-transparent border-b border-transparent'
                    }
                `}
            >
                {/* Logo on the left */}
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-9 w-auto object-contain cursor-pointer transition-transform hover:scale-105 invert dark:invert-0"
                    onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                />

                <div className="flex items-center gap-7">
                    {NAV_ITEMS.map(item => (
                        <NavLink key={item.id} item={item} active={active} onClick={(id) => { setActiveOnClick(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} />
                    ))}

                    {/* Divider */}
                    <span className="h-4 w-px bg-[#0F2854]/15 dark:bg-white/12" />

                    {/* Theme toggle — lives here now */}
                    <ThemeBtn />
                </div>
            </motion.header>

            {/* ── Mobile bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 h-12
                            bg-white/70 dark:bg-black/55 backdrop-blur-xl
                            border-b border-[#0F2854]/8 dark:border-white/8">
                {/* Logo on the left */}
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-auto object-contain cursor-pointer invert dark:invert-0"
                    onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                />

                <div className="flex items-center gap-3">
                    <ThemeBtn />
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex items-center justify-center w-8 h-8 rounded-full
                                   text-[#0F2854]/60 dark:text-white/50
                                   hover:text-[#0F2854] dark:hover:text-white
                                   hover:bg-[#0F2854]/8 dark:hover:bg-white/10
                                   transition-all duration-200"
                        aria-label="Open menu"
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} active={active} onClickItem={(id) => { setActiveOnClick(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} />
        </>
    );
}
