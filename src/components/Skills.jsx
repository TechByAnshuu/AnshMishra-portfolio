/* ─── Skills.jsx — Single pyramid that fits in one screen ────────── */

const SKILLS = [
    // Row 1 — 6
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#6EBF4C' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#4B9EE5' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    // Row 2 — 5
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#38BDF8' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#888888', invert: true },
    // Row 3 — 4
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#00758F' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#4FAA41' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#E8C04A' },
    // Row 4 — 3
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#888888', invert: true },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#9C5BB4' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#E76F00' },
    // Row 5 — 2
    { name: 'Shell', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', color: '#4EAA25' },
    { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: '#D33833' },
];

const ROWS = [
    SKILLS.slice(0, 6),
    SKILLS.slice(6, 11),
    SKILLS.slice(11, 15),
    SKILLS.slice(15, 18),
    SKILLS.slice(18, 20),
];

/* Small organic offsets so rows don't feel robotic */
const OFFSETS = [
    [0, 6, -4, 4, -4, 6],
    [8, -6, 4, -4, 6],
    [-4, 6, -4, 4],
    [6, -4, 4],
    [-4, 4],
];

function SkillCard({ skill, delay, topOffset }) {
    return (
        <div
            className="group relative flex flex-col items-center justify-center gap-1.5 cursor-default
                       glass border border-white/40 dark:border-white/10 shadow-md rounded-xl
                       hover:scale-110 hover:-translate-y-2
                       hover:border-[#0F2854]/30 dark:hover:border-[#93C5FD]/30
                       transition-all duration-300"
            style={{
                width: 128,
                height: 98,
                marginTop: topOffset,
                animation: 'skillFadeIn 0.5s ease-out both',
                animationDelay: `${delay}ms`,
            }}
        >
            {/* Brand-colour glow on hover */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `0 0 20px 3px ${skill.color}44` }}
            />
            <img
                src={skill.icon}
                alt={skill.name}
                width={26}
                height={26}
                loading="lazy"
                className="transition-transform duration-300 group-hover:scale-110"
                style={skill.invert ? { filter: 'invert(0.5)' } : undefined}
            />
            <span className="text-[9px] md:text-[10px] font-sans font-medium tracking-wide text-center
                             leading-tight px-1 text-foreground/60
                             group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD]
                             transition-colors duration-300">
                {skill.name}
            </span>
        </div>
    );
}

export default function Skills() {
    let globalIdx = 0;
    return (
        <section
            id="skills"
            className="min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-8"
        >
            <style>{`
                @keyframes skillFadeIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Heading */}
            <div className="text-center mb-8 md:mb-10 space-y-2">
                <p className="text-sm uppercase tracking-widest text-foreground/60 font-sans font-medium">
                    What I Work With
                </p>
                <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                    Skills
                </h2>
                <div className="mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>

            {/* Single pyramid — compact gaps so all rows fit in viewport */}
            <div className="flex flex-col items-center gap-3">
                {ROWS.map((row, ri) => (
                    <div key={ri} className="flex justify-center gap-3">
                        {row.map((skill, ci) => {
                            const delay = (globalIdx++) * 45;
                            const topOffset = OFFSETS[ri]?.[ci] ?? 0;
                            return (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill}
                                    delay={delay}
                                    topOffset={topOffset}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}
