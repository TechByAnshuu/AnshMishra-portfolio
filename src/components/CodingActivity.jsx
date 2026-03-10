import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, TrendingUp, GitCommit, BookOpen, Star, Users } from 'lucide-react';
import { codingStats } from '../data';

const GH_USER = import.meta.env.VITE_GITHUB_USERNAME ?? 'TechByAnshuu';
const GH_TOKEN = import.meta.env.VITE_GITHUB_TOKEN ?? '';

const GH_HEADERS = GH_TOKEN
    ? { Authorization: `Bearer ${GH_TOKEN}`, Accept: 'application/vnd.github+json' }
    : { Accept: 'application/vnd.github+json' };

/* ──────────────────────────────────────
   Shared card class
────────────────────────────────────── */
const CARD =
    'rounded-2xl border bg-white/80 dark:bg-white/5 backdrop-blur-md ' +
    'border-[#0F2854]/12 dark:border-white/12 shadow-lg';

/* ──────────────────────────────────────
   Count-up hook
────────────────────────────────────── */
function CountUp({ value, suffix = '', duration = 1300 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-10% 0px' });

    useEffect(() => {
        if (!inView) { setDisplay(0); return; }
        if (typeof value !== 'number') { setDisplay(value); return; }
        let start = 0;
        const step = value / (duration / 16);
        const t = setInterval(() => {
            start = Math.min(start + step, value);
            setDisplay(Math.floor(start));
            if (start >= value) clearInterval(t);
        }, 16);
        return () => clearInterval(t);
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {typeof value === 'number' ? display : value}{suffix}
        </span>
    );
}

/* ──────────────────────────────────────
   SVG ring progress
────────────────────────────────────── */
function RingProgress({ value, max, color, size = 52, stroke = 4 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-10% 0px' });
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;

    return (
        <svg ref={ref} width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size / 2} cy={size / 2} r={r}
                fill="none" strokeWidth={stroke}
                className="stroke-black/8 dark:stroke-white/10" />
            <motion.circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={color}
                strokeWidth={stroke} strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: inView ? circ * (1 - Math.min(value / max, 1)) : circ }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
        </svg>
    );
}

/* ──────────────────────────────────────
   Hook: fetch live GitHub profile stats
────────────────────────────────────── */
function useGitHubStats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                // REST: user profile
                const userRes = await fetch(
                    `https://api.github.com/users/${GH_USER}`,
                    { headers: GH_HEADERS }
                );
                const user = await userRes.json();

                // GraphQL: total contributions this year
                const since = new Date(new Date().getFullYear(), 0, 1).toISOString();
                const gqlRes = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: { ...GH_HEADERS, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `{
                            user(login: "${GH_USER}") {
                                contributionsCollection(from: "${since}") {
                                    totalCommitContributions
                                    totalPullRequestContributions
                                    totalIssueContributions
                                }
                                repositories(first: 1, orderBy: {field: STARGAZERS, direction: DESC}) {
                                    totalCount
                                    nodes { stargazerCount }
                                }
                            }
                        }`
                    }),
                });
                const gql = await gqlRes.json();
                const contrib = gql?.data?.user?.contributionsCollection;
                const repos = gql?.data?.user?.repositories;

                setStats({
                    repos: user.public_repos ?? codingStats.github.repos,
                    followers: user.followers ?? 0,
                    commits: contrib
                        ? `${contrib.totalCommitContributions}+`
                        : codingStats.github.commits,
                    stars: repos?.nodes?.[0]?.stargazerCount
                        ? `${repos.nodes[0].stargazerCount}+`
                        : codingStats.github.stars,
                });
            } catch {
                /* Fallback to static data on error */
                setStats(null);
            }
        }
        fetchStats();
    }, []);

    return stats;
}

