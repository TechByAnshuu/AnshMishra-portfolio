/**
 * HeroIntro.jsx — Moon Eclipse Circle Expand (EXACT 4-PHASE)
 *
 * PHASE 1  p:0.00→0.35  Only CIRCLE grows (52→90vmin). Photo stays small. NO shape change.
 * PHASE 2  p:0.35→0.65  Circle AND photo grow together (90→200vmin) + drift left.
 * PHASE 3  p:0.55→0.75  Border-radius melts: circle becomes left panel (50vw×100vh).
 * PHASE 4  p:0.68→1.00  Terminal card slides in from right.
 *                        Photo shrinks to arch shape, 30% height, centered in left panel.
 *
 * MOBILE:  Simplified static layout — photo centered, name above/below, icons below.
 *          No scroll animation phases on mobile (too short to scroll 500vh).
 */

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rr = (p, a, b) => cl((p - a) / (b - a), 0, 1);
const lx = (a, b, t) => a + (b - a) * t;
const set = (el, s) => { if (el) Object.assign(el.style, s); };

const CODE_LINES = [
  [{ c: "purple", t: "const " }, { c: "plain", t: "engineer " }, { c: "cyan", t: "= " }, { c: "plain", t: "{" }],
  [{ c: "blue", t: "  name" }, { c: "cyan", t: ": " }, { c: "orange", t: '"Ansh Mishra"' }, { c: "plain", t: "," }],
  [{ c: "blue", t: "  role" }, { c: "cyan", t: ": " }, { c: "orange", t: '"Full Stack & Cloud Developer"' }, { c: "plain", t: "," }],
  [{ c: "blue", t: "  philosophy" }, { c: "cyan", t: ": " }, { c: "orange", t: '"Code is architecture."' }, { c: "plain", t: "," }],
  [{ c: "blue", t: "  mission" }, { c: "cyan", t: ": " }, { c: "orange", t: '"Build systems that outlive the deadline."' }, { c: "plain", t: "," }],
  [{ c: "blue", t: "  craft" }, { c: "cyan", t: ": " }, { c: "plain", t: "{" }],
  [{ c: "blue", t: "    frontend" }, { c: "cyan", t: ": " }, { c: "plain", t: "[" }, { c: "orange", t: '"React"' }, { c: "plain", t: ", " }, { c: "orange", t: '"Next.js"' }, { c: "plain", t: ", " }, { c: "orange", t: '"Tailwind"' }, { c: "plain", t: "]," }],
  [{ c: "blue", t: "    backend" }, { c: "cyan", t: ": " }, { c: "plain", t: "[" }, { c: "orange", t: '"Node.js"' }, { c: "plain", t: ", " }, { c: "orange", t: '"Express"' }, { c: "plain", t: ", " }, { c: "orange", t: '"Python"' }, { c: "plain", t: "]," }],
  [{ c: "blue", t: "    cloud" }, { c: "cyan", t: ": " }, { c: "plain", t: "[" }, { c: "orange", t: '"AWS"' }, { c: "plain", t: ", " }, { c: "orange", t: '"Docker"' }, { c: "plain", t: ", " }, { c: "orange", t: '"K8s"' }, { c: "plain", t: ", " }, { c: "orange", t: '"CI/CD"' }, { c: "plain", t: "]," }],
  [{ c: "blue", t: "    design" }, { c: "cyan", t: ": " }, { c: "orange", t: '"pixels with purpose"' }, { c: "plain", t: "," }],
  [{ c: "blue", t: "    systems" }, { c: "cyan", t: ": " }, { c: "orange", t: '"infrastructure as poetry"' }, { c: "plain", t: "," }],
  [{ c: "plain", t: "  }," }],
  [{ c: "plain", t: "};" }],
  [],
  [{ c: "purple", t: "function " }, { c: "blue", t: "ship" }, { c: "plain", t: "() {" }],
  [{ c: "teal", t: "  return " }, { c: "green", t: "engineer" }],
  [{ c: "plain", t: "    ." }, { c: "blue", t: "design" }, { c: "plain", t: "()." }, { c: "blue", t: "build" }, { c: "plain", t: "()" }],
  [{ c: "plain", t: "    ." }, { c: "blue", t: "deploy" }, { c: "plain", t: "()." }, { c: "purple", t: "scale" }, { c: "plain", t: "();" }],
  [{ c: "plain", t: "}" }],
  [],
  [{ c: "purple", t: "> " }, { c: "purple", t: "ship" }, { c: "plain", t: "(); " }, { c: "comment", t: "// Online & Shipping " }]
];

