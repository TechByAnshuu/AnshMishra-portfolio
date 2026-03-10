import { skills } from '../data';

export default function Skills() {
    return (
        <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-16 md:p-8">
            <div className="max-w-6xl w-full">
                <h2 className="text-3xl md:text-6xl font-heading font-semibold mb-8 md:mb-12 text-center text-[#0F2854] dark:text-[#93C5FD]">
                    Skills
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 border border-white/40 dark:border-white/10 shadow-md hover:bg-white/20 dark:hover:bg-black/30 hover:border-[#0F2854]/30 dark:hover:border-[#93C5FD]/30 group"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: 'blurFadeIn 0.5s ease-out forwards',
                            }}
                        >
                            <p className="text-lg font-sans font-medium group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD] transition-colors">
                                {skill}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
