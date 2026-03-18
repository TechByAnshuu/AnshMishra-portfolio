import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Code2, GitMerge, Target, Server, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { achievements } from '../data';

/* ── Icon map ── */
const iconMap = {
    'aws-cloud': Server,
    'oci-cloud': Server,
    'oci-devops': GitMerge,
    'crypto-nptel': Target,
    'fcc-webdesign': Code2,
    'udemy-webdev': Code2,
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
            <div className="flex items-center justify-between z-10">
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

            {/* Certificate PDF Preview Thumbnail */}
            {item.pdf && (
                <div className="relative w-full h-36 mt-1 mb-2 rounded-lg overflow-hidden border border-white/10 group/pdf cursor-pointer z-10"
                     onClick={() => window.open(item.pdf, '_blank')}
                     title="Click to view full certificate">
                    {/* The iframe serves as a visual thumbnail. Disable pointer events so it's just a thumbnail. */}
                    <iframe 
                        src={`${item.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-[500px] border-none pointer-events-none origin-top-left"
                        style={{ transform: 'scale(0.35)', width: '285%' }}
                        title={`${item.title} Preview`}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#0F2854]/40 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs font-medium backdrop-blur-md">
                            <ExternalLink className="w-3.5 h-3.5" />
                            View PDF
                        </span>
                    </div>
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
                <p className="text-[13px] text-[#1A1A1A]/65 dark:text-white/60 leading-relaxed max-line-3">
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
export default function Certifications() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, margin: '-60px' });

    return (
        <section id="certifications" className="py-24 px-4 md:px-8 overflow-hidden">
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
                        Certifications
                    </h2>
                    <p className="mt-4 text-base text-[#1A1A1A]/60 dark:text-white/55 max-w-lg mx-auto leading-relaxed">
                        Industry certifications, hackathons, open-source milestones, and achievements from my developer journey.
                    </p>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {achievements.slice(0, 6).map((item, i) => (
                        <AchievementCard key={item.id} item={item} index={i} />
                    ))}
                </div>

                {/* View All Button — always visible if 6 or more items */}
                {achievements.length >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        className="mt-16 flex justify-center"
                    >
                        <Link
                            to="/certifications"
                            onClick={() => window.scrollTo(0, 0)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full
                                       overflow-hidden
                                       border border-[#0F2854]/30 dark:border-[#93C5FD]/25
                                       text-[#0F2854] dark:text-[#93C5FD]
                                       font-semibold text-base tracking-wide
                                       hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F2854]/15 dark:hover:shadow-[#93C5FD]/10
                                       transition-all duration-400"
                        >
                            <span className="absolute inset-0 bg-[#0F2854] dark:bg-[#93C5FD]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out rounded-full" />
                            <span className="relative z-10 group-hover:text-white dark:group-hover:text-white transition-colors duration-300 font-mono text-sm tracking-wide font-medium">
                                View all certifications
                            </span>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:text-white dark:group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
