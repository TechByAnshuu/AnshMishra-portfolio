import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Code2, GitMerge, Target, Server, ExternalLink } from 'lucide-react';
import { achievements } from '../data';

/* ── Icon map ── */
const iconMap = {
    aws: Server,
    docker: Server,
    hackathon: Trophy,
    opensource: GitMerge,
    'leetcode-milestone': Target,
    linux: Code2,
};

/* ── Type badge meta ── */
const typeMeta = {
    certification: { label: 'Certification', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.30)' },
    achievement: { label: 'Achievement', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.30)' },
};

/* ──────────────────────────────────────
   Card
────────────────────────────────────── */
function AchievementCard({ item, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px' });
    const Icon = iconMap[item.id] ?? Award;
    const meta = typeMeta[item.type] ?? typeMeta.achievement;
    const col = index % 3;
    const xInit = col === 0 ? -36 : col === 2 ? 36 : 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28, x: xInit }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 28, x: xInit }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
            className="group relative flex flex-col gap-4 rounded-2xl p-5 overflow-hidden
                       bg-white/85 dark:bg-white/5 backdrop-blur-md
                       border border-[#0F2854]/12 dark:border-white/12
                       shadow-md hover:shadow-xl hover:-translate-y-1.5
                       transition-all duration-300"
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 36px ${item.glow}` }}
            />

            {/* Icon + type badge */}
            <div className="flex items-center justify-between">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                        backgroundColor: `${item.color}15`,
                        border: `1.5px solid ${item.color}50`,
                        boxShadow: `0 0 10px ${item.glow}`,
                    }}
                >
                    <Icon className="w-[18px] h-[18px]" style={{ color: item.color }} strokeWidth={1.75} />
                </div>

                <span
                    className="text-[10px] font-mono font-semibold tracking-wide px-2.5 py-0.5 rounded-full border"
                    style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.border }}
                >
                    {meta.label}
                </span>
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col gap-1.5">
                <h3 className="text-[14px] font-heading font-semibold leading-snug text-[#0F2854] dark:text-[#93C5FD]">
                    {item.title}
                </h3>
                <p className="text-[11px] font-mono text-[#0F2854]/50 dark:text-white/40">
                    {item.issuer} · {item.year}
                </p>
                <p className="text-[13px] text-[#1A1A1A]/65 dark:text-white/60 leading-relaxed">
                    {item.desc}
                </p>
            </div>

            {/* Verify link */}
            {item.link && (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#0F2854]/40 dark:text-white/35
                               hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors w-fit"
                >
                    <ExternalLink className="w-3 h-3" />
                    View details
                </a>
            )}

            {/* Bottom accent bar on hover */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl
                           opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
            />
        </motion.div>
    );
}

/* ──────────────────────────────────────
   Section export
────────────────────────────────────── */
export default function Achievements() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, margin: '-60px' });

    return (
        <section id="achievements" className="py-24 px-4 md:px-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Recognition
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Achievements
                    </h2>
                    <p className="mt-4 text-base text-[#1A1A1A]/60 dark:text-white/55 max-w-lg mx-auto leading-relaxed">
                        Certifications, hackathons, open-source, and milestones from my developer journey.
                    </p>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {achievements.map((item, i) => (
                        <AchievementCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
