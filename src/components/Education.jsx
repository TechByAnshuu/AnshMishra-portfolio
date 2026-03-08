import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Code2, Globe, Layers, Cloud, Rocket } from 'lucide-react';

/* ─── Timeline data ─── */
const milestones = [
    {
        year: '2023',
        label: 'B.Tech Begins',
        title: 'Started B.Tech',
        body: 'Began my journey in Computer Science. Dived into programming fundamentals, logic building, and problem-solving that would shape everything ahead.',
        Icon: GraduationCap,
        side: 'left',
    },
    {
        year: '2023',
        label: 'Core CS',
        title: 'Programming Basics',
        body: 'Learned C programming, algorithms, and data structures fundamentals — the bedrock of every great software engineer.',
        Icon: Code2,
        side: 'right',
    },
    {
        year: '2024',
        label: 'Building the Web',
        title: 'Web Development',
        body: 'Picked up HTML, CSS, and modern JavaScript. Started building interactive, responsive websites from scratch.',
        Icon: Globe,
        side: 'left',
    },
    {
        year: '2024',
        label: 'React & UI/UX',
        title: 'Frontend Frameworks',
        body: 'Built projects with React.js, explored Tailwind CSS, and developed a sharp eye for polished UI/UX design.',
        Icon: Layers,
        side: 'right',
    },
    {
        year: '2025',
        label: 'Going Cloud-native',
        title: 'DevOps & Cloud',
        body: 'Embraced Docker, Kubernetes, CI/CD pipelines, and AWS. Automated deployments and built infrastructure-as-code for real systems.',
        Icon: Cloud,
        side: 'left',
    },
    {
        year: 'Now',
        label: 'Shipping to Prod',
        title: 'Advanced Projects',
        body: 'Building production-grade full-stack and DevOps projects — contributing to open-source and solving real-world engineering problems.',
        Icon: Rocket,
        side: 'right',
    },
];

/* ─── Animated card ─── */
function TimelineCard({ item, index }) {
    const ref = useRef(null);
    // once: false → re-animates when scrolling back up
    const inView = useInView(ref, { once: false, margin: '-80px' });
    const isLeft = item.side === 'left';

    return (
        <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0">

            {/* ── LEFT slot ── */}
            <div className="flex justify-end pr-8 md:pr-12">
                {isLeft ? (
                    <motion.div
                        initial={{ opacity: 0, x: -56 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -56 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                        className="max-w-xs w-full"
                    >
                        <Card item={item} />
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xs font-mono tracking-widest text-foreground/20 self-center select-none"
                    >
                        {item.year}
                    </motion.span>
                )}
            </div>

            {/* ── Centre node ── */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'backOut', delay: 0.02 }}
                className="flex flex-col items-center z-10"
            >
                <GlowNode Icon={item.Icon} index={index} />
            </motion.div>

            {/* ── RIGHT slot ── */}
            <div className="flex justify-start pl-8 md:pl-12">
                {!isLeft ? (
                    <motion.div
                        initial={{ opacity: 0, x: 56 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 56 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                        className="max-w-xs w-full"
                    >
                        <Card item={item} />
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xs font-mono tracking-widest text-foreground/20 self-center select-none"
                    >
                        {item.year}
                    </motion.span>
                )}
            </div>
        </div>
    );
}

/* ─── Glowing node ─── */
const nodeColors = [
    { ring: '#60A5FA', glow: 'rgba(96,165,250,0.4)' },
    { ring: '#A78BFA', glow: 'rgba(167,139,250,0.4)' },
    { ring: '#34D399', glow: 'rgba(52,211,153,0.4)' },
    { ring: '#F472B6', glow: 'rgba(244,114,182,0.4)' },
    { ring: '#FBBF24', glow: 'rgba(251,191,36,0.4)' },
    { ring: '#38BDF8', glow: 'rgba(56,189,248,0.4)' },
];

function GlowNode({ Icon, index }) {
    const color = nodeColors[index % nodeColors.length];
    return (
        <div className="relative flex items-center justify-center">
            {/* Pulse ring */}
            <span
                className="absolute w-14 h-14 rounded-full animate-ping opacity-15"
                style={{ backgroundColor: color.ring }}
            />
            {/* Node circle */}
            <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center
                           bg-white/10 dark:bg-black/20 backdrop-blur-sm border-2"
                style={{
                    boxShadow: `0 0 20px ${color.glow}, 0 0 6px ${color.glow}`,
                    borderColor: color.ring,
                }}
            >
                <Icon
                    className="w-5 h-5"
                    style={{ color: color.ring }}
                    strokeWidth={1.75}
                />
            </div>
        </div>
    );
}

/* ─── Card ─── */
function Card({ item }) {
    return (
        <div className="group relative rounded-2xl p-5
                        glass border border-white/30 dark:border-white/10
                        shadow-lg hover:shadow-2xl
                        hover:-translate-y-1 hover:border-white/50 dark:hover:border-white/20
                        transition-all duration-400 ease-out">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-widest uppercase
                                 text-[#0F2854]/50 dark:text-[#93C5FD]/45">
                    {item.year}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-[#0F2854]/15 dark:from-[#93C5FD]/15 to-transparent" />
                <span className="text-[10px] font-mono text-foreground/35 tracking-wide">{item.label}</span>
            </div>

            <h3 className="text-base font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] mb-2 leading-snug">
                {item.title}
            </h3>

            <p className="text-sm text-foreground/65 leading-relaxed">
                {item.body}
            </p>
        </div>
    );
}

/* ─── Connector between nodes ─── */
function Connector({ isLast }) {
    if (isLast) return null;
    return (
        <div className="col-start-2 col-end-3 flex justify-center">
            <div className="w-px h-14 bg-gradient-to-b from-white/25 dark:from-white/15 to-transparent" />
        </div>
    );
}

/* ─── "Journey Begins" entry label ─── */
function JourneyStart() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2 mb-4"
        >
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-foreground/35
                             border border-white/20 dark:border-white/10 rounded-full px-4 py-1 glass">
                Journey Begins
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
    );
}

/* ─── Main export ─── */
export default function Education() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, margin: '-60px' });

    return (
        <section id="education" className="min-h-screen py-24 px-4 md:px-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                {/* Section header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Education
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        My Journey
                    </h2>
                    <p className="mt-4 text-base text-foreground/55 max-w-lg mx-auto leading-relaxed">
                        A look at the key milestones during my B.Tech journey and what I learned along the way.
                    </p>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical centre line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none
                                    bg-gradient-to-b
                                    from-transparent
                                    via-[#0F2854]/50 dark:via-[#93C5FD]/45
                                    to-transparent" />

                    <JourneyStart />

                    <div className="flex flex-col gap-10">
                        {milestones.map((item, i) => (
                            <div key={i}>
                                <TimelineCard item={item} index={i} />
                                <Connector isLast={i === milestones.length - 1} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
