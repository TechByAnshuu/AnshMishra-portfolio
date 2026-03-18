import { useRef } from 'react';
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from 'framer-motion';
import {
    GraduationCap,
    Code2,
    Globe,
    Layers,
    Cloud,
    Rocket,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const milestones = [
    {
        year: '2023',
        label: 'The Beginning',
        title: 'Started B.Tech',
        body: 'Dove headfirst into programming fundamentals, logic building, and problem-solving — laying the groundwork for everything that followed.',
        Icon: GraduationCap,
        color: { ring: '#60A5FA', glow: 'rgba(96,165,250,0.55)' },
        side: 'left',
    },
    {
        year: '2023',
        label: 'Core CS',
        title: 'Building the Foundation',
        body: 'Mastered C programming, algorithms, and data structures — the bedrock of every great software engineer.',
        Icon: Code2,
        color: { ring: '#A78BFA', glow: 'rgba(167,139,250,0.55)' },
        side: 'right',
    },
    {
        year: '2024',
        label: 'Building the Web',
        title: 'Web Development',
        body: 'Picked up HTML, CSS & modern JavaScript. Started building interactive, responsive websites from scratch.',
        Icon: Globe,
        color: { ring: '#34D399', glow: 'rgba(52,211,153,0.55)' },
        side: 'left',
    },
    {
        year: '2024',
        label: 'React & UI/UX',
        title: 'Frontend Frameworks',
        body: 'Built polished apps with React.js and Tailwind CSS, and developed a sharp eye for great UI/UX.',
        Icon: Layers,
        color: { ring: '#F472B6', glow: 'rgba(244,114,182,0.55)' },
        side: 'right',
    },
    {
        year: '2025',
        label: 'Infrastructure Meets Code',
        title: 'DevOps & Cloud',
        body: 'Embraced Docker, Kubernetes, CI/CD pipelines, and AWS — automating deployments for real production systems.',
        Icon: Cloud,
        color: { ring: '#FBBF24', glow: 'rgba(251,191,36,0.55)' },
        side: 'left',
    },
    {
        year: 'Now',
        label: 'Building for Impact',
        title: 'Advanced Projects',
        body: 'Building production-grade full-stack & DevOps projects — contributing to open-source and solving real engineering problems.',
        Icon: Rocket,
        color: { ring: '#38BDF8', glow: 'rgba(56,189,248,0.55)' },
        side: 'right',
    },
];

/* ─────────────────────────────────────────
   Animated scroll progress bar (desktop)
───────────────────────────────────────── */
function ProgressLine({ containerRef }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 20%'],
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b
                            from-transparent
                            via-[#0F2854]/20 dark:via-[#93C5FD]/20
                            to-transparent" />
            <motion.div
                className="absolute inset-x-0 top-0 origin-top rounded-full
                           bg-gradient-to-b
                           from-[#60A5FA] via-[#A78BFA] to-[#38BDF8]"
                style={{ scaleY, bottom: 0 }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────
   Node
───────────────────────────────────────── */
function Node({ item, active }) {
    const { Icon, color } = item;
    return (
        <div className="relative flex items-center justify-center flex-shrink-0 z-10">
            {active && (
                <span
                    className="absolute w-16 h-16 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: color.ring }}
                />
            )}
            <motion.div
                animate={active
                    ? { boxShadow: `0 0 22px ${color.glow}, 0 0 8px ${color.glow}` }
                    : { boxShadow: '0 0 0px transparent' }
                }
                transition={{ duration: 0.4 }}
                className="relative w-11 h-11 rounded-full flex items-center justify-center
                           bg-white/10 dark:bg-black/25 backdrop-blur-sm border-2 transition-colors duration-400"
                style={{ borderColor: active ? color.ring : `${color.ring}55` }}
            >
                <motion.div
                    animate={active ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ duration: 0.35, ease: 'backOut' }}
                >
                    <Icon
                        className="w-5 h-5 transition-colors duration-400"
                        style={{ color: active ? color.ring : `${color.ring}90` }}
                        strokeWidth={1.75}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Card
───────────────────────────────────────── */
function Card({ item, active }) {
    const { color } = item;
    return (
        <motion.div
            animate={active
                ? { borderColor: `${color.ring}50`, boxShadow: `0 8px 32px ${color.glow}25` }
                : { borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 4px 16px transparent' }
            }
            transition={{ duration: 0.4 }}
            className="group relative rounded-2xl p-5
                       bg-white/10 dark:bg-black/15 backdrop-blur-md
                       border hover:-translate-y-1 hover:shadow-xl
                       transition-transform duration-300 ease-out w-full"
        >
            {/* Top row: year + label */}
            <div className="flex items-center gap-2 mb-3">
                <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: color.ring }}
                >
                    {item.year}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
                <span className="text-[10px] font-mono text-foreground/35 tracking-wide">{item.label}</span>
            </div>
            {/* Bottom row: title + body side by side */}
            <div className="flex items-start gap-5">
                <h3 className="text-[15px] font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] leading-snug whitespace-nowrap flex-shrink-0">
                    {item.title}
                </h3>
                <div className="w-px self-stretch bg-white/10 flex-shrink-0" />
                <p className="text-sm text-foreground/60 leading-relaxed">
                    {item.body}
                </p>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   Connector line (node ↔ card)
───────────────────────────────────────── */
function Connector({ side, active, color }) {
    return (
        <motion.div
            animate={active ? { opacity: 1, scaleX: 1 } : { opacity: 0.25, scaleX: 0.6 }}
            transition={{ duration: 0.4 }}
            style={{
                backgroundColor: color.ring,
                transformOrigin: side === 'left' ? 'right center' : 'left center',
            }}
            className="flex-shrink-0 h-[1.5px] w-10 md:w-14 rounded-full"
        />
    );
}

/* ─────────────────────────────────────────
   Milestone row (desktop alternating)
───────────────────────────────────────── */
function MilestoneRow({ item, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-25% 0px -25% 0px' });
    const isLeft = item.side === 'left';

    const cardMotion = {
        initial: { opacity: 0, x: isLeft ? -70 : 70 },
        animate: inView
            ? { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 } }
            : { opacity: 0, x: isLeft ? -70 : 70, transition: { duration: 0.4 } },
    };

    const nodeMotion = {
        initial: { scale: 0, opacity: 0 },
        animate: inView
            ? { scale: 1, opacity: 1, transition: { duration: 0.45, ease: 'backOut' } }
            : { scale: 0, opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <div ref={ref} className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-0">
            <div className="flex items-center justify-end gap-0 pr-0">
                {isLeft ? (
                    <div className="flex items-center gap-0 w-full justify-end">
                        <motion.div className="w-full" {...cardMotion}>
                            <Card item={item} active={inView} />
                        </motion.div>
                        <Connector side="left" active={inView} color={item.color} />
                    </div>
                ) : (
                    <span className="text-[10px] font-mono tracking-widest text-foreground/20 select-none pr-6">
                        {item.year}
                    </span>
                )}
            </div>
            <motion.div className="flex items-center justify-center" {...nodeMotion}>
                <Node item={item} active={inView} />
            </motion.div>
            <div className="flex items-center justify-start gap-0 pl-0">
                {!isLeft ? (
                    <div className="flex items-center gap-0 w-full justify-start">
                        <Connector side="right" active={inView} color={item.color} />
                        <motion.div className="w-full" {...cardMotion}>
                            <Card item={item} active={inView} />
                        </motion.div>
                    </div>
                ) : (
                    <span className="text-[10px] font-mono tracking-widest text-foreground/20 select-none pl-6">
                        {item.year}
                    </span>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Mobile single-column row
───────────────────────────────────────── */
function MobileMilestoneRow({ item }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4 md:hidden"
        >
            <div className="flex flex-col items-center flex-shrink-0">
                <Node item={item} active={inView} />
            </div>
            <div className="flex-1 pb-2">
                <Card item={item} active={inView} />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   Journey starts label
───────────────────────────────────────── */
function JourneyStart() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-20px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 mb-6"
        >
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-foreground/40
                             border border-white/20 dark:border-white/10 rounded-full px-4 py-1
                             bg-white/10 dark:bg-black/15 backdrop-blur-sm">
                Journey Begins
            </span>
            <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   Mobile left vertical line
───────────────────────────────────────── */
function MobileProgressLine({ containerRef }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 20%'],
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="absolute left-[21px] top-0 bottom-0 w-[2px] pointer-events-none md:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F2854]/20 dark:via-[#93C5FD]/20 to-transparent" />
            <motion.div
                className="absolute inset-x-0 top-0 origin-top rounded-full
                           bg-gradient-to-b from-[#60A5FA] via-[#A78BFA] to-[#38BDF8]"
                style={{ scaleY, bottom: 0 }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────
   Section gap between rows
───────────────────────────────────────── */
function RowGap() {
    return <div className="hidden md:block h-10" />;
}

/* ─────────────────────────────────────────
   B.Tech Education Card
───────────────────────────────────────── */
function EducationCard() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
        >
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden
                            border border-[#60A5FA]/20
                            bg-white/5 dark:bg-black/20 backdrop-blur-md
                            px-6 py-5
                            flex flex-col md:flex-row md:items-center gap-5 md:gap-0">

                {/* Left accent bar */}
                <div className="hidden md:block absolute left-0 top-5 bottom-5 w-[3px] rounded-full
                                bg-gradient-to-b from-[#60A5FA] to-[#A78BFA]" />

                {/* Institution */}
                <div className="flex items-center gap-4 md:pl-6 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                                    bg-[#60A5FA]/10 border border-[#60A5FA]/25">
                        <GraduationCap className="w-5 h-5 text-[#60A5FA]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#60A5FA]/70 mb-0.5">
                            B.Tech · Computer Science &amp; Engineering
                        </p>
                        <h3 className="text-[15px] font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] leading-snug">
                            Lovely Professional University
                        </h3>
                        <p className="text-xs text-foreground/40 mt-0.5 font-mono">Phagwara, Punjab</p>
                    </div>
                </div>

                {/* Vertical divider — desktop only */}
                <div className="hidden md:block w-px self-stretch bg-white/10 mx-8 flex-shrink-0" />

                {/* Stats */}
                <div className="flex items-center gap-5 md:gap-8 flex-shrink-0 pl-[60px] md:pl-0">

                    {/* CGPA */}
                    <div className="text-center">
                        <p className="text-[9px] font-mono tracking-widest uppercase text-foreground/35 mb-0.5">CGPA</p>
                        <p className="text-2xl font-heading font-semibold text-[#60A5FA] leading-none">6.96</p>
                    </div>

                    <div className="w-px h-8 bg-white/10 flex-shrink-0" />

                    {/* Duration */}
                    <div className="text-center">
                        <p className="text-[9px] font-mono tracking-widest uppercase text-foreground/35 mb-0.5">Duration</p>
                        <p className="text-sm font-mono text-foreground/65 leading-none">2023 – Present</p>
                    </div>

                    <div className="w-px h-8 bg-white/10 flex-shrink-0" />

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <span className="text-[11px] font-mono text-emerald-400/80 tracking-wide whitespace-nowrap">
                            Ongoing
                        </span>
                    </div>

                </div>
            </div>

            {/* Connector line down to "My Journey" */}
            <div className="flex flex-col items-center mt-5 gap-1.5">
                <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-foreground/30 select-none">
                    My Journey
                </span>
                <div className="w-px h-7 bg-gradient-to-b from-[#60A5FA]/50 to-transparent" />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   Main export
───────────────────────────────────────── */
export default function Education() {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, margin: '-60px' });

    return (
        <section ref={sectionRef} id="education" className="min-h-screen py-24 px-4 md:px-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12"
                >
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Education
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Education
                    </h2>
                    <p className="mt-4 text-base text-foreground/55 max-w-lg mx-auto leading-relaxed">
                        Key milestones from my B.Tech journey and the skills I built along the way.
                    </p>
                    <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#0F2854]/60 to-[#93C5FD]/60" />
                </motion.div>

                {/* ── B.Tech Education Card ── */}
                <EducationCard />

                {/* ── Timeline ── */}
                <div ref={timelineRef} className="relative">

                    {/* Desktop animated progress line */}
                    <ProgressLine containerRef={timelineRef} />

                    {/* Mobile animated progress line */}
                    <MobileProgressLine containerRef={timelineRef} />

                    <JourneyStart />

                    {/* Desktop rows */}
                    <div className="hidden md:flex flex-col gap-0">
                        {milestones.map((item, i) => (
                            <div key={item.title}>
                                <MilestoneRow item={item} index={i} />
                                {i < milestones.length - 1 && <RowGap />}
                            </div>
                        ))}
                    </div>

                    {/* Mobile rows */}
                    <div className="flex flex-col gap-6 md:hidden pl-1">
                        {milestones.map((item) => (
                            <MobileMilestoneRow key={item.title} item={item} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}