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
const CLR = {
    comment: "rgba(100,116,139,.65)",
    keyword: "rgba(139,92,246,.96)",
    code: "rgba(186,230,253,.88)",
    string: "rgba(110,231,183,.92)",
    output: "rgba(99,179,237,1)",
    cursor: "rgba(139,92,246,.9)",
};

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
    const secRef = useRef(null);
    const stickerRef = useRef(null);
    const nameRef = useRef(null);
    const termRef = useRef(null);
    const entryRef = useRef(null);
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

            /* ── PHASE 0: fade black entry ─────────────────────────── */
            set(entryRef.current, { opacity: 1 - rr(p, 0, 0.06) });

            /* ── CARD Constants (small portrait card) ─────────────── */
            const CW = Math.min(220, vw * 0.38);   // card width
            const CH = Math.min(340, vh * 0.58);   // card height

            /* ── BREAKOUT target: tall centered portrait ───────────
               NOT edge-to-edge fullscreen — stays centered, grows to
               90vh tall × ~50vw wide (portrait ratio, main object)   */
            const BW = vw * 0.50;                  // breakout width  (50% viewport)
            const BH = vh * 0.90;                  // breakout height (90% viewport)
            const BL = (vw - BW) / 2;              // center horizontally
            const BT = (vh - BH) / 2;              // center vertically (5% top gap)

            /* ── PHASE 1: card rises from bottom ──────────────────── */
            const rise = rr(p, 0.00, 0.28);
            /* ── PHASE 2: BREAKOUT → big centered portrait ─────────── */
            const burst = rr(p, 0.28, 0.54);
            /* ── PHASE 4: slide to left half ──────────────────────── */
            const slide = rr(p, 0.62, 0.84);

            /* --- Width ---
               Phase 1:   CW (card size, constant)
               Phase 2:   CW → BW (grows to centered portrait width)
               Phase 4:   BW → BW (same width, slides left)            */
            const wBurst = lx(CW, BW, burst);
            const wFinal = wBurst;  // width stays BW in phase 4 (left half)

            /* --- Height ---
               Phase 1:   CH
               Phase 2:   CH → BH (grows to 90vh)
               Phase 4:   BH → vh (expands to full height as slides left) */
            const hBurst = lx(CH, BH, burst);
            const hFinal = lx(hBurst, vh, slide);

            /* --- Left ---
               Phase 1:   centered = (vw-CW)/2
               Phase 2:   card-center → BL (re-centers for new width BW)
               Phase 4:   BL → 0 (slides to left wall)                  */
            const cardCenterL = (vw - CW) / 2;
            const lBurst = lx(cardCenterL, BL, burst);
            const lFinal = lx(lBurst, 0, slide);

            /* --- Top ---
               Phase 1:   rises from below to card-center
               Phase 2:   card-center-y → BT (re-centers for new height BH)
               Phase 4:   BT → 0 (anchors to top as it goes full height)  */
            const cardCenterT = (vh - CH) / 2;
            const topEntry = vh + 60;
            const topRisen = lx(topEntry, cardCenterT, rise);
            const topAfterRise = rise >= 1 ? cardCenterT : topRisen;
            const tBurst = lx(topAfterRise, BT, burst);
            const tFinal = lx(tBurst, 0, slide);

            /* --- Border radius ---
               Phase 1: 16px (card)   Phase 2: 16 → 0 (breakout)         */
            const brFinal = lx(16, 0, burst);

            /* --- Opacity --- */
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
            const t2 = rr(p, 0.66, 0.86);
            set(termRef.current, {
                opacity: t2,
                transform: `translateX(${lx(60, 0, t2)}px)`,
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

    const BG = "#050d1f";
    const BGGRAD = "linear-gradient(145deg,#060e22 0%,#080f20 55%,#050b1a 100%)";

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
                @keyframes hi-blink {
                    0%,49%  { opacity: 1; }
                    50%,100%{ opacity: 0; }
                }
            `}</style>

            {/* ─────────────────────────────────────────────────
                OUTER: 320vh tall  →  100vh sticky + 220vh travel
            ───────────────────────────────────────────────── */}
            <section
                ref={secRef}
                id="portrait"
                style={{
                    position: "relative",
                    height: "320vh",
                    background: BG,
                    zIndex: 10,
                    isolation: "isolate",
                }}
            >
                {/* Sticky viewport panel */}
                <div style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    background: BGGRAD,
                    zIndex: 1,
                }}>

                    {/* ── PHASE 0: Black entry overlay ── */}
                    <div ref={entryRef} aria-hidden style={{
                        position: "absolute", inset: 0, zIndex: 60,
                        background: "#000000", pointerEvents: "none",
                        opacity: 1,
                    }} />

                    {/* ── Film grain ── */}
                    <div aria-hidden style={{
                        position: "absolute", inset: 0, zIndex: 58,
                        pointerEvents: "none", opacity: 0.04,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "170px",
                    }} />

                    {/* ── Ambient right glow ── */}
                    <div aria-hidden style={{
                        position: "absolute", right: "-8%", top: "5%",
                        width: "60vw", height: "90vh", borderRadius: "50%",
                        background: "radial-gradient(ellipse,rgba(99,102,241,.22) 0%,rgba(79,70,229,.07) 45%,transparent 72%)",
                        filter: "blur(90px)", zIndex: 1, pointerEvents: "none",
                    }} />

                    {/* ── Particles ── */}
                    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
                        {PARTICLES.map(pt => (
                            <div key={pt.id} style={{
                                position: "absolute",
                                left: `${pt.x}%`, top: `${pt.y}%`,
                                width: `${pt.s}px`, height: `${pt.s}px`,
                                borderRadius: "50%",
                                background: pt.s > 1.3 ? "rgba(139,92,246,.5)" : "rgba(186,230,253,.3)",
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
                            alignItems: "center",
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
                            /* Bright white — visible on both sides of the photo */
                            color: "rgba(255,255,255,0.92)",
                            letterSpacing: "0.18em",
                            lineHeight: 1,
                            textAlign: "center",
                            userSelect: "none",
                            textTransform: "uppercase",
                            margin: 0,
                            /* Subtle glow */
                            textShadow: "0 0 80px rgba(99,102,241,0.5), 0 0 160px rgba(139,92,246,0.3)",
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
                            boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
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
                            right: 0, top: 0, bottom: 0,
                            width: "50%",
                            zIndex: 30,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "0 3% 0 2%",
                            opacity: 0,
                            transform: "translateX(60px)",
                            pointerEvents: "none",
                            willChange: "transform,opacity",
                        }}
                    >
                        <div style={{
                            width: "100%", maxWidth: 460,
                            background: "rgba(3,7,20,.94)",
                            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(99,102,241,.20)",
                            borderRadius: 16, padding: "20px 22px 24px",
                            position: "relative", overflow: "hidden",
                            boxShadow: "0 8px 40px rgba(0,0,0,.72),inset 0 1px 0 rgba(255,255,255,.04)",
                        }}>
                            {/* Mac dots */}
                            <div style={{
                                display: "flex", alignItems: "center",
                                gap: 6, marginBottom: 16, paddingBottom: 12,
                                borderBottom: "1px solid rgba(99,102,241,.10)",
                            }}>
                                {["rgba(255,95,87,.85)", "rgba(255,189,46,.85)", "rgba(40,200,64,.85)"].map((c, i) => (
                                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
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
                                fontSize: "clamp(.56rem,.82vw,.7rem)",
                                lineHeight: 1.88,
                            }}>
                                {CODE.map((line, i) => (
                                    <div key={i} ref={el => { lineRefs.current[i] = el; }} style={{
                                        opacity: 0, transform: "translateY(10px)",
                                        willChange: "opacity,transform",
                                        display: "flex", alignItems: "baseline",
                                        minHeight: line.a === "" ? ".7em" : "auto",
                                    }}>
                                        <span style={{
                                            color: "rgba(71,85,105,.36)", fontSize: ".67em",
                                            marginRight: 13, minWidth: 18, textAlign: "right",
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
                            {/* Scan line */}
                            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: 16 }}>
                                <div style={{
                                    position: "absolute", left: 0, right: 0, height: 2,
                                    background: "linear-gradient(to right,transparent,rgba(99,102,241,.07),transparent)",
                                    animation: "hi-scan 8s linear infinite",
                                }} />
                            </div>
                            {/* Inner glow */}
                            <div aria-hidden style={{
                                position: "absolute", bottom: "-25%", left: "5%", right: "5%", height: "48%",
                                background: "radial-gradient(ellipse,rgba(99,102,241,.10) 0%,transparent 70%)",
                                filter: "blur(26px)", pointerEvents: "none",
                            }} />
                        </div>
                    </div>

                    {/* Top blend */}
                    <div aria-hidden style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 68,
                        background: `linear-gradient(to bottom,${BG},transparent)`,
                        zIndex: 55, pointerEvents: "none",
                    }} />

                </div>{/* end sticky */}
            </section>
        </>
    );
}