import { repos } from '../data';
import { ExternalLink, GitPullRequest, GitMerge, Star, Code2, Zap, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

/* ── PR type pill ── */
const TYPE_STYLES = {
    feat: { label: 'Feature', bg: 'bg-blue-500/15 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/25' },
    fix: { label: 'Bug Fix', bg: 'bg-orange-500/15 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/25' },
    chore: { label: 'Chore', bg: 'bg-gray-500/15 dark:bg-gray-500/20', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500/25' },
};

/* ── Status badge ── */
const STATUS_STYLES = {
    merged: { label: 'Merged', bg: 'bg-purple-500/15', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/25', icon: GitMerge },
    open: { label: 'Open', bg: 'bg-green-500/15', text: 'text-green-600 dark:text-green-400', border: 'border-green-500/25', icon: GitPullRequest },
};

function PRCard({ pr, index }) {
    const [open, setOpen] = useState(false);
    const type = TYPE_STYLES[pr.type] ?? TYPE_STYLES.feat;
    const status = STATUS_STYLES[pr.status] ?? STATUS_STYLES.merged;
    const StatusIcon = status.icon;

    return (
        <div className={`rounded-2xl border transition-all duration-300
                         ${open
                ? 'border-[#0F2854]/20 dark:border-[#93C5FD]/20 shadow-xl bg-white/15 dark:bg-white/5'
                : 'border-white/30 dark:border-white/10 shadow-md bg-white/8 dark:bg-white/3 hover:bg-white/15 dark:hover:bg-white/6'
            }`}>

            {/* ── PR header (always visible) ── */}
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full text-left px-5 py-4 flex items-start gap-4 group"
            >
                {/* PR number glyph */}
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 mt-0.5 rounded-lg
                                 bg-[#0F2854]/8 dark:bg-[#93C5FD]/8
                                 border border-[#0F2854]/12 dark:border-[#93C5FD]/12
                                 text-[#0F2854]/50 dark:text-[#93C5FD]/50 text-xs font-mono font-bold">
                    #{index + 1}
                </span>

                <div className="flex-1 min-w-0">
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Type */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${type.bg} ${type.text} ${type.border}`}>
                            {type.label}
                        </span>
                        {/* Status */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${status.bg} ${status.text} ${status.border}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                        </span>
                        {/* Area */}
                        {pr.area && (
                            <span className="text-[10px] font-mono text-foreground/35">{pr.area}</span>
                        )}
                    </div>

                    {/* Title */}
                    <p className="text-sm md:text-base font-medium text-foreground/80
                                  group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD]
                                  transition-colors duration-200 leading-snug pr-6 font-mono">
                        {pr.title}
                    </p>

                    {/* Tech chips (visible always) */}
                    {pr.tech && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {pr.tech.map(t => (
                                <span key={t}
                                    className="px-2 py-0.5 rounded-full text-[10px] font-medium
                                               bg-white/20 dark:bg-white/8 border border-white/30 dark:border-white/12
                                               text-[#0F2854]/70 dark:text-[#93C5FD]/70">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Expand chevron */}
                <ChevronDown className={`flex-shrink-0 w-4 h-4 mt-1 text-foreground/35
                                        transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* ── Expanded details ── */}
            {open && (
                <div className="px-5 pb-5 space-y-4 border-t border-white/15 dark:border-white/8 pt-4 ml-12">

                    {/* What I did */}
                    {pr.description && (
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
                                What I Contributed
                            </p>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {pr.description}
                            </p>
                        </div>
                    )}

                    {/* Impact */}
                    {pr.impact && (
                        <div className="flex items-start gap-3 px-4 py-3 rounded-xl
                                        bg-gradient-to-r from-[#0F2854]/6 to-[#93C5FD]/6
                                        dark:from-[#93C5FD]/8 dark:to-[#B388FF]/8
                                        border border-[#0F2854]/10 dark:border-[#93C5FD]/12">
                            <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0F2854]/60 dark:text-[#93C5FD]/60" />
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-0.5">Impact</p>
                                <p className="text-sm text-foreground/70">{pr.impact}</p>
                            </div>
                        </div>
                    )}

                    {/* View on GitHub */}
                    <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                                   bg-[#0F2854]/10 dark:bg-[#93C5FD]/10
                                   border border-[#0F2854]/15 dark:border-[#93C5FD]/15
                                   text-[#0F2854] dark:text-[#93C5FD]
                                   hover:bg-[#0F2854] hover:text-white dark:hover:bg-[#93C5FD]/25
                                   transition-all duration-300 hover:scale-105 group"
                    >
                        <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                        View Pull Request on GitHub
                    </a>
                </div>
            )}
        </div>
    );
}

function RepoCard({ repo }) {
    return (
        <div className="glass rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">

            {/* ── Repo header ── */}
            <div className="px-6 md:px-8 py-6 border-b border-white/20 dark:border-white/8
                            bg-gradient-to-r from-[#0F2854]/5 via-transparent to-[#93C5FD]/5
                            dark:from-[#93C5FD]/5 dark:via-transparent dark:to-[#B388FF]/5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Left: name + description */}
                    <div className="flex items-start gap-4">
                        {/* Globe icon */}
                        <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl
                                         bg-gradient-to-br from-[#0F2854]/15 to-[#93C5FD]/15
                                         border border-white/25 dark:border-white/10 shadow-md">
                            <Globe className="w-5 h-5 text-[#0F2854] dark:text-[#93C5FD]" />
                        </span>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-xl md:text-2xl font-heading font-bold text-[#0F2854] dark:text-[#93C5FD]">
                                    {repo.name}
                                </h3>
                                {repo.role && (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider
                                                     bg-purple-500/15 border border-purple-500/25 text-purple-600 dark:text-purple-400">
                                        {repo.role}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-foreground/60 mt-1 max-w-2xl leading-relaxed">
                                {repo.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: stats pills */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {repo.stars && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                            bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400
                                            text-xs font-semibold">
                                <Star className="w-3.5 h-3.5" />
                                {repo.stars} Stars
                            </div>
                        )}
                        {repo.language && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                            bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400
                                            text-xs font-semibold">
                                <Code2 className="w-3.5 h-3.5" />
                                {repo.language}
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                        bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400
                                        text-xs font-semibold">
                            <GitPullRequest className="w-3.5 h-3.5" />
                            {repo.prs.length} PR{repo.prs.length > 1 ? 's' : ''} Submitted
                        </div>
                    </div>
                </div>
            </div>

            {/* ── PR cards ── */}
            <div className="p-6 md:p-8 space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/35 mb-4">
                    Pull Requests — Click to expand
                </p>
                {repo.prs.map((pr, i) => (
                    <PRCard key={i} pr={pr} index={i} />
                ))}
            </div>
        </div>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-16 md:p-8">
            <div className="max-w-5xl w-full">

                {/* Section heading */}
                <div className="text-center mb-12">
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Real-world Impact
                    </p>
                    <h2 className="text-3xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Open Source
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    <p className="mt-4 text-sm text-foreground/50 max-w-lg mx-auto leading-relaxed">
                        Shipped production-grade contributions to large open-source codebases — real PRs, real reviews, real impact.
                    </p>
                </div>

                {/* Repo cards */}
                <div className="space-y-8">
                    {repos.map((repo, i) => (
                        <RepoCard key={i} repo={repo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
