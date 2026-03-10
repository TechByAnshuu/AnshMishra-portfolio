import { repos } from '../data';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Experience() {
    const [expandedRepo, setExpandedRepo] = useState(null);

    return (
        <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-16 md:p-8">
            <div className="max-w-6xl w-full">
                <h2 className="text-3xl md:text-6xl font-heading font-semibold mb-8 md:mb-12 text-center text-[#0F2854] dark:text-[#93C5FD]">
                    Open Source Contributions
                </h2>

                <div className="space-y-4">
                    {repos.map((repo, index) => (
                        <div
                            key={index}
                            className="glass rounded-2xl overflow-hidden transition-all duration-300 border border-white/40 dark:border-white/10 shadow-xl"
                        >
                            <button
                                onClick={() => setExpandedRepo(expandedRepo === index ? null : index)}
                                className="w-full p-6 text-left hover:bg-white/10 dark:hover:bg-black/20 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                                            {repo.name}
                                        </h3>
                                        <p className="text-sm text-foreground/60 mt-1">
                                            {repo.prs.length} Pull Request{repo.prs.length > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <svg
                                        className={`w-6 h-6 transition-transform duration-300 ${expandedRepo === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {expandedRepo === index && (
                                <div className="px-6 pb-6 space-y-3 animate-blur-in">
                                    {repo.prs.map((pr, prIndex) => (
                                        <a
                                            key={prIndex}
                                            href={pr.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-3 p-4 rounded-xl glass border border-white/30 hover:bg-[#0F2854] dark:hover:bg-[#93C5FD]/20 hover:text-white transition-all duration-300 group"
                                        >
                                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-white dark:group-hover:text-[#93C5FD] transition-colors" />
                                            <p className="text-sm text-foreground/80 group-hover:text-white transition-colors">
                                                {pr.title}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
