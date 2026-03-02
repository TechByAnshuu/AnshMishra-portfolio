import { projects } from '../data';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
    return (
        <section id="projects" className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
                <h2 className="text-4xl md:text-6xl font-heading font-semibold mb-12 text-center text-[#0F2854] dark:text-[#93C5FD]">
                    My Work
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-white/40 dark:border-white/10 shadow-xl hover:bg-white/20 dark:hover:bg-black/30 space-y-4"
                        >
                            <div>
                                <h3 className="text-2xl font-heading font-semibold mb-2 text-[#0F2854] dark:text-[#93C5FD]">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-foreground/60 mb-3">{project.tech}</p>
                                <p className="text-foreground/80">{project.desc}</p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/30 hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/30 hover:text-white dark:hover:text-white transition-all duration-300 text-sm group/btn"
                                >
                                    <Github className="w-4 h-4" />
                                    Code
                                </a>
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/30 hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/30 hover:text-white dark:hover:text-white transition-all duration-300 text-sm group/btn"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
