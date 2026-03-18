import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data';
import { ExternalLink, Github, ArrowLeft, Search, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Socials from '../components/Socials';

/* Lazy load the heavy WebGL background */
const LiquidEther = lazy(() => import('../components/LiquidEther'));

function useScrollReveal(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

function TechChips({ tech }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {tech.split(' • ').map((t) => (
                <span key={t}
                    className="px-2.5 py-0.5 text-[10px] font-medium rounded-full
                               bg-[#0F2854]/8 dark:bg-white/8
                               border border-[#0F2854]/15 dark:border-white/15
                               text-[#0F2854] dark:text-[#93C5FD]">
                    {t}
                </span>
            ))}
        </div>
    );
}

function ProjectCard({ project, index }) {
    const [ref, visible] = useScrollReveal(0.08);

    const gradients = [
        'from-blue-600/30 via-purple-600/20 to-cyan-600/30',
        'from-emerald-600/30 via-teal-600/20 to-blue-600/30',
        'from-rose-600/30 via-pink-600/20 to-orange-600/30',
        'from-violet-600/30 via-indigo-600/20 to-blue-600/30',
        'from-amber-600/30 via-yellow-600/20 to-lime-600/30',
        'from-sky-600/30 via-blue-600/20 to-indigo-600/30',
    ];
    const gradClass = gradients[index % gradients.length];

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${(index % 3) * 80}ms` }}
            className={`
                group flex flex-col rounded-2xl overflow-hidden
                bg-white/75 dark:bg-white/5 backdrop-blur-md
                border border-[#0F2854]/12 dark:border-white/10
                shadow-xl hover:shadow-2xl
                hover:-translate-y-2 hover:border-[#0F2854]/20 dark:hover:border-white/20
                transition-all duration-400 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
        >
            <div className={`relative h-44 bg-gradient-to-br ${gradClass} flex items-center justify-center overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                <span className="text-5xl font-heading font-bold text-white/20 select-none tracking-tighter">
                    {project.name.slice(0, 2).toUpperCase()}
                </span>
                {project.liveLink && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-medium text-green-300">Live</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] leading-tight group-hover:text-[#1a3a7a] dark:group-hover:text-white transition-colors duration-300">
                    {project.name}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed flex-1">{project.desc}</p>
                <TechChips tech={project.tech} />

                <div className="flex gap-2 pt-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
                                   bg-[#0F2854]/8 dark:bg-white/8
                                   border border-[#0F2854]/15 dark:border-white/15
                                   text-[#0F2854] dark:text-white
                                   hover:bg-[#0F2854] hover:text-white dark:hover:bg-[#93C5FD]/25
                                   hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                        <Github className="w-3.5 h-3.5" />GitHub
                    </a>
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
                                       bg-[#0F2854]/80 dark:bg-[#93C5FD]/20
                                       border border-[#0F2854]/50 dark:border-[#93C5FD]/25
                                       text-white dark:text-[#93C5FD]
                                       hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/35
                                       hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                            <ExternalLink className="w-3.5 h-3.5" />Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AllProjectsPage() {
    const { theme } = useTheme();
    const [query, setQuery] = useState('');
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeaderVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const filtered = query.trim()
        ? projects.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tech.toLowerCase().includes(query.toLowerCase()) ||
            p.desc.toLowerCase().includes(query.toLowerCase())
        )
        : projects;

    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 z-0">
                <Suspense fallback={null}>
                    <LiquidEther
                        colors={theme === 'dark' ? ['#B388FF'] : ['#4FC3F7']}
                        mouseForce={20} cursorSize={100} isViscous={false}
                        viscous={30} iterationsViscous={32} iterationsPoisson={32}
                        resolution={0.5} isBounce={false} autoDemo={true}
                        autoSpeed={0.5} autoIntensity={2.2} takeoverDuration={0.25}
                        autoResumeDelay={3000} autoRampDuration={0.6}
                    />
                </Suspense>
            </div>

            <ThemeToggle />

            <main className="relative z-10 min-h-screen py-20 px-6 md:px-10">
                <div className="max-w-6xl mx-auto">

                    <div className={`mb-10 transition-all duration-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium
                                   text-[#0F2854]/60 dark:text-foreground/50
                                   hover:text-[#0F2854] dark:hover:text-[#93C5FD]
                                   hover:-translate-x-1 transition-all duration-300">
                            <ArrowLeft className="w-4 h-4" />Back to Portfolio
                        </Link>
                    </div>

                    <div className={`mb-12 transition-all duration-600 delay-75 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                            Everything I've shipped
                        </p>
                        <h1 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] mb-4">
                            All Projects
                        </h1>
                        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                    </div>

                    <div className={`mb-10 transition-all duration-600 delay-150 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="relative max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                                placeholder="Search by name, tech, or keyword…"
                                className="w-full pl-11 pr-10 py-3 rounded-full text-sm
                                           bg-white/80 dark:bg-white/5
                                           border border-[#0F2854]/15 dark:border-white/15
                                           text-foreground placeholder:text-foreground/40
                                           focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/30
                                           focus:shadow-lg focus:shadow-[#0F2854]/10
                                           transition-all duration-300 outline-none" />
                            {query && (
                                <button onClick={() => setQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <p className="mt-3 text-xs text-foreground/40 font-mono">
                            {filtered.length === projects.length ? `${projects.length} projects` : `${filtered.length} of ${projects.length} matched`}
                        </p>
                    </div>

                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((project, i) => <ProjectCard key={project.name} project={project} index={i} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                            <div className="text-5xl">🔍</div>
                            <p className="text-foreground/50 text-base">No projects match <span className="font-semibold text-foreground/70">"{query}"</span></p>
                            <button onClick={() => setQuery('')} className="mt-2 text-sm text-[#0F2854] dark:text-[#93C5FD] hover:underline">Clear search</button>
                        </div>
                    )}
                </div>
            </main>

            <div className="relative z-10"><Socials /></div>
        </div>
    );
}