/* ──────────────────────────────────────
   GitHub card
────────────────────────────────────── */
function GitHubCard() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px' });
    const liveStats = useGitHubStats();
    const g = codingStats.github;

    const statsItems = [
        { icon: GitCommit, label: 'Commits (YTD)', value: liveStats?.commits ?? g.commits },
        { icon: BookOpen, label: 'Repositories', value: liveStats?.repos ?? g.repos },
        { icon: Star, label: 'Top Stars', value: liveStats?.stars ?? g.stars },
        { icon: Users, label: 'Followers', value: liveStats?.followers ?? '—' },
    ];

    /* Streak image URL — token passed as query param for the demolab service */
    const baseStreak = `https://streak-stats.demolab.com?user=${GH_USER}&hide_border=true`;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`col-span-full ${CARD} overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#0F2854]/10 dark:border-white/8">
                <div className="w-8 h-8 rounded-lg bg-[#0F2854]/8 dark:bg-white/8 flex items-center justify-center">
                    <Github className="w-4 h-4 text-[#0F2854] dark:text-[#93C5FD]" strokeWidth={1.75} />
                </div>
                <div>
                    <h3 className="text-sm font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        GitHub Contributions
                    </h3>
                    <p className="text-[11px] text-[#0F2854]/50 dark:text-white/40 font-mono flex items-center gap-1">
                        @{GH_USER}
                        {liveStats && (
                            <span className="inline-flex items-center gap-1 text-green-500 dark:text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                live
                            </span>
                        )}
                    </p>
                </div>
                <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1.5 text-xs text-[#0F2854]/40 dark:text-white/35
                               hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors">
                    View Profile <ExternalLink className="w-3 h-3" />
                </a>
            </div>

            <div className="p-6 flex flex-col gap-5">
                {/* Streak card — light mode */}
                <div className="w-full rounded-xl overflow-x-auto border border-[#0F2854]/8 dark:border-white/8 bg-[#0F2854]/3 dark:bg-black/20">
                    <img
                        src={`${baseStreak}&theme=transparent&ring=0F2854&fire=0F2854&currStreakLabel=0F2854&sideLabels=374151&dates=6b7280&sideNums=0F2854&currStreakNum=0F2854`}
                        alt="GitHub Streak Stats"
                        className="w-full h-auto object-contain dark:hidden"
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <img
                        src={`${baseStreak}&theme=transparent&ring=60A5FA&fire=A78BFA&currStreakLabel=93C5FD&sideLabels=93C5FD&dates=6b7280&sideNums=93C5FD&currStreakNum=60A5FA`}
                        alt="GitHub Streak Stats"
                        className="w-full h-auto object-contain hidden dark:block"
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                </div>

                {/* Contribution heatmap */}
                <div className="w-full rounded-xl overflow-x-auto border border-[#0F2854]/8 dark:border-white/8 p-3 bg-[#0F2854]/3 dark:bg-black/20">
                    <img
                        src={`https://ghchart.rshah.org/0F2854/${GH_USER}`}
                        alt="Contribution Heatmap"
                        className="w-full h-auto dark:hidden opacity-80"
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <img
                        src={`https://ghchart.rshah.org/60A5FA/${GH_USER}`}
                        alt="Contribution Heatmap"
                        className="w-full h-auto hidden dark:block opacity-80"
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                </div>

                {/* Live stat chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {statsItems.map(({ icon: Icon, label, value }) => (
                        <div key={label}
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl
                                       bg-[#0F2854]/5 dark:bg-white/5
                                       border border-[#0F2854]/10 dark:border-white/10">
                            <Icon className="w-4 h-4 text-[#0F2854] dark:text-[#60A5FA]" strokeWidth={1.75} />
                            <span className="text-base font-bold font-mono text-[#0F2854] dark:text-[#93C5FD]">
                                {typeof value === 'number'
                                    ? <CountUp value={value} />
                                    : value}
                            </span>
                            <span className="text-[10px] text-[#0F2854]/50 dark:text-white/40 tracking-wide text-center">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ──────────────────────────────────────
   Platform stat card
────────────────────────────────────── */
function PlatformCard({ platform, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px' });

    return (
        <motion.a
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className={`group relative ${CARD} p-5 flex flex-col gap-5 cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300`}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-heading font-semibold" style={{ color: platform.color }}>
                    {platform.name}
                </h3>
                <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{ color: platform.color, borderColor: `${platform.color}55`, background: `${platform.color}18` }}
                >
                    {platform.badge}
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {platform.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                            <RingProgress value={stat.value} max={stat.max} color={platform.color} size={48} stroke={3.5} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[9px] font-bold font-mono" style={{ color: platform.color }}>
                                    {Math.round((stat.value / stat.max) * 100)}%
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-[#0F2854]/55 dark:text-white/45 mb-0.5 truncate">{stat.label}</p>
                            <p className="text-sm font-bold font-mono text-[#0F2854] dark:text-white/80">
                                <CountUp value={stat.value} suffix={stat.suffix} />
                            </p>
                        </div>
                        <div className="w-14 h-1.5 rounded-full bg-[#0F2854]/10 dark:bg-white/8 overflow-hidden flex-shrink-0">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: platform.color }}
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${(stat.value / stat.max) * 100}%` } : { width: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-[11px] text-[#0F2854]/35 dark:text-white/30 group-hover:text-[#0F2854]/60 dark:group-hover:text-white/60 transition-colors flex items-center gap-1 mt-auto">
                <ExternalLink className="w-3 h-3" /> View profile
            </p>
        </motion.a>
    );
}

/* ──────────────────────────────────────
   Section export
────────────────────────────────────── */
export default function CodingActivity() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, margin: '-60px' });

    return (
        <section id="coding-activity" className="min-h-screen py-24 px-4 md:px-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Coding Journey
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Activity & Stats
                    </h2>
                    <p className="mt-4 text-base text-[#1A1A1A]/60 dark:text-white/55 max-w-lg mx-auto leading-relaxed">
                        A snapshot of my coding consistency and contributions across platforms.
                    </p>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GitHubCard />
                    {codingStats.platforms.map((platform, i) => (
                        <PlatformCard key={platform.id} platform={platform} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
