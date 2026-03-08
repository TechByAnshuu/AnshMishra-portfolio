import { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { ExternalLink, Github, Play, Monitor } from 'lucide-react';

/* ─────────────────────────────────────────────
   Hook: fires once when element enters viewport
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
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

/* ──────────────────────────────────────────
   Mini Browser / Lazy‑iframe preview widget
────────────────────────────────────────── */
function LazyPreview({ url, title }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 group/preview">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/30 dark:bg-black/40 backdrop-blur-md border-b border-white/20 dark:border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="flex-1 mx-3 text-xs text-center truncate text-foreground/40 font-mono select-none">
                    {url}
                </div>
                <Monitor className="w-3.5 h-3.5 text-foreground/30" />
            </div>

            {/* Preview area */}
            <div className="relative w-full aspect-[16/10] bg-white/5 dark:bg-black/20">
                {!loaded ? (
                    /* Click‑to‑load placeholder */
                    <button
                        onClick={() => setLoaded(true)}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 group/btn cursor-pointer w-full"
                        aria-label={`Load live preview of ${title}`}
                    >
                        {/* Blurred bg hint */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />

                        {/* Glow ring */}
                        <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 dark:bg-white/5 border border-white/30 dark:border-white/15 flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-[#0F2854] dark:text-[#93C5FD] ml-0.5" />
                        </div>

                        <p className="relative z-10 text-sm font-medium text-foreground/60 tracking-wide group-hover/btn:text-foreground/80 transition-colors duration-200">
                            Click to load live preview
                        </p>
                        <p className="relative z-10 text-xs text-foreground/35">
                            Lazy‑loaded for performance
                        </p>

                        {/* Animated glow pulse */}
                        <div className="absolute inset-0 rounded-b-2xl border-2 border-[#93C5FD]/0 group-hover/btn:border-[#93C5FD]/20 transition-all duration-500" />
                    </button>
                ) : (
                    <iframe
                        src={url}
                        title={`${title} live preview`}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────
   Tech stack chips
───────────────────────────── */
function TechChips({ tech }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tech.split(' • ').map((t) => (
                <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full
                               bg-white/20 dark:bg-white/8 border border-white/30 dark:border-white/15
                               text-[#0F2854] dark:text-[#93C5FD]
                               backdrop-blur-sm"
                >
                    {t}
                </span>
            ))}
        </div>
    );
}

/* ────────────────────────────────────
   Single project row (alternating)
──────────────────────────────────── */
function ProjectRow({ project, index }) {
    const [ref, visible] = useScrollReveal(0.1);
    const isReversed = index % 2 === 1; // even = details left, odd = preview left

    const details = (
        <div className="flex flex-col justify-center gap-5 py-2">
            {/* Index badge */}
            <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#0F2854]/50 dark:text-[#93C5FD]/40 tracking-widest uppercase">
                    Project 0{index + 1}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#0F2854]/20 dark:from-[#93C5FD]/20 to-transparent" />
            </div>

            <h3 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2854] dark:text-[#93C5FD] leading-tight">
                {project.name}
            </h3>

            <p className="text-foreground/70 text-base leading-relaxed max-w-md">
                {project.desc}
            </p>

            <TechChips tech={project.tech} />

            <div className="flex flex-wrap gap-3 pt-1">
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full
                               glass border border-white/30 dark:border-white/15
                               hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/25
                               hover:text-white dark:hover:text-white
                               hover:border-[#0F2854] dark:hover:border-[#93C5FD]/40
                               hover:-translate-y-0.5 hover:shadow-lg
                               transition-all duration-300 text-sm font-medium"
                >
                    <Github className="w-4 h-4" />
                    GitHub Repo
                </a>

                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full
                                   bg-[#0F2854]/90 dark:bg-[#93C5FD]/20
                                   border border-[#0F2854]/60 dark:border-[#93C5FD]/30
                                   text-white dark:text-[#93C5FD]
                                   hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/35
                                   hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0F2854]/20 dark:hover:shadow-[#93C5FD]/15
                                   transition-all duration-300 text-sm font-medium"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                    </a>
                )}
            </div>
        </div>
    );

    const preview = (
        <div className="relative">
            {/* Ambient glow behind iframe */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-400/10 via-purple-400/8 to-cyan-400/10 blur-xl pointer-events-none" />
            <LazyPreview url={project.liveLink || project.link} title={project.name} />
        </div>
    );

    return (
        <div
            ref={ref}
            className={`
                grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center
                transition-all duration-700 ease-out
                ${visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
            `}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            {isReversed ? (
                <>
                    {/* Mobile: always show details first on mobile */}
                    <div className="md:hidden">{details}</div>
                    <div className="hidden md:block">{preview}</div>
                    <div className="hidden md:block">{details}</div>
                    <div className="md:hidden">{preview}</div>
                </>
            ) : (
                <>
                    <div>{details}</div>
                    <div>{preview}</div>
                </>
            )}
        </div>
    );
}

/* ─────────────────────────────
   Main section export
───────────────────────────── */
export default function Projects() {
    const [headerRef, headerVisible] = useScrollReveal(0.2);
    const featuredProjects = projects.slice(0, 3);

    return (
        <section id="projects" className="min-h-screen py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">

                {/* ── Section Header ── */}
                <div
                    ref={headerRef}
                    className={`text-center mb-20 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        What I've built
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Featured Projects
                    </h2>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </div>

                {/* ── Project Rows ── */}
                <div className="flex flex-col gap-24 lg:gap-32">
                    {featuredProjects.map((project, i) => (
                        <ProjectRow key={project.name} project={project} index={i} />
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="mt-24 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0F2854]/20 dark:via-[#93C5FD]/20 to-transparent" />
                    <span className="text-xs font-mono text-foreground/30 tracking-widest uppercase">end of features</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0F2854]/20 dark:via-[#93C5FD]/20 to-transparent" />
                </div>

                {/* ── View All Projects CTA ── */}
                <ViewAllButton />
            </div>
        </section>
    );
}

function ViewAllButton() {
    const [ref, visible] = useScrollReveal(0.5);

    return (
        <div
            ref={ref}
            className={`mt-12 flex justify-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            <a
                href="/projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full
                           overflow-hidden
                           border border-[#0F2854]/30 dark:border-[#93C5FD]/25
                           text-[#0F2854] dark:text-[#93C5FD]
                           font-semibold text-base tracking-wide
                           hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F2854]/15 dark:hover:shadow-[#93C5FD]/10
                           transition-all duration-400"
            >
                {/* Animated background fill */}
                <span className="absolute inset-0 bg-[#0F2854] dark:bg-[#93C5FD]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out rounded-full" />

                <span className="relative z-10 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                    View All Projects
                </span>
                <ExternalLink className="relative z-10 w-4 h-4 group-hover:text-white dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>
        </div>
    );
}
