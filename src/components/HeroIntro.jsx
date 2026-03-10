/**
 * HeroIntro.jsx — Cinematic Card-Breakout Hero
 *
 * PHASE 0  p < 0.05         Pure black entry
 * PHASE 1  p 0.00 → 0.28   Rounded card rises from bottom
 * PHASE 2  p 0.28 → 0.54   BREAKOUT: card expands → fills 100% screen
 * PHASE 3  p 0.42 → 0.62   "ANSH MISHRA" appears BEHIND the photo
 * PHASE 4  p 0.62 → 0.84   Photo slides to left half, anchored at bottom
 * PHASE 5  p 0.84 → 1.00   Terminal code reveals on right
 */

import { useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

/* ─── Math helpers ───────────────────────────────────────────────── */
const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rr = (p, a, b) => cl((p - a) / (b - a), 0, 1);
const lx = (a, b, t) => a + (b - a) * t;

/* ─── set(el, styles) ────────────────────────────────────────────── */
function set(el, styles) {
    if (!el) return;
    Object.assign(el.style, styles);
}

/* ─── Terminal code ──────────────────────────────────────────────── */
const CODE = [
    { t: "comment", a: "// initializing Ansh Mishra...", b: "" },
    { t: "keyword", a: "const", b: " developer = {" },
    { t: "code", a: "  name:", b: ' "Ansh Mishra",' },
    { t: "code", a: "  role:", b: ' "Cloud & DevOps Engineer",' },
    { t: "code", a: "  focus:", b: ' "Build. Break. Fix. Repeat.",' },
    { t: "code", a: "  drives:", b: " [" },
    { t: "string", a: '    "Clean infrastructure",', b: "" },
    { t: "string", a: '    "Automated everything",', b: "" },
    { t: "string", a: '    "Ship fast, fail safe",', b: "" },
    { t: "code", a: "  ],", b: "" },
    { t: "code", a: "};", b: "" },
    { t: "comment", a: "", b: "" },
    { t: "comment", a: "// life philosophy...", b: "" },
    { t: "keyword", a: "while", b: " (alive) {" },
    { t: "string", a: "  learn();", b: "" },
    { t: "string", a: "  build();", b: "" },
    { t: "string", a: "  deploy();", b: "" },
    { t: "comment", a: "  // repeat until perfect", b: "" },
    { t: "code", a: "}", b: "" },
    { t: "comment", a: "", b: "" },
    { t: "output", a: "> Status: Online & Building 🚀", b: "" },
];


/* ─── Deterministic particles (right half only) ──────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: 54 + ((i * 37 + 11) % 42), y: (i * 53 + 7) % 100,
    s: ((i * 19) % 14) / 10 + 0.6, op: ((i * 13) % 30) / 100 + 0.07,
    dur: ((i * 7) % 44) / 10 + 3, del: ((i * 11) % 36) / 10,
}));

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════════ */
export default function HeroIntro({ photoSrc = "/ansh.jpg" }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const secRef = useRef(null);
    const stickerRef = useRef(null);
    const nameRef = useRef(null);
    const termRef = useRef(null);
    const entryRef = useRef(null);
    const cursorRef = useRef(null);  /* purple glow orb that follows cursor */
    const stickyRef = useRef(null);  /* sticky panel — needed for mouse offset */
    const lineRefs = useRef([]);
    const raf = useRef(null);

    /* ── Scroll engine ────────────────────────────────────────────── */
    useEffect(() => {
        const tick = () => {
            raf.current = null;
            const sec = secRef.current;
            if (!sec) return;

            const rect = sec.getBoundingClientRect();
            const totalH = sec.offsetHeight - window.innerHeight;
            if (totalH <= 0) return;

            const p = cl(-rect.top / totalH, 0, 1);
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const isMobile = vw < 768;

            /* ── PHASE 0: fade black entry ─────────────────────────── */
            set(entryRef.current, { opacity: 1 - rr(p, 0, 0.06) });

            /* ── CARD Constants (small portrait card) ─────────────── */
            const CW = isMobile ? Math.min(160, vw * 0.55) : Math.min(220, vw * 0.38);
            const CH = isMobile ? Math.min(240, vh * 0.42) : Math.min(340, vh * 0.58);

            /* ── BREAKOUT target ───────────────────────────────────────
               Mobile:  full-width portrait, top 48% of screen
               Desktop: centered 50vw portrait                         */
            const BW = isMobile ? vw : vw * 0.50;
            const BH = isMobile ? vh * 0.48 : vh * 0.90;
            const BL = isMobile ? 0 : (vw - BW) / 2;
            const BT = isMobile ? 0 : (vh - BH) / 2;

            /* ── PHASE 1: card rises from bottom ──────────────────── */
            const rise = rr(p, 0.00, 0.28);
            /* ── PHASE 2: BREAKOUT → big centered portrait ─────────── */
            const burst = rr(p, 0.28, 0.54);
            /* ── PHASE 4: slide to left half (desktop) / stay full-width (mobile) */
            const slide = rr(p, 0.62, 0.84);

            const wBurst = lx(CW, BW, burst);
            const wFinal = wBurst;

            const hBurst = lx(CH, BH, burst);
            // Mobile: photo shrinks to top 48% as terminal slides up from bottom
            const hFinal = isMobile ? lx(hBurst, vh * 0.48, slide) : lx(hBurst, vh, slide);

            const cardCenterL = (vw - CW) / 2;
            const lBurst = lx(cardCenterL, BL, burst);
            const lFinal = lx(lBurst, 0, slide);

            const cardCenterT = (vh - CH) / 2;
            const topEntry = vh + 60;
            const topRisen = lx(topEntry, cardCenterT, rise);
            const topAfterRise = rise >= 1 ? cardCenterT : topRisen;
            const tBurst = lx(topAfterRise, BT, burst);
            const tFinal = lx(tBurst, 0, slide);

            /* Border radius */
            const brFinal = lx(16, 0, burst);

            /* Opacity */
            const sOp = rr(p, 0, 0.10);

            set(stickerRef.current, {
                opacity: sOp,
                width: `${wFinal}px`,
                height: `${hFinal}px`,
                left: `${lFinal}px`,
                top: `${tFinal}px`,
                borderRadius: `${brFinal}px`,
                transform: "none",
            });

            /* ── PHASE 3: Name behind photo ────────────────────────── */
            const nameIn = rr(p, 0.42, 0.56);
            const nameOut = rr(p, 0.62, 0.74);
            set(nameRef.current, {
                opacity: lx(0, 1, nameIn) * (1 - nameOut),
                transform: `translateY(${lx(50, 0, nameIn)}px)`,
            });

            /* ── PHASE 4+5: Terminal ───────────────────────────────── */
            const t2 = rr(p, 0.70, 0.88);  // starts slightly later so photo settles first
            set(termRef.current, {
                opacity: t2,
                top: isMobile ? "48%" : "0",
                left: isMobile ? "0" : "auto",
                width: isMobile ? "100%" : "50%",
                padding: isMobile ? "0" : "0 3% 0 2%",
                transform: isMobile
                    ? `translateY(${lx(30, 0, t2)}px)`
                    : `translateX(${lx(60, 0, t2)}px)`,
                pointerEvents: t2 > 0.05 ? "auto" : "none",
            });

            /* Code-line stagger */
            const N = CODE.length;
            const pCode = rr(p, 0.66, 1.00);
            lineRefs.current.forEach((el, i) => {
                if (!el) return;
                const start = (i / N) * 0.88;
                const lv = rr(pCode, start, start + 0.09);
                set(el, {
                    opacity: lv,
                    transform: `translateY(${lx(10, 0, lv)}px)`,
                });
            });
        };

        const onScroll = () => {
            if (!raf.current) raf.current = requestAnimationFrame(tick);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        requestAnimationFrame(tick);
        const t = setTimeout(tick, 300);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
            clearTimeout(t);
        };
    }, []);

    /* ── Cursor glow: purple orb follows mouse inside the section ─── */
    useEffect(() => {
        const panel = stickyRef.current;
        if (!panel) return;
        const onMove = (e) => {
            const g = cursorRef.current;
            if (!g) return;
            const r = panel.getBoundingClientRect();
            g.style.left = `${e.clientX - r.left}px`;
            g.style.top = `${e.clientY - r.top}px`;
            g.style.opacity = "1";
        };
        const onLeave = () => {
            const g = cursorRef.current;
            if (g) g.style.opacity = "0";
        };
        panel.addEventListener("mousemove", onMove, { passive: true });
        panel.addEventListener("mouseleave", onLeave);
        return () => {
            panel.removeEventListener("mousemove", onMove);
            panel.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    /* ── Theme-aware colors ── mirrors all other sections ──────────
       Light: bg-white,  accent=#0F2854  (matches MeetMe h1 / Skills headings)
       Dark:  transparent, accent=#B388FF (LiquidEther canvas purple, App.jsx)  */
    const BG = isDark ? "transparent" : "#ffffff";
    const BGGRAD = "transparent";   /* body/LiquidEther always shows through */

    const ACC = isDark ? "#B388FF" : "#0F2854";
    const ACC_R = isDark ? "179,136,255" : "15,40,84";

    /* ── Single-source-of-truth theme palette ──────────────────────── */
    const COLORS = {
        /* Entry overlay — matches --background per theme, prevents flash */
        entryBg: isDark ? "#000000" : "#ffffff",

        /* "Ansh Mishra" name — matches MeetMe <h1> per theme */
        name: isDark ? "rgba(255,255,255,.92)" : "#0F2854",
        nameGlow: isDark ? `0 0 80px rgba(${ACC_R},.50), 0 0 160px rgba(${ACC_R},.20)`
            : `0 0 40px rgba(${ACC_R},.15)`,

        /* Terminal card glass */
        termBg: isDark ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.80)",
        termBorder: isDark ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(15,40,84,0.12)",
        termShadow: isDark
            ? `0 0 32px rgba(${ACC_R},.08), 0 20px 56px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)`
            : `0 0 24px rgba(${ACC_R},.06), 0 16px 40px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.80)`,
        termDivider: `1px solid rgba(${ACC_R},.10)`,

        /* Code syntax */
        code: isDark ? {
            comment: "rgba(100,116,139,.60)",
            keyword: "rgba(179,136,255,.95)",
            code: "rgba(203,213,225,.82)",
            string: "rgba(110,231,183,.88)",
            output: "rgba(147,197,253,.95)",
            cursor: "rgba(179,136,255,.90)",
        } : {
            comment: "#6B7280",   /* slate-500    — muted, not distracting          */
            keyword: "#1D4ED8",   /* blue-700     — bold keyword pop                */
            code: "#111827",   /* gray-900     — variables/property names, legible */
            string: "#047857",   /* emerald-700  — rich green strings              */
            output: "#0F2854",   /* site navy    — status / output line            */
            cursor: "#7C3AED",   /* violet-700   — distinguished cursor/function   */
        },
    };
    /* Shorthand so existing CLR references keep working */
    const CLR = COLORS.code;


    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=DM+Sans:wght@200;300;400&family=JetBrains+Mono:wght@300;400;500&display=swap"
                rel="stylesheet"
            />
            <style>{`
                @keyframes hi-twinkle {
                    0%,100% { opacity: var(--op); }
                    50%     { opacity: calc(var(--op) * 0.12); }
                }
                @keyframes hi-scan {
                    0%     { top: 0%;   opacity: 0; }
                    5%,95% { opacity: 0.06; }
                    100%   { top: 100%; opacity: 0; }
                }
                    0%,49%  { opacity: 1; }
                    50%,100%{ opacity: 0; }
                }
            `}</style>

            {/* ─────────────────────────────────────────────────
                OUTER: 320vh tall  →  100vh sticky + 220vh travel
                Mobile: 240vh (less scroll distance needed)
            ───────────────────────────────────────────────── */}
            <section
                ref={secRef}
                id="portrait"
                style={{
                    position: "relative",
                    height: "280vh",   /* works for both mobile and desktop */
                    /* NO background, NO isolation — lets LiquidEther fixed canvas show through */
                    zIndex: 10,
                }}
            >
                {/* Sticky viewport panel */}
                <div
                    ref={stickyRef}
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        /* overflow:hidden removed — it clips position:fixed descendants */
                        background: BGGRAD,
                        zIndex: 1,
                    }}
                >
                    {/* ── Cursor glow ── site blue #93C5FD, matches all other sections ── */}
                    <div
                        ref={cursorRef}
                        aria-hidden
                        style={{
                            position: "absolute",
                            width: 480, height: 480,
                            borderRadius: "50%",
                            /* Cursor glow — matches LiquidEther per-theme */
                            background: `radial-gradient(circle, rgba(${ACC_R},.18) 0%, rgba(${ACC_R},.05) 42%, transparent 70%)`,
                            transform: "translate(-50%,-50%)",
                            pointerEvents: "none",
                            zIndex: 5,
                            opacity: 0,
                            transition: "opacity .35s ease",
                            willChange: "left,top",
                        }}
                    />

                    {/* ── PHASE 0: Entry overlay — matches site bg per-theme, no flash ── */}
                    <div ref={entryRef} aria-hidden style={{
                        position: "absolute", inset: 0, zIndex: 60,
                        background: COLORS.entryBg,
                        pointerEvents: "none",
                        opacity: 1,
                    }} />

                    {/* ── Film grain ── */}
                    <div aria-hidden style={{
                        position: "absolute", inset: 0, zIndex: 58,
                        pointerEvents: "none", opacity: 0.04,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "170px",
                    }} />

                    {/* ── Ambient glows — mimic LiquidEther canvas colors ──────────
                        LiquidEther uses: #5227FF (indigo), #FF9FFC (pink), #B19EEF (lavender)
                        We use the indigo+lavender to match what the eye sees in MeetMe/Skills */}

                    {/* Ambient glows — theme-aware: purple in dark, navy in light */}
                    <div aria-hidden style={{
                        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                        background: `radial-gradient(circle at 70% 40%, rgba(${ACC_R},0.10), transparent 60%)`,
                    }} />
                    <div aria-hidden style={{
                        position: "absolute", right: "-10%", top: "0%",
                        width: "65vw", height: "100vh", borderRadius: "50%",
                        background: `radial-gradient(ellipse,rgba(${ACC_R},.10) 0%,rgba(${ACC_R},.03) 45%,transparent 72%)`,
                        filter: "blur(100px)", zIndex: 1, pointerEvents: "none",
                    }} />
                    <div aria-hidden style={{
                        position: "absolute", left: "-5%", bottom: "0%",
                        width: "40vw", height: "60vh", borderRadius: "50%",
                        background: `radial-gradient(ellipse,rgba(${ACC_R},.06) 0%,transparent 65%)`,
                        filter: "blur(70px)", zIndex: 1, pointerEvents: "none",
                    }} />

                    {/* ── Particles — LiquidEther lavender tones ── */}
                    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
                        {PARTICLES.map(pt => (
                            <div key={pt.id} style={{
                                position: "absolute",
                                left: `${pt.x}%`, top: `${pt.y}%`,
                                width: `${pt.s}px`, height: `${pt.s}px`,
                                borderRadius: "50%",
                                background: `rgba(${ACC_R},${pt.s > 1.3 ? '.35' : '.15'})`,
                                "--op": pt.op, opacity: pt.op,
                                animation: `hi-twinkle ${pt.dur}s ease-in-out ${pt.del}s infinite`,
                            }} />
                        ))}
                    </div>

                    {/* ════════════════════════════════════════════════
                        PHASE 3: NAME — large text BEHIND photo (z-10)
                        Layout: "ANSH  MISHRA" on same horizontal line
                        Visible on LEFT and RIGHT edges outside photo
                    ════════════════════════════════════════════════ */}
                    <div
                        ref={nameRef}
                        aria-hidden
                        style={{
                            position: "absolute", inset: 0,
                            display: "flex",
                            alignItems: "flex-start",
                            paddingTop: "22%",
                            justifyContent: "center",
                            zIndex: 10,
                            pointerEvents: "none",
                            opacity: 0,
                            willChange: "opacity,transform",
                        }}
                    >
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            /* Big enough to bleed out from behind the photo */
                            fontSize: "clamp(3.5rem, 11vw, 11rem)",
                            fontWeight: 900,
                            /* Matches MeetMe h1: #0F2854 light / white dark */
                            color: COLORS.name,
                            letterSpacing: "0.18em",
                            lineHeight: 1,
                            textAlign: "center",
                            userSelect: "none",
                            textTransform: "uppercase",
                            margin: 0,
                            textShadow: COLORS.nameGlow,
                            whiteSpace: "nowrap",
                        }}>
                            Ansh Mishra
                        </h1>
                    </div>

                    {/* ════════════════════════════════════════════════
                        PHASES 1-5: STICKER PHOTO (z-20, above name)

                        Phase 1: small rounded CARD rising from bottom
                        Phase 2: BREAKOUT → fills entire screen
                        Phase 4: contracts to left half, anchored at bottom
                    ════════════════════════════════════════════════ */}
                    <div
                        ref={stickerRef}
                        style={{
                            position: "absolute",
                            /* JS sets left/top/width/height/borderRadius */
                            left: 0,
                            top: "100vh",   /* starts below viewport */
                            width: "240px",
                            height: "360px",
                            zIndex: 20,
                            opacity: 0,
                            willChange: "transform,opacity,width,height,left,top,border-radius",
                            transformOrigin: "center bottom",
                            overflow: "hidden",  /* needed for border-radius to clip the img */
                            /* Card shadow (fades as border-radius goes to 0) */
                            // boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
                        }}
                    >
                        <img
                            src={photoSrc}
                            alt="Ansh Mishra"
                            style={{
                                width: "100%", height: "100%",
                                objectFit: "cover",
                                objectPosition: "center top",
                                display: "block",
                            }}
                            onError={e => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling.style.display = "flex";
                            }}
                        />
                        {/* Fallback */}
                        <div style={{
                            display: "none", width: "100%", height: "100%",
                            alignItems: "center", justifyContent: "center",
                            flexDirection: "column",
                            background: "linear-gradient(160deg,#0a1628,#060f22)",
                            color: "rgba(147,197,253,.45)",
                            fontFamily: "'DM Sans',sans-serif", fontSize: 13, gap: 8,
                        }}>
                            <span style={{ fontSize: 44, opacity: 0.15 }}>👤</span>
                            <p style={{ margin: 0 }}>Add /public/ansh.jpg</p>
                        </div>
                    </div>

                    {/* ════════════════════════════════════════════════
                        PHASES 4-5: Glass Terminal — right side (z-30)
                    ════════════════════════════════════════════════ */}
                    <div
                        ref={termRef}
                        style={{
                            position: "absolute",
                            /* Positioning set dynamically by scroll engine tick() on every frame/resize */
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            top: 0,           /* overridden per-frame by JS */
                            left: "auto",     /* overridden per-frame by JS */
                            width: "50%",     /* overridden per-frame by JS */
                            zIndex: 30,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "0 3% 0 2%",  /* overridden per-frame by JS */
                            opacity: 0,
                            transform: "translateY(40px)",
                            pointerEvents: "none",
                            willChange: "transform,opacity",
                        }}
                    >
                        <div style={{
                            width: "100%",
                            maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : 460,
                            /* Mobile: solid opaque card with no glass bleed-through */
                            background: isDark
                                ? "rgba(8, 10, 20, 0.97)"
                                : "rgba(255, 255, 255, 0.98)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: COLORS.termBorder,
                            borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? "16px 16px 0 0" : 16,
                            padding: typeof window !== 'undefined' && window.innerWidth < 768 ? "14px 16px 16px" : "20px 22px 24px",
                            position: "relative", overflow: "hidden",
                            boxShadow: isDark
                                ? `0 -8px 32px rgba(0,0,0,.70), 0 0 0 1px rgba(255,255,255,.08)`
                                : `0 -8px 24px rgba(15,40,84,.12), 0 0 0 1px rgba(15,40,84,.10)`,
                        }}>
                            {/* Mac dots */}
                            <div style={{
                                display: "flex", alignItems: "center",
                                gap: 6, marginBottom: 16, paddingBottom: 12,
                                borderBottom: COLORS.termDivider,
                            }}>
                                {/* Mac traffic-light dots — pixel-perfect colors + depth shadow */}
                                {[
                                    { bg: "#ff5f56", shadow: "rgba(255,95,86,.40)" },
                                    { bg: "#ffbd2e", shadow: "rgba(255,189,46,.40)" },
                                    { bg: "#27c93f", shadow: "rgba(39,201,63,.40)" },
                                ].map(({ bg, shadow }, i) => (
                                    <div key={i} style={{
                                        width: 11, height: 11, borderRadius: "50%",
                                        background: bg,
                                        boxShadow: `0 1px 3px ${shadow}, 0 0 0 0.5px rgba(0,0,0,.15)`,
                                    }} />
                                ))}
                                <span style={{
                                    fontFamily: "'JetBrains Mono',monospace",
                                    fontSize: 10, fontWeight: 300,
                                    color: "rgba(100,116,139,.6)", marginLeft: 10, letterSpacing: ".06em",
                                }}>
                                    ansh@dev ~ developer.js
                                </span>
                            </div>
                            {/* Code */}
                            <div style={{
                                fontFamily: "'JetBrains Mono',monospace",
                                fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 13,
                                lineHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.55 : 1.75,
                                overflowY: typeof window !== 'undefined' && window.innerWidth < 768 ? "auto" : "visible",
                                maxHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? "calc(52vh - 80px)" : "none",
                            }}>
                                {CODE.map((line, i) => (
                                    <div key={i} ref={el => { lineRefs.current[i] = el; }} style={{
                                        opacity: 0, transform: "translateY(10px)",
                                        willChange: "opacity,transform",
                                        display: "flex", alignItems: "baseline",
                                        minHeight: line.a === "" ? "1.1em" : "auto",
                                        /* Highlight the last/active typing line */
                                        background: i === CODE.length - 1
                                            ? `rgba(${ACC_R},0.06)`
                                            : "transparent",
                                        borderRadius: 4,
                                        paddingLeft: 2, marginLeft: -2,
                                    }}>
                                        <span style={{
                                            color: isDark ? "rgba(71,85,105,.45)" : "rgba(71,85,105,.55)",
                                            fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 9 : 11,
                                            marginRight: typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 14,
                                            minWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 18,
                                            textAlign: "right",
                                            userSelect: "none", flexShrink: 0,
                                        }}>
                                            {line.a !== "" ? i + 1 : ""}
                                        </span>
                                        {line.t === "comment" && <span style={{ color: CLR.comment }}>{line.a}</span>}
                                        {line.t === "keyword" && <span><span style={{ color: CLR.keyword }}>{line.a}</span><span style={{ color: CLR.code }}>{line.b}</span></span>}
                                        {line.t === "code" && <span><span style={{ color: CLR.code }}>{line.a}</span>{line.b && <span style={{ color: CLR.string }}>{line.b}</span>}</span>}
                                        {line.t === "string" && <span style={{ color: CLR.string }}>{line.a}</span>}
                                        {line.t === "output" && <span style={{ color: CLR.output, fontWeight: 500 }}>{line.a}</span>}
                                        {i === CODE.length - 1 && (
                                            <span style={{
                                                display: "inline-block", width: 7, height: "1em",
                                                background: CLR.cursor, marginLeft: 4,
                                                verticalAlign: "text-bottom",
                                                animation: "hi-blink 1s step-end infinite",
                                            }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Scan line — theme-aware tint */}
                            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: 16 }}>
                                <div style={{
                                    position: "absolute", left: 0, right: 0, height: 2,
                                    background: `linear-gradient(to right,transparent,rgba(${ACC_R},.06),transparent)`,
                                    animation: "hi-scan 8s linear infinite",
                                }} />
                            </div>
                            {/* Inner bottom glow — theme-aware */}
                            <div aria-hidden style={{
                                position: "absolute", bottom: "-25%", left: "5%", right: "5%", height: "48%",
                                background: `radial-gradient(ellipse,rgba(${ACC_R},.06) 0%,transparent 70%)`,
                                filter: "blur(26px)", pointerEvents: "none",
                            }} />
                        </div>
                    </div>

                    {/* ── TOP blend — subtle, does NOT cover the navbar ── */}
                    <div aria-hidden style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 48,
                        background: isDark
                            ? "linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 100%)"
                            : "linear-gradient(to bottom,rgba(255,255,255,0.35) 0%,transparent 100%)",
                        zIndex: 55, pointerEvents: "none",
                    }} />
                    {/* ── BOTTOM blend — fades into site background below the section ── */}
                    <div aria-hidden style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
                        background: isDark
                            ? "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 100%)"
                            : "linear-gradient(to top,rgba(255,255,255,0.6) 0%,transparent 100%)",
                        zIndex: 55, pointerEvents: "none",
                    }} />

                </div>{/* end sticky */}
            </section>
        </>
    );
}