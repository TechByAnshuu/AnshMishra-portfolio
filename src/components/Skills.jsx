/* ─── Skills.jsx — Categorised with animated tab filter ────────── */
import { useState } from 'react';

const SKILLS = [
    // Programming
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E', category: 'Programming' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#4B9EE5', category: 'Programming' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#9C5BB4', category: 'Programming' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#E76F00', category: 'Programming' },
    { name: 'Shell', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', color: '#4EAA25', category: 'Programming' },

    // Frontend
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', category: 'Frontend' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26', category: 'Frontend' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6', category: 'Frontend' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#38BDF8', category: 'Frontend' },

    // Backend
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#6EBF4C', category: 'Backend' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#888888', category: 'Backend', invert: true },

    // Database
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#00758F', category: 'Database' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#4FAA41', category: 'Database' },

    // DevOps / Tools
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED', category: 'DevOps' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900', category: 'DevOps' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5', category: 'DevOps' },
    { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: '#D33833', category: 'DevOps' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032', category: 'DevOps' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#888888', category: 'DevOps', invert: true },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#E8C04A', category: 'DevOps' },
];

const CATEGORIES = [
    { id: 'All', label: 'All', emoji: '⚡' },
    { id: 'Programming', label: 'Programming', emoji: '{ }' },
    { id: 'Frontend', label: 'Frontend', emoji: '🎨' },
    { id: 'Backend', label: 'Backend', emoji: '⚙️' },
    { id: 'Database', label: 'Database', emoji: '🗄️' },
    { id: 'DevOps', label: 'DevOps', emoji: '🚀' },
];

function SkillCard({ skill, index }) {
    return (
        <div
            className="group relative flex flex-col items-center justify-center gap-1.5 cursor-default
                 glass border border-white/40 dark:border-white/10 shadow-md rounded-xl
                 hover:scale-110 hover:-translate-y-2
                 hover:border-[#0F2854]/30 dark:hover:border-[#93C5FD]/30
                 transition-all duration-300"
            style={{
                width: 118,
                height: 94,
                animation: 'skillFadeIn 0.35s ease-out both',
                animationDelay: `${index * 40}ms`,
            }}
        >
            {/* Brand-colour glow on hover */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `0 0 22px 4px ${skill.color}44` }}
            />
            <img
                src={skill.icon}
                alt={skill.name}
                width={28}
                height={28}
                loading="lazy"
                className="transition-transform duration-300 group-hover:scale-110 z-10"
                style={skill.invert ? { filter: 'invert(0.5)' } : undefined}
            />
            <span
                className="text-[9px] md:text-[10px] font-sans font-medium tracking-wide text-center
                   leading-tight px-1 text-foreground/60 z-10
                   group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD]
                   transition-colors duration-300"
            >
                {skill.name}
            </span>
        </div>
    );
}

export default function Skills() {
    const [active, setActive] = useState('All');

    const filtered =
        active === 'All' ? SKILLS : SKILLS.filter((s) => s.category === active);

    return (
        <section
            id="skills"
            className="min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-10"
        >
            <style>{`
        @keyframes skillFadeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes tabSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tab-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .tab-pill.inactive {
          background: transparent;
          border-color: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
        }
        .tab-pill.inactive:hover {
          border-color: rgba(147,197,253,0.4);
          color: rgba(147,197,253,0.8);
          background: rgba(147,197,253,0.06);
        }
        .tab-pill.active-tab {
          background: linear-gradient(135deg, #1e3a6e 0%, #0f2040 100%);
          border-color: rgba(147,197,253,0.5);
          color: #93C5FD;
          box-shadow: 0 0 16px rgba(147,197,253,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        /* Light mode overrides */
        @media (prefers-color-scheme: light) {
          .tab-pill.inactive { border-color: rgba(15,40,84,0.15); color: rgba(15,40,84,0.5); }
          .tab-pill.inactive:hover { border-color: rgba(15,40,84,0.4); color: #0F2854; background: rgba(15,40,84,0.05); }
          .tab-pill.active-tab { background: linear-gradient(135deg,#0F2854,#1a3a70); color: #fff; border-color: #0F2854; box-shadow: 0 4px 14px rgba(15,40,84,0.3); }
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          max-width: 820px;
        }
        .count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 600;
          background: rgba(147,197,253,0.15);
          color: #93C5FD;
        }
        @media (prefers-color-scheme: light) {
          .count-badge { background: rgba(15,40,84,0.1); color: #0F2854; }
        }
      `}</style>

            {/* ── Heading ── */}
            <div className="text-center mb-8 space-y-2">
                <p className="text-sm uppercase tracking-widest text-foreground/60 font-sans font-medium">
                    What I Work With
                </p>
                <h2 className="text-4xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                    Skills
                </h2>
                <div className="mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>

            {/* ── Category Tabs ── */}
            <div
                className="flex flex-wrap justify-center gap-2 mb-10"
                style={{ animation: 'tabSlide 0.4s ease-out both' }}
            >
                {CATEGORIES.map((cat) => {
                    const count =
                        cat.id === 'All'
                            ? SKILLS.length
                            : SKILLS.filter((s) => s.category === cat.id).length;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActive(cat.id)}
                            className={`tab-pill ${active === cat.id ? 'active-tab' : 'inactive'}`}
                        >
                            <span style={{ fontSize: 13 }}>{cat.emoji}</span>
                            {cat.label}
                            <span className="count-badge">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* ── Skills Grid ── */}
            <div className="skills-grid" key={active}>
                {filtered.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
            </div>

            {/* ── Active category label ── */}
            {active !== 'All' && (
                <p
                    className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground/30 font-sans"
                    style={{ animation: 'skillFadeIn 0.3s ease-out both' }}
                >
                    Showing {filtered.length} skill{filtered.length !== 1 ? 's' : ''} in {active}
                </p>
            )}
        </section>
    );
}