export default function HeroIntro({ photoSrc = "/photo.jpg" }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const acc = dark ? "#B388FF" : "#0F2854";
  const accRgb = dark ? "179,136,255" : "15,40,84";
  const bg = dark ? "#000000" : "#f0f0f5";

  const secRef = useRef(null);
  const circleRef = useRef(null);
  const photoRef = useRef(null);
  const frameRef = useRef(null);
  const decorRef = useRef(null);
  const glowRef = useRef(null);
  const spinRef = useRef(null);
  const bgRef = useRef(null);
  const hintRef = useRef(null);
  const termRef = useRef(null);

  const lineRefs = useRef([]);
  const raf = useRef(null);
  const [photoErr, setPhotoErr] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Desktop scroll animation (unchanged) ── */
  useEffect(() => {
    if (isMobile) return; // skip on mobile

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
      const vmin = Math.min(vw, vh);

      const p12 = rr(p, 0.00, 0.35);
      const p23 = rr(p, 0.35, 0.65);
      const p34 = rr(p, 0.55, 0.75);

      const finalW = vw * 0.50;
      const finalH = vh;

      let cW, cH;
      if (p < 0.35) {
        const d = lx(52, 90, p12) * vmin / 100;
        cW = d; cH = d;
      } else if (p < 0.55) {
        const d = lx(90, 200, p23) * vmin / 100;
        cW = d; cH = d;
      } else {
        const dBase = 200 * vmin / 100;
        cW = lx(dBase, finalW, p34);
        cH = lx(dBase, finalH, p34);
      }

      const maxDrift = -25;
      const circleX = p < 0.35 ? 0 : lx(0, maxDrift, p23);
      const bRadius = p < 0.55 ? "50%" : `${lx(50, 0, p34)}%`;

      set(circleRef.current, {
        width: `${cW}px`,
        height: `${cH}px`,
        borderRadius: bRadius,
        transform: `translate(calc(-50% + ${circleX}vw), -50%)`,
      });

      set(glowRef.current, { opacity: 1 - rr(p, 0.05, 0.35) });
      set(spinRef.current, { opacity: 1 - rr(p, 0, 0.20) });
      set(bgRef.current, { opacity: 1 - rr(p, 0, 0.28) });
      set(hintRef.current, { opacity: 1 - rr(p, 0, 0.08) });

      const p4 = rr(p, 0.68, 1.0);

      const frameH = p < 0.68 ? "100%" : `${lx(100, 85, p4)}%`;
      const frameW = p < 0.68 ? "100%" : "auto";
      const framePad = p < 0.68 ? 0 : lx(0, 24, p4);

      set(frameRef.current, {
        height: frameH,
        width: frameW,
        padding: `${framePad}px`,
        borderRadius: p4 > 0.05 ? `${lx(0, 30, p4)}px` : "0px",
        background: p4 > 0.05 ? (dark ? `rgba(13,13,13,${p4})` : `rgba(17,17,17,${p4})`) : "transparent",
        border: p4 > 0.05 ? `1px solid rgba(255,255,255,${lx(0, 0.07, p4)})` : "1px solid transparent",
        boxShadow: p4 > 0.05 ? `0 32px 80px rgba(0,0,0,${lx(0, 0.85, p4)}), inset 0 1px 0 rgba(255,255,255,${lx(0, 0.08, p4)}), inset 0 -2px 8px rgba(0,0,0,${lx(0, 0.6, p4)})` : "none",
        alignSelf: "center",
      });

      const frameProg = rr(p, 0.72, 1.0);
      if (decorRef.current) set(decorRef.current, { opacity: frameProg });

      set(photoRef.current, {
        height: "100%",
        width: p < 0.68 ? "100%" : "auto",
        borderRadius: p4 > 0.05 ? `${lx(0, 16, p4)}px` : "0px",
        objectFit: "cover",
        objectPosition: "center top",
        flexShrink: 0,
      });

      const tp = rr(p, 0.68, 0.92);
      set(termRef.current, {
        opacity: tp,
        transform: `translateX(${lx(60, 0, tp)}px)`,
        pointerEvents: tp > 0.05 ? "auto" : "none",
      });

      const cp = rr(p, 0.72, 1.0);
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = (i / CODE_LINES.length) * 0.85;
        const lv = rr(cp, s, s + 0.12);
        set(el, { opacity: lv, transform: `translateY(${lx(10, 0, lv)}px)` });
      });
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(tick);

    const t = setTimeout(tick, 150);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(t);
    };
  }, [isMobile, dark]);

  const eclipseGlow = dark ? `
    0 0 0 1px rgba(200,170,255,.95),
    0 0 18px 4px rgba(${accRgb},.75),
    0 0 60px 18px rgba(${accRgb},.38),
    0 0 140px 55px rgba(80,50,200,.18)
  ` : `
    0 0 0 1px rgba(15,40,84,.7),
    0 0 18px 4px rgba(${accRgb},.45),
    0 0 60px 18px rgba(${accRgb},.18),
    0 0 120px 45px rgba(${accRgb},.08)
  `;

  const eclipsePulse = dark ? `
    0 0 0 1px rgba(220,190,255,1),
    0 0 24px 8px rgba(${accRgb},.92),
    0 0 80px 26px rgba(${accRgb},.50),
    0 0 180px 70px rgba(80,50,200,.28)
  ` : `
    0 0 0 1px rgba(15,40,84,.9),
    0 0 24px 8px rgba(${accRgb},.62),
    0 0 80px 26px rgba(${accRgb},.28),
    0 0 150px 60px rgba(${accRgb},.14)
  `;

  /* ══════════════════════════════════════
     MOBILE LAYOUT — clean, no scroll anim
  ══════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=DM+Sans:wght@200;300;400&family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @keyframes hi-eclipse {
            0%,100% { box-shadow: ${eclipseGlow}; }
            50%     { box-shadow: ${eclipsePulse}; }
          }
          @keyframes hi-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes hi-bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
          @keyframes hi-blink   { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          @keyframes hi-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          .hi-eclipse { animation: hi-eclipse 3.5s ease-in-out infinite; }
          .hi-spin    { animation: hi-spin 18s linear infinite; }
          .hi-mobile-fade { animation: hi-fade-up 0.7s ease-out both; }
        `}</style>

        <section
          id="hero"
          style={{
            position: "relative",
            minHeight: "100svh",
            background: bg,
            zIndex: 10,
            isolation: "isolate",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "72px",   /* navbar height */
            paddingBottom: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
            gap: "28px",
            overflow: "hidden",
          }}
        >
          {/* Background vignette */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            background: dark
              ? "radial-gradient(ellipse at 50% 40%,rgba(0,0,0,0) 20%,rgba(0,0,0,.6) 80%)"
              : "radial-gradient(ellipse at 50% 40%,rgba(240,240,245,0) 20%,rgba(240,240,245,.7) 80%)",
          }} />

          {/* ── "hello, I'm" tagline ── */}
          <div
            className="hi-mobile-fade"
            style={{ animationDelay: "0.1s", zIndex: 2, textAlign: "center" }}
          >
            <span style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: dark ? "rgba(255,255,255,.55)" : "rgba(15,40,84,.55)",
              letterSpacing: ".02em",
            }}>hello, I'm</span>
          </div>

          {/* ── Photo circle ── */}
          <div
            className="hi-mobile-fade hi-eclipse"
            style={{
              animationDelay: "0.2s",
              zIndex: 2,
              width: "62vmin",
              height: "62vmin",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Rotating text ring */}
            <div
              className="hi-spin"
              style={{
                position: "absolute", inset: "-12px",
                zIndex: 11, pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="rp-m" d="M 150,150 m -125,0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0" />
                </defs>
                <text fontFamily="DM Sans,sans-serif" fontSize="10.5" fontWeight="300" letterSpacing="3.2"
                  fill={dark ? "rgba(255,255,255,.35)" : "rgba(15,40,84,.35)"}>
                  <textPath href="#rp-m">
                    Hello · Full Stack &amp; Cloud Developer · Available to work · Ansh Mishra · &nbsp;&nbsp;&nbsp;&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>

            {!photoErr ? (
              <img
                src={photoSrc}
                alt="Ansh Mishra"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                  filter: "contrast(1.08) brightness(0.95)",
                  display: "block",
                }}
                onError={() => setPhotoErr(true)}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(160deg,#0d0020,#050d1f)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg viewBox="0 0 160 280" style={{ height: "80%", width: "auto" }} xmlns="http://www.w3.org/2000/svg">
                  <circle cx="80" cy="90" r="34" fill="rgba(255,220,180,.85)" />
                  <ellipse cx="80" cy="200" rx="32" ry="50" fill={`rgba(${accRgb},.18)`} />
                </svg>
              </div>
            )}
          </div>

          {/* ── Name ── */}
          <div
            className="hi-mobile-fade"
            style={{
              animationDelay: "0.3s",
              zIndex: 2,
              textAlign: "center",
              fontFamily: "'Playfair Display',serif",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            <div style={{
              fontSize: "clamp(3.2rem, 16vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-.02em",
              color: dark ? "#ffffff" : "#0F2854",
            }}>
              Ansh Mishra
            </div>
            <div style={{
              marginTop: "10px",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 300,
              fontSize: "clamp(.7rem, 3.5vw, .95rem)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,.4)" : "rgba(15,40,84,.4)",
            }}>
              Full Stack &amp; Cloud Developer
            </div>
          </div>

          {/* ── Social icons + Resume button ── */}
          <div
            className="hi-mobile-fade"
            style={{
              animationDelay: "0.45s",
              zIndex: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="https://github.com/TechByAnshuu" target="_blank" rel="noopener noreferrer"
              style={{
                padding: "10px", borderRadius: "50%",
                border: dark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,40,84,.2)",
                color: dark ? "#ffffff" : "#0F2854",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dark ? "rgba(255,255,255,.05)" : "rgba(15,40,84,.05)",
                transition: "all .3s",
              }}
              aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ansh-mishra-dev/" target="_blank" rel="noopener noreferrer"
              style={{
                padding: "10px", borderRadius: "50%",
                border: dark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,40,84,.2)",
                color: dark ? "#ffffff" : "#0F2854",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dark ? "rgba(255,255,255,.05)" : "rgba(15,40,84,.05)",
                transition: "all .3s",
              }}
              aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:anshmishra14.14@gmail.com"
              style={{
                padding: "10px", borderRadius: "50%",
                border: dark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,40,84,.2)",
                color: dark ? "#ffffff" : "#0F2854",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dark ? "rgba(255,255,255,.05)" : "rgba(15,40,84,.05)",
                transition: "all .3s",
              }}
              aria-label="Email">
              <Mail size={20} />
            </a>
            <Link to="/view-resume" target="_blank" rel="noopener noreferrer"
              style={{
                padding: "10px 20px", borderRadius: "999px",
                border: dark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,40,84,.25)",
                color: dark ? "#ffffff" : "#0F2854",
                display: "flex", alignItems: "center", gap: "8px",
                background: dark ? "rgba(255,255,255,.05)" : "rgba(15,40,84,.06)",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "12px", fontWeight: 500,
                letterSpacing: ".06em",
                transition: "all .3s",
              }}
              aria-label="View Resume">
              <FileText size={16} />
              <span>View Resume</span>
            </Link>
          </div>

          {/* ── Scroll hint ── */}
          <div
            className="hi-mobile-fade"
            style={{
              animationDelay: "0.6s",
              zIndex: 2,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              marginTop: "8px",
            }}
          >
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "8px",
              fontWeight: 300, letterSpacing: ".32em", textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,.25)" : "rgba(15,40,84,.25)",
            }}>Scroll Down</span>
            <div className="hi-bounce" style={{
              width: "1px", height: "32px",
              background: `linear-gradient(to bottom,rgba(${accRgb},.5),transparent)`,
            }} />
          </div>

          {/* Aspiring tagline at bottom */}
          <div style={{
            position: "absolute", bottom: "16px", left: 0, right: 0,
            textAlign: "center", zIndex: 2,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(.52rem,.65vw,.7rem)",
            fontWeight: 200, letterSpacing: ".38em",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,.2)" : "rgba(15,40,84,.2)",
          }}>
            Aspiring Full Stack &amp; Cloud Developer
          </div>
        </section>
      </>
    );
  }

  /* ══════════════════════════════════════
     DESKTOP LAYOUT — original scroll anim
  ══════════════════════════════════════ */
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=DM+Sans:wght@200;300;400&family=JetBrains+Mono:wght@300;400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes hi-eclipse {
          0%,100% { box-shadow: ${eclipseGlow}; }
          50%     { box-shadow: ${eclipsePulse}; }
        }
        @keyframes hi-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hi-bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        @keyframes hi-scan    { 0%{top:0%;opacity:0} 5%,95%{opacity:.05} 100%{top:100%;opacity:0} }
        @keyframes hi-blink   { 0%,49%{opacity:1} 50%,100%{opacity:0} }

        @keyframes hi-glitch-r {
          0%,90%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
          91%  { clip-path:inset(18% 0 52% 0); transform:translate(-4px,1px); }
          93%  { clip-path:inset(62% 0 10% 0); transform:translate(3px,-2px); }
          95%  { clip-path:inset(35% 0 40% 0); transform:translate(-2px,3px); }
          97%  { clip-path:inset(5%  0 80% 0); transform:translate(5px,0);   }
          99%  { clip-path:inset(75% 0 8%  0); transform:translate(-3px,2px); }
        }
        @keyframes hi-glitch-b {
          0%,88%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
          89%  { clip-path:inset(45% 0 30% 0); transform:translate(4px,-1px); }
          92%  { clip-path:inset(10% 0 70% 0); transform:translate(-3px,2px); }
          94%  { clip-path:inset(70% 0 5%  0); transform:translate(2px,-3px); }
          96%  { clip-path:inset(28% 0 55% 0); transform:translate(-5px,1px); }
          98%  { clip-path:inset(85% 0 2%  0); transform:translate(3px,0);   }
        }
        @keyframes hi-scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes hi-frame-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hi-eclipse { animation: hi-eclipse 3.5s ease-in-out infinite; }
        .hi-spin    { animation: hi-spin 18s linear infinite; }
        .hi-bounce  { animation: hi-bounce 2s ease-in-out infinite; }
        .hi-scan    { animation: hi-scan 8s linear infinite; }
        .hi-blink   { animation: hi-blink 1s step-end infinite; }
      `}</style>

      <section
        ref={secRef}
        id="hero"
        style={{ position: "relative", height: "600vh", background: bg, zIndex: 10, isolation: "isolate" }}
      >
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", background: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1,
        }}>

          {/* ── z:1 frame.png ── */}
          <img
            src="/frame.png"
            alt="" aria-hidden
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: dark ? 0.18 : 0.07,
              filter: "blur(4px) saturate(0.5)",
              zIndex: 0, pointerEvents: "none",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            background: dark
              ? "radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 15%,rgba(0,0,0,.75) 70%,rgba(0,0,0,.97) 100%)"
              : "radial-gradient(ellipse at 50% 50%,rgba(240,240,245,0) 15%,rgba(240,240,245,.75) 70%,rgba(240,240,245,.97) 100%)",
          }} />

          {/* ── z:12 Giant background text ── */}
          <div ref={bgRef} style={{ position: "absolute", inset: 0, zIndex: 12, pointerEvents: "none", mixBlendMode: "difference" }}>
            <div style={{
              position: "absolute", left: "15%", top: "40%",
              transform: "translateY(-50%)",
              fontFamily: "'Playfair Display',serif", userSelect: "none",
            }}>
              <div style={{
                fontSize: "clamp(1rem, 1.4vw, 1.6rem)", fontStyle: "italic",
                color: "#ffffff", letterSpacing: ".02em", marginBottom: "-0.5vh", paddingLeft: "4px"
              }}>hello, I'm</div>
              <div style={{
                fontSize: "clamp(4rem, 9vw, 8rem)", fontWeight: 900, lineHeight: 1,
                letterSpacing: "-.02em", color: "#ffffff",
              }}>Ansh</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1.5rem", pointerEvents: "auto" }}>
                <a href="https://github.com/TechByAnshuu" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110 flex items-center justify-center text-white" aria-label="GitHub">
                  <Github className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://www.linkedin.com/in/ansh-mishra-dev/" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110 flex items-center justify-center text-white" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="mailto:anshmishra14.14@gmail.com"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110 flex items-center justify-center text-white" aria-label="Email">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <Link to="/view-resume" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2.5 text-white font-mono text-xs md:text-sm font-medium tracking-wide" aria-label="View Resume">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <span>View Resume</span>
                </Link>
              </div>
            </div>
            <div style={{
              position: "absolute", right: "10%", top: "58%",
              transform: "translateY(-50%)",
              fontFamily: "'Playfair Display',serif", textAlign: "right", userSelect: "none",
            }}>
              <div style={{
                fontSize: "clamp(4rem, 9vw, 8rem)", fontWeight: 900,
                lineHeight: 1, letterSpacing: "-.02em", color: "#ffffff",
              }}>Mishra</div>
            </div>

            <div style={{
              position: "absolute", bottom: "8%", left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(.56rem,.75vw,.78rem)", fontWeight: 200,
              letterSpacing: ".38em", textTransform: "uppercase", whiteSpace: "nowrap",
              color: dark ? "rgba(255,255,255,.25)" : "rgba(15,40,84,.25)",
            }}>Aspiring Full Stack &amp; Cloud Developer</div>
          </div>

          {/* ── z:9 Eclipse glow ── */}
          <div
            ref={glowRef}
            className="hi-eclipse"
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "52vmin", height: "52vmin",
              borderRadius: "50%",
              boxShadow: eclipseGlow,
              zIndex: 9, pointerEvents: "none",
              willChange: "opacity",
            }}
          />

          {/* ── z:10 CIRCLE WRAPPER ── */}
          <div
            ref={circleRef}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "52vmin", height: "52vmin",
              borderRadius: "50%",
              overflow: "hidden",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "width,height,transform,border-radius",
              transition: [
                "width .05s linear",
                "height .05s linear",
                "border-radius .28s ease",
              ].join(", "),
            }}
          >
            <div
              ref={frameRef}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                zIndex: 1,
                alignItems: "center",
                justifyContent: "center",
                willChange: "padding,height,width,background,border-radius,box-shadow,border",
                transition: "padding 0.1s linear, background 0.1s linear, border-radius 0.1s linear",
              }}
            >
              <div ref={decorRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0, borderRadius: "inherit", overflow: "hidden", zIndex: 1 }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "hi-frame-shimmer 4s ease-in-out infinite",
                }} />
                {[
                  { top: "12px", left: "12px" },
                  { top: "12px", right: "12px" },
                  { bottom: "12px", left: "12px" },
                  { bottom: "12px", right: "12px" },
                ].map((pos, i) => (
                  <div key={i} style={{
                    position: "absolute", ...pos,
                    width: "5px", height: "5px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                  }} />
                ))}
              </div>

              {!photoErr ? (
                <img
                  ref={photoRef}
                  src={photoSrc}
                  alt="Ansh Mishra"
                  style={{
                    display: "block",
                    willChange: "height,width,border-radius",
                    transition: [
                      "height .6s cubic-bezier(.4,0,.2,1)",
                      "width .6s cubic-bezier(.4,0,.2,1)",
                      "border-radius .5s cubic-bezier(.4,0,.2,1)",
                    ].join(", "),
                    filter: "contrast(1.08) brightness(0.95)",
                    flexShrink: 0,
                    zIndex: 2,
                    position: "relative",
                  }}
                  onError={() => setPhotoErr(true)}
                />
              ) : (
                <div
                  ref={photoRef}
                  style={{
                    background: "linear-gradient(160deg,#0d0020 0%,#050d1f 100%)",
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                    paddingRight: "6%", overflow: "hidden",
                    willChange: "height,width,border-radius",
                    transition: [
                      "height .6s cubic-bezier(.4,0,.2,1)",
                      "width .6s cubic-bezier(.4,0,.2,1)",
                      "border-radius .5s cubic-bezier(.4,0,.2,1)",
                    ].join(", "),
                    filter: "contrast(1.08) brightness(0.95)",
                    flexShrink: 0, zIndex: 2, position: "relative",
                  }}
                >
                  <svg viewBox="0 0 160 280" style={{ height: "88%", width: "auto" }} xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="80" cy="200" rx="32" ry="50" fill="rgba(179,136,255,.18)" />
                    <circle cx="80" cy="90" r="34" fill="rgba(255,220,180,.85)" />
                    <ellipse cx="80" cy="76" rx="32" ry="16" fill="rgba(40,25,10,.9)" />
                    <path d="M 60 75 Q 80 55 100 75" fill="rgba(40,25,10,.9)" />
                    <circle cx="68" cy="90" r="4.5" fill="#1a1a1a" />
                    <circle cx="92" cy="90" r="4.5" fill="#1a1a1a" />
                    <circle cx="69.5" cy="88.5" r="1.5" fill="white" />
                    <circle cx="93.5" cy="88.5" r="1.5" fill="white" />
                    <path d="M 68 104 Q 80 114 92 104" stroke="#c0392b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <path d="M 112 152 Q 138 128 148 95" stroke={`rgba(${accRgb},.55)`} strokeWidth="12" strokeLinecap="round" fill="none" />
                    <circle cx="148" cy="90" r="10" fill="rgba(255,220,180,.88)" />
                    <path d="M 48 152 Q 38 175 32 195" stroke={`rgba(${accRgb},.55)`} strokeWidth="12" strokeLinecap="round" fill="none" />
                    <path d="M 60 245 L 52 275" stroke={`rgba(${accRgb},.45)`} strokeWidth="14" strokeLinecap="round" fill="none" />
                    <path d="M 100 245 L 108 275" stroke={`rgba(${accRgb},.45)`} strokeWidth="14" strokeLinecap="round" fill="none" />
                    <rect x="114" y="38" width="44" height="24" rx="8" fill={`rgba(${accRgb},.92)`} />
                    <polygon points="120,62 126,74 132,62" fill={`rgba(${accRgb},.92)`} />
                    <text x="136" y="54" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="12" fontWeight="700" fill="white">Hi!</text>
                  </svg>
                </div>
              )}
            </div>

            {/* ── GLITCH BEAM ── */}
            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5 }}>
              <div style={{
                position: "absolute", left: 0, right: 0, height: "28%",
                background: `linear-gradient(to bottom, transparent, rgba(${accRgb},.025) 40%, rgba(${accRgb},.04) 50%, rgba(${accRgb},.025) 60%, transparent)`,
                animation: "hi-scanline 7s linear infinite",
              }} />
            </div>

            {/* ── GLITCH RED channel ── */}
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: `url(${photoSrc}) center top / cover`,
              filter: "grayscale(35%) contrast(1.12) brightness(0.92) sepia(8%)",
              mixBlendMode: "screen", opacity: 0.55,
              animation: "hi-glitch-r 9s steps(1) infinite",
              zIndex: 6, pointerEvents: "none",
              boxShadow: "inset 0 0 0 100vw rgba(255,30,30,.08)",
            }} />

            {/* ── GLITCH BLUE channel ── */}
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: `url(${photoSrc}) center top / cover`,
              filter: "grayscale(35%) contrast(1.12) brightness(0.92) sepia(8%)",
              mixBlendMode: "screen", opacity: 0.45,
              animation: "hi-glitch-b 9s steps(1) infinite",
              zIndex: 6, pointerEvents: "none",
              boxShadow: "inset 0 0 0 100vw rgba(30,100,255,.08)",
            }} />
          </div>

          {/* ── z:11 Rotating text ring ── */}
          <div
            ref={spinRef}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "72vmin", height: "72vmin",
              zIndex: 11, pointerEvents: "none",
              willChange: "opacity",
            }}
          >
            <div className="hi-spin" style={{ width: "100%", height: "100%" }}>
              <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="rp" d="M 150,150 m -125,0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0" />
                </defs>
                <text fontFamily="DM Sans,sans-serif" fontSize="10.5" fontWeight="300" letterSpacing="3.2"
                  fill={dark ? "rgba(255,255,255,.38)" : "rgba(15,40,84,.38)"}>
                  <textPath href="#rp">
                    Hello · Full Stack &amp; Cloud Developer · Available to work · Ansh Mishra · &nbsp;&nbsp;&nbsp;&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* ── z:20 Scroll hint ── */}
          <div
            ref={hintRef}
            style={{
              position: "absolute", bottom: "5%", left: "5%",
              zIndex: 20, display: "flex", flexDirection: "column",
              alignItems: "center", gap: "8px",
              transition: "opacity .4s",
            }}
          >
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
              fontWeight: 300, letterSpacing: ".32em", textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,.28)" : "rgba(15,40,84,.28)",
              writingMode: "vertical-rl", transform: "rotate(180deg)",
            }}>Scroll Down</span>
            <div className="hi-bounce" style={{
              width: "1px", height: "44px",
              background: `linear-gradient(to bottom,rgba(${accRgb},.55),transparent)`,
            }} />
          </div>

          {/* ── z:30 Terminal card ── */}
          <div
            ref={termRef}
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "48%",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "0 5% 0 3%",
              zIndex: 30,
              opacity: 0, transform: "translateX(60px)", pointerEvents: "none",
              willChange: "transform,opacity",
            }}
          >
            <div style={{
              background: dark ? "rgba(9,9,11,.92)" : "rgba(255,255,255,.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid rgba(${accRgb},.18)`,
              borderRadius: "16px",
              padding: "20px 24px 24px",
              position: "relative",
              overflow: "hidden",
              boxShadow: dark
                ? "0 20px 60px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.05)"
                : "0 10px 40px rgba(15,40,84,.12),inset 0 1px 0 rgba(255,255,255,.8)",
            }}>
              {/* MacOS Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingBottom: "16px", marginBottom: "16px",
                borderBottom: `1px solid rgba(${accRgb},.12)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: ".02em",
                  color: dark ? "rgba(255,255,255,.4)" : "rgba(15,40,84,.45)",
                }}>ansh@dev ~ engineer.js</div>
                <button style={{
                  background: "transparent",
                  border: `1px solid rgba(${accRgb},.2)`,
                  borderRadius: "6px",
                  color: dark ? "rgba(255,255,255,.5)" : `rgba(${accRgb},.7)`,
                  padding: "4px 10px", fontSize: "11px",
                  display: "flex", alignItems: "center", gap: "6px",
                  cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  replay
                </button>
              </div>

              {/* Code lines */}
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(.65rem, 1.1vw, .95rem)", lineHeight: 1.85,
              }}>
                {CODE_LINES.map((tokens, i) => (
                  <div
                    key={i}
                    ref={el => { lineRefs.current[i] = el; }}
                    style={{
                      opacity: 0, transform: "translateY(10px)",
                      willChange: "opacity,transform",
                      display: "flex", alignItems: "flex-start",
                      minHeight: tokens.length === 0 ? "1.6em" : "auto",
                    }}
                  >
                    <span style={{
                      color: dark ? "rgba(255,255,255,.12)" : "rgba(15,40,84,.25)",
                      fontSize: "0.85em", marginRight: "20px",
                      minWidth: "20px", textAlign: "right",
                      userSelect: "none", flexShrink: 0,
                      paddingTop: "0.15em",
                    }}>{tokens.length > 0 ? (i + 1) : ""}</span>
                    <div style={{ flex: 1, whiteSpace: "pre-wrap" }}>
                      {tokens.map((token, j) => {
                        const t = {
                          purple: dark ? "#c792ea" : "#a626a4",
                          cyan: dark ? "#89ddff" : "#0184bc",
                          blue: dark ? "#82aaff" : "#4078f2",
                          orange: dark ? "#ffcb6b" : "#986801",
                          green: dark ? "#c3e88d" : "#50a14f",
                          teal: dark ? "#4fd6be" : "#0b8c8c",
                          plain: dark ? "#e2e8f0" : "#383a42",
                          comment: dark ? "#7b7f8b" : "#a0a1a7",
                        };
                        return <span key={j} style={{ color: t[token.c] || t.plain }}>{token.t}</span>;
                      })}
                      {i === CODE_LINES.length - 1 && (
                        <span className="hi-blink" style={{
                          display: "inline-block", width: "7px", height: "1.2em",
                          background: `rgba(${accRgb},.88)`,
                          marginLeft: "6px", verticalAlign: "middle", marginTop: "-2px",
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scan line */}
              <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "16px" }}>
                <div className="hi-scan" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(to right,transparent,rgba(${accRgb},.06),transparent)`,
                }} />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}