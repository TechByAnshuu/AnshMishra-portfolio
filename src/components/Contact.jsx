import { useState, useRef } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function useScrollReveal(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

import { useEffect } from 'react';

const SOCIALS = [
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/TechByAnshuu',
        color: 'hover:bg-gray-800 hover:text-white dark:hover:bg-white/15',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ansh-mishra-dev/',
        color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
        icon: Mail,
        label: 'Email',
        href: 'mailto:anshmishra14.14@gmail.com',
        color: 'hover:bg-red-500 hover:text-white',
    },
];

export default function Contact() {
    const [sectionRef, sectionVisible] = useScrollReveal(0.08);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus('sending');
        // Simulate async send (no backend)
        setTimeout(() => {
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        }, 1200);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center px-4 py-16 md:p-8"
        >
            <div className={`max-w-4xl w-full transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#0F2854]/50 dark:text-[#93C5FD]/40 mb-3">
                        Say Hello
                    </p>
                    <h2 className="text-3xl md:text-6xl font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD]">
                        Get In Touch
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    <p className="mt-4 text-sm md:text-base text-foreground/55 max-w-md mx-auto leading-relaxed">
                        Have a project in mind, a question, or just want to connect? Drop me a message — I'll get back to you soon.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-6 md:gap-8">

                    {/* ── Left: Info + socials ── */}
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <div className="glass rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl space-y-5">
                            <div>
                                <h3 className="text-base font-heading font-semibold text-[#0F2854] dark:text-[#93C5FD] mb-1">
                                    Ansh Mishra
                                </h3>
                                <p className="text-xs text-foreground/55">Cloud &amp; DevOps Engineer</p>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-[#0F2854]/20 dark:via-white/10 to-transparent" />
                            <div className="space-y-3 text-sm">
                                <a
                                    href="mailto:anshmishra14.14@gmail.com"
                                    className="flex items-center gap-3 text-foreground/65 hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full
                                                     bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                                        <Mail className="w-3.5 h-3.5" />
                                    </span>
                                    anshmishra14.14@gmail.com
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ansh-mishra-dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-foreground/65 hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full
                                                     bg-[#0A66C2]/10 text-[#0A66C2] dark:text-[#60A5FA] group-hover:scale-110 transition-transform">
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </span>
                                    linkedin.com/in/ansh-mishra-dev
                                </a>
                                <a
                                    href="https://github.com/TechByAnshuu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-foreground/65 hover:text-[#0F2854] dark:hover:text-[#93C5FD] transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full
                                                     bg-gray-800/10 dark:bg-white/10 text-gray-800 dark:text-white group-hover:scale-110 transition-transform">
                                        <Github className="w-3.5 h-3.5" />
                                    </span>
                                    github.com/TechByAnshuu
                                </a>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-[#0F2854]/20 dark:via-white/10 to-transparent" />

                            {/* Quick-link icons */}
                            <div className="flex gap-3">
                                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('mailto') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`flex items-center justify-center w-9 h-9 rounded-full
                                                    glass border border-white/30 dark:border-white/15
                                                    text-foreground/60 transition-all duration-300 hover:scale-110 ${color}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability badge */}
                        <div className="glass rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-xl flex items-center gap-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-xs font-medium text-foreground/65">
                                Open to new opportunities &amp; collaborations
                            </span>
                        </div>
                    </div>

                    {/* ── Right: Contact form ── */}
                    <div className="md:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="glass rounded-2xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-xl space-y-5"
                        >
                            {/* Name + Email row */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="contact-name"
                                        className="block text-xs font-semibold uppercase tracking-widest text-foreground/50"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl text-sm
                                                   glass border border-white/30 dark:border-white/15
                                                   text-foreground placeholder:text-foreground/35
                                                   focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/30
                                                   focus:outline-none focus:ring-2 focus:ring-[#0F2854]/10 dark:focus:ring-[#93C5FD]/10
                                                   transition-all duration-300"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="contact-email"
                                        className="block text-xs font-semibold uppercase tracking-widest text-foreground/50"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl text-sm
                                                   glass border border-white/30 dark:border-white/15
                                                   text-foreground placeholder:text-foreground/35
                                                   focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/30
                                                   focus:outline-none focus:ring-2 focus:ring-[#0F2854]/10 dark:focus:ring-[#93C5FD]/10
                                                   transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="contact-message"
                                    className="block text-xs font-semibold uppercase tracking-widest text-foreground/50"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or just say hi…"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl text-sm resize-none
                                               glass border border-white/30 dark:border-white/15
                                               text-foreground placeholder:text-foreground/35
                                               focus:border-[#0F2854]/40 dark:focus:border-[#93C5FD]/30
                                               focus:outline-none focus:ring-2 focus:ring-[#0F2854]/10 dark:focus:ring-[#93C5FD]/10
                                               transition-all duration-300"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold
                                               bg-gradient-to-r from-[#0F2854] to-[#1e3a5f] dark:from-[#93C5FD]/30 dark:to-[#60A5FA]/30
                                               text-white dark:text-[#93C5FD]
                                               border border-[#0F2854]/50 dark:border-[#93C5FD]/25
                                               hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                                               transition-all duration-300 group shadow-lg"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            Sending…
                                        </>
                                    ) : status === 'success' ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {/* Status message */}
                                {status === 'success' && (
                                    <div className="flex items-center gap-1.5 text-green-500 text-xs font-medium animate-fade-in">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Message sent — I'll be in touch soon!
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        Something went wrong, try again.
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
