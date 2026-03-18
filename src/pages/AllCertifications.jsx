import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { achievements } from '../data';
import { ArrowLeft, Search, X, Award, Code2, GitMerge, Target, Server, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Socials from '../components/Socials';

/* Lazy load the heavy WebGL background */
const LiquidEther = lazy(() => import('../components/LiquidEther'));

const iconMap = {
    'aws-cloud': Server, 'oci-cloud': Server, 'oci-devops': GitMerge,
    'crypto-nptel': Target, 'fcc-webdesign': Code2, 'udemy-webdev': Code2,
};

const typeMeta = {
    certification: { label: 'Certification', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.30)' },
    achievement: { label: 'Achievement', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.30)' },
};

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

function AchievementCard({ item, index }) {
    const [ref, visible] = useScrollReveal(0.08);
    const [pdfOpen, setPdfOpen] = useState(false);
    const Icon = iconMap[item.id] ?? Award;
    const meta = typeMeta[item.type] ?? typeMeta.achievement;

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${(index % 3) * 80}ms` }}
            className={`
                group relative flex flex-col gap-4 rounded-2xl p-5 overflow-hidden
                bg-white/80 dark:bg-white/5 backdrop-blur-md
                border border-[#0F2854]/12 dark:border-white/12
                shadow-md hover:shadow-xl hover:-translate-y-1.5
                transition-all duration-400 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
        >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 36px ${item.glow}` }} />

            {/* Icon + type badge */}
            <div className="flex items-center justify-between z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15`, border: `1.5px solid ${item.color}50`, boxShadow: `0 0 10px ${item.glow}` }}>
                    <Icon className="w-[18px] h-[18px]" style={{ color: item.color }} strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-mono font-semibold tracking-wide px-2.5 py-0.5 rounded-full border"
                    style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.border }}>
                    {meta.label}
                </span>
            </div>

            {/* PDF Preview — replaced iframe with a click-to-open button for performance & iOS compat */}
            {item.pdf && (
                <div className="z-10">
                    {pdfOpen ? (
                        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[#0F2854]/10 dark:border-white/10">
                            <iframe
                                src={`${item.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-[500px] border-none pointer-events-none origin-top-left"
                                style={{ transform: 'scale(0.35)', width: '285%' }}
                                title={`${item.title} Preview`}
                            />
                            <button
                                onClick={() => window.open(item.pdf, '_blank')}
                                className="absolute inset-0 flex items-center justify-center
                                           bg-[#0F2854]/30 dark:bg-black/40 backdrop-blur-[2px]
                                           opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs font-medium backdrop-blur-md">
                                    <ExternalLink className="w-3.5 h-3.5" />View PDF
                                </span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setPdfOpen(true)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium
                                       bg-[#0F2854]/6 dark:bg-white/5
                                       border border-[#0F2854]/12 dark:border-white/10
                                       text-[#0F2854]/60 dark:text-white/50
                                       hover:bg-[#0F2854]/10 hover:text-[#0F2854] dark:hover:text-white
                                       transition-all duration-200">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Preview Certificate
                        </button>
                    )}
                </div>
            )}

            {/* Text */}
            <div className="flex-1 flex flex-col gap-1.5 z-10">
                <h3 className="text-[14px] font-heading font-semibold leading-snug text-[#0F2854] dark:text-[#93C5FD]">
                    {item.title}
                </h3>
                <p className="text-[11px] font-mono text-[#0F2854]/50 dark:text-white/40">
                    {item.issuer} · {item.year}
                </p>
                <p className="text-[13px] text-[#1A1A1A]/65 dark:text-white/60 leading-relaxed pt-1 line-clamp-3">
                    {item.desc}
                </p>
            </div>

            {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#0F2854]/40 dark:text-white/35
                               hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors w-fit z-10 mt-1">
                    <ExternalLink className="w-3 h-3" />View details
                </a>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
        </div>
    );
}

export default function AllCertificationsPage() {
    const { theme } = useTheme();
    const [query, setQuery] = useState('');
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeaderVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const filtered = query.trim()
        ? achievements.filter(c =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.issuer.toLowerCase().includes(query.toLowerCase()) ||
            c.desc.toLowerCase().includes(query.toLowerCase()) ||
            c.type.toLowerCase().includes(query.toLowerCase())
        )
        : achievements;

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
                        <Link to="/#certifications"
                            className="inline-flex items-center gap-2 text-sm font-medium
                                       text-[#0F2854]/60 dark:text-foreground/50
                                       hover:text-[#0F2854] dark:hover:text-[#93C5FD]
                                       hover:-translate-x-1 transition-all duration-300">
                            <ArrowLeft className="w-4 h-4" />Back to Portfolio
                        </Link>
                    </div>

                    <div className={`mb-12 transition-all duration-600 delay-75 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                            Milestones & Recognition
                        </p>
                        <h1 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] mb-4">
                            All Certifications
                        </h1>
                        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                    </div>

                    <div className={`mb-10 transition-all duration-600 delay-150 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="relative max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                                placeholder="Search by title, issuer, or keyword…"
                                className="w-full pl-11 pr-10 py-3 rounded-full text-sm
                                           bg-white/80 dark:bg-white/5
                                           border border-[#0F2854]/15 dark:border-white/15
                                           text-foreground placeholder:text-foreground/40
                                           focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/30
                                           transition-all duration-300 outline-none" />
                            {query && (
                                <button onClick={() => setQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <p className="mt-3 text-xs text-foreground/40 font-mono">
                            {filtered.length === achievements.length ? `${achievements.length} items` : `${filtered.length} of ${achievements.length} matched`}
                        </p>
                    </div>

                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((item, i) => <AchievementCard key={item.id + i} item={item} index={i} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                            <div className="text-5xl">🔍</div>
                            <p className="text-foreground/50 text-base">No results match <span className="font-semibold text-foreground/70">"{query}"</span></p>
                            <button onClick={() => setQuery('')} className="mt-2 text-sm text-[#0F2854] dark:text-[#93C5FD] hover:underline">Clear search</button>
                        </div>
                    )}
                </div>
            </main>

            <div className="relative z-10"><Socials /></div>
        </div>
    );
}