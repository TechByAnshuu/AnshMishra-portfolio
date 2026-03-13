import { useState } from 'react';
import { socials } from '../data';
import {
    ExternalLink, Send, CheckCircle2, Mail, MessageSquare,
    Github, Linkedin, Twitter, Globe
} from 'lucide-react';

/* Map social name → icon (fallback to Globe) */
const ICON_MAP = {
    'GitHub': Github,
    'LinkedIn': Linkedin,
    'X (Twitter)': Twitter,
    'Email': Mail,
};

function SocialIcon({ name }) {
    const Icon = ICON_MAP[name] ?? Globe;
    return <Icon className="w-5 h-5" />;
}

export default function Socials() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        }, 1200);
    };

    return (
        <section id="socials" className="min-h-screen flex items-center justify-center px-4 py-16 md:p-10">
            <div className="max-w-6xl w-full">

                {/* ── Section heading ── */}
                <div className="text-center mb-10">
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-2">
                        Let's Work Together
                    </p>
                    <h2 className="text-3xl md:text-5xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Let's Connect
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                </div>

                {/* ── Half-half grid ── */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* ══ LEFT: Contact form ══ */}
                    <div className="glass rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
                        {/* Card header */}
                        <div className="flex items-center gap-3 px-6 py-4
                                        border-b border-white/20 dark:border-white/8
                                        bg-gradient-to-r from-[#0F2854]/5 via-transparent to-[#93C5FD]/5">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full
                                             bg-[#0F2854]/10 dark:bg-[#93C5FD]/10
                                             border border-white/30 dark:border-white/10">
                                <MessageSquare className="w-4 h-4 text-[#0F2854] dark:text-[#93C5FD]" />
                            </span>
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground/40">Say Hello</p>
                                <h3 className="text-sm font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">Send a Message</h3>
                            </div>
                            {/* Availability badge */}
                            <div className="ml-auto flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-[10px] font-medium text-foreground/45 hidden sm:block">Available</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-6 gap-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="s-name"
                                        className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/45">
                                        Name
                                    </label>
                                    <input
                                        id="s-name" type="text" name="name"
                                        value={form.name} onChange={handleChange}
                                        placeholder="Your name" required
                                        className="w-full px-4 py-2.5 rounded-xl text-sm
                                                   bg-white/10 dark:bg-white/5
                                                   border border-white/30 dark:border-white/10
                                                   text-foreground placeholder:text-foreground/30
                                                   focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/35
                                                   focus:outline-none focus:ring-2 focus:ring-[#0F2854]/8 dark:focus:ring-[#93C5FD]/10
                                                   transition-all duration-300"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="s-email"
                                        className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/45">
                                        Email
                                    </label>
                                    <input
                                        id="s-email" type="email" name="email"
                                        value={form.email} onChange={handleChange}
                                        placeholder="you@example.com" required
                                        className="w-full px-4 py-2.5 rounded-xl text-sm
                                                   bg-white/10 dark:bg-white/5
                                                   border border-white/30 dark:border-white/10
                                                   text-foreground placeholder:text-foreground/30
                                                   focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/35
                                                   focus:outline-none focus:ring-2 focus:ring-[#0F2854]/8 dark:focus:ring-[#93C5FD]/10
                                                   transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 flex-1 flex flex-col">
                                <label htmlFor="s-message"
                                    className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/45">
                                    Message
                                </label>
                                <textarea
                                    id="s-message" name="message"
                                    value={form.message} onChange={handleChange}
                                    placeholder="Tell me about your project or just say hi…"
                                    required rows={5}
                                    className="flex-1 w-full px-4 py-3 rounded-xl text-sm resize-none
                                               bg-white/10 dark:bg-white/5
                                               border border-white/30 dark:border-white/10
                                               text-foreground placeholder:text-foreground/30
                                               focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/35
                                               focus:outline-none focus:ring-2 focus:ring-[#0F2854]/8 dark:focus:ring-[#93C5FD]/10
                                               transition-all duration-300"
                                />
                            </div>

                            {/* Submit row */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold
                                               bg-gradient-to-r from-[#0F2854] to-[#1a3a6b]
                                               dark:from-[#93C5FD]/25 dark:to-[#60A5FA]/25
                                               text-white dark:text-[#93C5FD]
                                               border border-[#0F2854]/50 dark:border-[#93C5FD]/25
                                               hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                                               transition-all duration-300 shadow-lg group"
                                >
                                    {status === 'sending' ? (
                                        <><span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />Sending…</>
                                    ) : status === 'success' ? (
                                        <><CheckCircle2 className="w-3.5 h-3.5" />Sent!</>
                                    ) : (
                                        <><Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />Send Message</>
                                    )}
                                </button>

                                <a href="mailto:anshmishra14.14@gmail.com"
                                    className="flex items-center gap-1.5 text-xs font-medium
                                               text-foreground/45 hover:text-[#0F2854] dark:hover:text-[#93C5FD]
                                               transition-colors group">
                                    <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                    or email directly
                                </a>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                                                bg-green-500/10 border border-green-500/20
                                                text-green-600 dark:text-green-400 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    Thanks! I'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* ══ RIGHT: Social links ══ */}
                    <div className="glass rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
                        {/* Card header */}
                        <div className="flex items-center gap-3 px-6 py-4
                                        border-b border-white/20 dark:border-white/8
                                        bg-gradient-to-r from-[#93C5FD]/5 via-transparent to-[#0F2854]/5">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full
                                             bg-[#0F2854]/10 dark:bg-[#93C5FD]/10
                                             border border-white/30 dark:border-white/10">
                                <ExternalLink className="w-4 h-4 text-[#0F2854] dark:text-[#93C5FD]" />
                            </span>
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground/40">Find Me On</p>
                                <h3 className="text-sm font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">Social Profiles</h3>
                            </div>
                        </div>

                        {/* Social links list */}
                        <div className="flex flex-col flex-1 p-6 gap-3 justify-center">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between
                                               px-5 py-4 rounded-2xl
                                               bg-white/10 dark:bg-white/5
                                               border border-white/30 dark:border-white/10
                                               hover:bg-white/20 dark:hover:bg-white/10
                                               hover:border-[#0F2854]/20 dark:hover:border-[#93C5FD]/25
                                               hover:scale-[1.02] hover:shadow-lg
                                               transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Icon circle */}
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full
                                                         bg-[#0F2854]/8 dark:bg-white/8
                                                         border border-white/20 dark:border-white/10
                                                         text-[#0F2854]/60 dark:text-white/50
                                                         group-hover:bg-[#0F2854] dark:group-hover:bg-[#93C5FD]/20
                                                         group-hover:text-white dark:group-hover:text-[#93C5FD]
                                                         group-hover:border-[#0F2854]/50 dark:group-hover:border-[#93C5FD]/30
                                                         transition-all duration-300">
                                            <SocialIcon name={social.name} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-heading font-semibold
                                                          text-foreground group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD]
                                                          transition-colors duration-300">
                                                {social.name}
                                            </p>
                                            <p className="text-xs text-foreground/45">{social.handle}</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-foreground/30
                                                             group-hover:text-[#0F2854] dark:group-hover:text-[#93C5FD]
                                                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                                             transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className="text-xs text-foreground/40">
                        © 2025 Ansh Mishra · Built with React &amp; Tailwind CSS
                    </p>
                </div>
            </div>
        </section>
    );
}
