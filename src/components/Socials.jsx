import { socials } from '../data';
import { ExternalLink } from 'lucide-react';

export default function Socials() {
    return (
        <section id="socials" className="min-h-screen flex items-center justify-center px-4 py-16 md:p-8">
            <div className="max-w-4xl w-full">
                <h2 className="text-3xl md:text-6xl font-heading font-semibold mb-8 md:mb-12 text-center text-[#0F2854] dark:text-[#93C5FD]">
                    Let's Connect
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-white/40 dark:border-white/10 shadow-xl hover:bg-white/20 dark:hover:bg-black/30 group flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-heading font-semibold mb-1 group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD] transition-colors">
                                    {social.name}
                                </h3>
                                <p className="text-sm text-foreground/60">{social.handle}</p>
                            </div>
                            <ExternalLink className="w-5 h-5 group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD] transition-colors" />
                        </a>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-foreground/60">
                        © 2025  Ansh Mishra. Built with React & Tailwind CSS
                    </p>
                </div>
            </div>
        </section>
    );
}
