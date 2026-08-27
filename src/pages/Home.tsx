import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Palette constants ───────────────────────────────────────────────────────
const GREEN = "#2EE887";
const CORAL = "#FF5533";
const YELLOW = "#FFD166";
const BLACK = "#1A1A1A";
const OFFWHITE = "#F7F2E8";

// ─── Decorative accents ──────────────────────────────────────────────────────
function PlusIcon({ color = BLACK, size = 16, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style}>
      <rect x="6" y="0" width="4" height="16" fill={color} />
      <rect x="0" y="6" width="16" height="4" fill={color} />
    </svg>
  );
}

function DotIcon({ color = BLACK, size = 8, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" style={style}>
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

// ─── Hero illustration removed as per user request ─────────────────────────

// ─── Step icons ──────────────────────────────────────────────────────────────
function StepIconSearch() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
      <circle cx="40" cy="40" r="38" fill={GREEN} stroke={BLACK} strokeWidth="3" />
      <rect x="22" y="28" width="36" height="8" rx="4" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <rect x="22" y="41" width="24" height="6" rx="3" fill={OFFWHITE} stroke={BLACK} strokeWidth="2" />
      <circle cx="51" cy="51" r="9" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <line x1="57" y1="57" x2="64" y2="64" stroke={BLACK} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function StepIconMatch() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
      <circle cx="40" cy="40" r="38" fill={YELLOW} stroke={BLACK} strokeWidth="3" />
      <rect x="18" y="30" width="20" height="26" rx="5" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <rect x="42" y="30" width="20" height="26" rx="5" fill={CORAL} stroke={BLACK} strokeWidth="2.5" />
      <line x1="38" y1="43" x2="44" y2="43" stroke={BLACK} strokeWidth="3" strokeLinecap="round" />
      <path d="M41 39 L45 43 L41 47" stroke={BLACK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function StepIconBorrow() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
      <circle cx="40" cy="40" r="38" fill={CORAL} stroke={BLACK} strokeWidth="3" />
      <ellipse cx="26" cy="46" rx="12" ry="9" fill="#C8864E" stroke={BLACK} strokeWidth="2.5" />
      <ellipse cx="54" cy="46" rx="12" ry="9" fill="#8B5E3C" stroke={BLACK} strokeWidth="2.5" />
      <rect x="30" y="30" width="20" height="14" rx="4" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <circle cx="40" cy="37" r="4" fill={BLACK} />
    </svg>
  );
}
function StepIconRate() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
      <circle cx="40" cy="40" r="38" fill="#4B6EFF" stroke={BLACK} strokeWidth="3" />
      {[28, 40, 52].map((x, i) => (
        <polygon key={i} points={`${x},28 ${x+5},38 ${x+11},39 ${x+6},45 ${x+8},55 ${x},50 ${x-8},55 ${x-6},45 ${x-11},39 ${x-5},38`} fill={i < 2 ? YELLOW : OFFWHITE} stroke={BLACK} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ─── Trust icons ─────────────────────────────────────────────────────────────
function TrustBadge() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72">
      <rect x="4" y="4" width="64" height="64" rx="20" fill={GREEN} stroke={BLACK} strokeWidth="3" />
      <path d="M36 14 L46 20 V34 C46 44 36 50 36 50 C36 50 26 44 26 34 V20 Z" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <path d="M30 34 L35 39 L44 28" stroke={BLACK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrustStar() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72">
      <rect x="4" y="4" width="64" height="64" rx="20" fill={YELLOW} stroke={BLACK} strokeWidth="3" />
      <polygon points="36,16 41,28 55,29 44,39 48,52 36,44 24,52 28,39 17,29 31,28" fill={OFFWHITE} stroke={BLACK} strokeWidth="2" />
      <circle cx="36" cy="34" r="5" fill={BLACK} />
    </svg>
  );
}
function TrustLock() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72">
      <rect x="4" y="4" width="64" height="64" rx="20" fill={CORAL} stroke={BLACK} strokeWidth="3" />
      <rect x="22" y="36" width="28" height="22" rx="6" fill={OFFWHITE} stroke={BLACK} strokeWidth="2.5" />
      <path d="M27 36 V28 C27 21 45 21 45 28 V36" stroke={BLACK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="36" cy="47" r="4" fill={BLACK} />
      <line x1="36" y1="51" x2="36" y2="55" stroke={BLACK} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Animated AI demo strip ──────────────────────────────────────────────────
const DEMO_TEXT = "I need to make a reel for my club event tomorrow";
const CHIPS = [
  { label: "📷 Camera", bg: GREEN },
  { label: "🎙 Mic", bg: CORAL },
  { label: "🔦 Lighting", bg: YELLOW },
  { label: "🎬 Tripod", bg: "#4B6EFF" },
];

function DemoStrip({ onFindClick }: { onFindClick: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "resolving" | "chips">("typing");
  const [visibleChips, setVisibleChips] = useState<number[]>([]);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runCycle = () => {
    let i = 0;
    setDisplayed(""); setPhase("typing"); setVisibleChips([]);
    const typeNext = () => {
      i++;
      setDisplayed(DEMO_TEXT.slice(0, i));
      if (i < DEMO_TEXT.length) {
        rafRef.current = setTimeout(typeNext, 38 + Math.random() * 30);
      } else {
        rafRef.current = setTimeout(() => {
          setPhase("resolving");
          rafRef.current = setTimeout(() => {
            setPhase("chips");
            CHIPS.forEach((_, idx) => {
              rafRef.current = setTimeout(() => setVisibleChips(prev => [...prev, idx]), idx * 200);
            });
          }, 900);
        }, 600);
      }
    };
    rafRef.current = setTimeout(typeNext, 500);
  };

  useEffect(() => { runCycle(); return () => { if (rafRef.current) clearTimeout(rafRef.current); }; }, []);

  useEffect(() => {
    if (phase === "chips" && visibleChips.length === CHIPS.length) {
      const loop = setTimeout(runCycle, 3500);
      return () => clearTimeout(loop);
    }
  }, [phase, visibleChips]);

  return (
    <div className="rounded-3xl p-8 md:p-12" style={{ background: BLACK, border: `4px solid ${BLACK}` }}>
      <div className="rounded-2xl px-6 py-5 mb-6 flex items-center gap-3 min-h-[72px]" style={{ background: OFFWHITE, border: `3px solid ${BLACK}` }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="9" cy="9" r="7" stroke={BLACK} strokeWidth="2.5" />
          <line x1="14" y1="14" x2="20" y2="20" stroke={BLACK} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="text-lg flex-1" style={{ color: BLACK, fontFamily: 'inherit' }}>
          {displayed}
          {phase === "typing" && <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse" style={{ background: BLACK }} />}
          {phase === "resolving" && <span style={{ color: CORAL }} className="ml-2 text-sm">thinking...</span>}
        </span>
        <button
          onClick={onFindClick}
          className="px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ background: GREEN, color: BLACK, border: `2px solid ${BLACK}` }}
        >
          Find
        </button>
      </div>
      {phase !== "typing" && (
        <div className="flex justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4 L14 22" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
            <path d="M7 16 L14 24 L21 16" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {phase === "chips" && (
        <div className="flex flex-wrap gap-3 justify-center">
          {CHIPS.map((chip, idx) => visibleChips.includes(idx) ? (
            <div key={chip.label} className="px-5 py-3 rounded-2xl font-bold text-lg transition-all" style={{ background: chip.bg, color: chip.bg === YELLOW || chip.bg === GREEN ? BLACK : OFFWHITE, border: `2.5px solid ${BLACK}` }}>
              {chip.label}
            </div>
          ) : null)}
        </div>
      )}
      {phase === "resolving" && (
        <div className="flex gap-3 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-3 h-3 rounded-full animate-bounce" style={{ background: GREEN, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: OFFWHITE, color: BLACK, overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .float-anim { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative px-6 md:px-12 pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <PlusIcon color={CORAL} size={20} style={{ position: "absolute", top: 40, left: 30, opacity: 0.7 }} />
        <PlusIcon color={GREEN} size={14} style={{ position: "absolute", top: 100, right: 80, opacity: 0.6 }} />
        <DotIcon color={YELLOW} size={12} style={{ position: "absolute", top: 60, right: "35%", opacity: 0.8 }} />
        <DotIcon color={CORAL} size={8} style={{ position: "absolute", bottom: 80, left: "20%", opacity: 0.6 }} />
        <PlusIcon color={BLACK} size={12} style={{ position: "absolute", bottom: 120, right: 40, opacity: 0.3 }} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-semibold text-sm" style={{ background: YELLOW, color: BLACK, border: `2px solid ${BLACK}` }}>
              <span>✦</span> Peer-to-peer campus sharing
            </div>
            <h1 className="font-black leading-none mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: BLACK, letterSpacing: "-0.03em" }}>
              Why buy what someone nearby{" "}
              <span className="relative inline-block" style={{ color: GREEN, WebkitTextStroke: `3px ${BLACK}`, textShadow: `4px 4px 0 ${BLACK}` }}>
                already has?
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-md leading-relaxed" style={{ color: "#444" }}>
              Discover, lend, borrow, donate, and request resources across your campus community — in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/discover')}
                className="px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{ background: GREEN, color: BLACK, border: `3px solid ${BLACK}`, boxShadow: `5px 5px 0 ${BLACK}` }}
              >
                Find Something
              </button>
              <button
                onClick={() => navigate('/dashboard?tab=listings')}
                className="px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{ background: OFFWHITE, color: BLACK, border: `3px solid ${BLACK}`, boxShadow: `5px 5px 0 ${BLACK}` }}
              >
                List Your Stuff →
              </button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[GREEN, CORAL, "#4B6EFF", YELLOW].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 font-bold text-xs flex items-center justify-center" style={{ background: c, borderColor: BLACK, color: BLACK }}>
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: "#666" }}>
                <strong style={{ color: BLACK }}>2,400+</strong> students already sharing
              </p>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-md rounded-[2rem] overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] float-anim">
              <img 
                src="/Loginpage.jpg" 
                alt="Campus Circular Sharing" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div style={{ background: BLACK, borderTop: `3px solid ${BLACK}`, borderBottom: `3px solid ${BLACK}`, overflow: "hidden", padding: "14px 0" }}>
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 18s linear infinite" }}>
          {["📷 Cameras", "💻 Laptops", "📚 Textbooks", "🎙 Microphones", "🧮 Calculators", "🎸 Instruments", "⚽ Sports Gear", "🔦 Lighting", "🎬 Tripods", "🛠 Tools", "🎒 Backpacks", "🎪 Event Gear",
            "📷 Cameras", "💻 Laptops", "📚 Textbooks", "🎙 Microphones", "🧮 Calculators", "🎸 Instruments", "⚽ Sports Gear", "🔦 Lighting", "🎬 Tripods", "🛠 Tools", "🎒 Backpacks", "🎪 Event Gear"].map((item, i) => (
            <span key={i} className="font-bold text-base" style={{ color: GREEN }}>
              {item} <span style={{ color: CORAL }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative">
        <PlusIcon color={GREEN} size={22} style={{ position: "absolute", top: 60, right: 60, opacity: 0.5 }} />
        <DotIcon color={CORAL} size={14} style={{ position: "absolute", bottom: 80, left: 40, opacity: 0.5 }} />
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ background: CORAL, color: OFFWHITE, border: `2px solid ${BLACK}` }}>The flow</div>
            <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Borrowing in four easy steps.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 z-0"
              style={{ background: `repeating-linear-gradient(to right, ${BLACK} 0, ${BLACK} 8px, transparent 8px, transparent 18px)` }} />
            {[
              { icon: <StepIconSearch />, num: "01", title: "Describe what you need", body: "Type it in plain language — no browsing required. Just say what you're looking for." },
              { icon: <StepIconMatch />, num: "02", title: "Get matched resources", body: "AI surfaces the best-fit items nearby sorted by distance, trust score and condition." },
              { icon: <StepIconBorrow />, num: "03", title: "Borrow & return", body: "Confirm the exchange, pick up from your peer, and return it by the agreed deadline." },
              { icon: <StepIconRate />, num: "04", title: "Rate & build trust", body: "Leave a review, build your trust score, and unlock more borrowing power over time." },
            ].map(step => (
              <div key={step.num} className="relative z-10 flex flex-col items-start md:items-center md:text-center gap-4">
                <div className="relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs" style={{ background: OFFWHITE, border: `2px solid ${BLACK}`, color: BLACK }}>
                    {step.num}
                  </div>
                </div>
                <h3 className="font-black text-lg leading-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI DEMO STRIP ── */}
      <section className="px-6 md:px-12 py-24 md:py-32" style={{ background: BLACK }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ background: GREEN, color: BLACK, border: `2px solid ${GREEN}` }}>✦ Signature feature</div>
            <h2 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: OFFWHITE, letterSpacing: "-0.03em" }}>
              Just say what you need.
            </h2>
            <p className="text-base md:text-lg" style={{ color: "#999" }}>
              No filters. No categories. Just describe your situation and we'll figure it out.
            </p>
          </div>
          <DemoStrip onFindClick={() => navigate('/ai-discovery?q=' + encodeURIComponent(DEMO_TEXT))} />
          <p className="text-center mt-6 text-sm" style={{ color: "#666" }}>
            The platform identifies every item you'll actually need — not just the one you searched for.
          </p>
        </div>
      </section>

      {/* ── TRUST & SAFETY ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative" style={{ background: OFFWHITE }}>
        <PlusIcon color={BLACK} size={18} style={{ position: "absolute", top: 50, left: 50, opacity: 0.2 }} />
        <PlusIcon color={CORAL} size={14} style={{ position: "absolute", bottom: 60, right: 60, opacity: 0.4 }} />
        <DotIcon color={YELLOW} size={16} style={{ position: "absolute", top: 80, right: "30%", opacity: 0.5 }} />
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ background: YELLOW, color: BLACK, border: `2px solid ${BLACK}` }}>Trust & Safety</div>
            <h2 className="font-black leading-tight max-w-lg" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Built on real campus trust.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrustBadge />, title: "Verified Profiles", body: "Every member is verified through their campus email. Real students, real accountability. No anonymous strangers.", accent: GREEN },
              { icon: <TrustStar />, title: "Trust Scores", body: "Ratings from every exchange build your trust score. The better your record, the more you can borrow — and lend.", accent: YELLOW },
              { icon: <TrustLock />, title: "Deposits & Protection", body: "Optional refundable security deposits protect lenders. Damage reports are handled fairly with evidence from both sides.", accent: CORAL },
            ].map(card => (
              <div key={card.title} className="rounded-3xl p-8 flex flex-col gap-5 transition-transform hover:-translate-y-1" style={{ background: "#fff", border: `3px solid ${BLACK}`, boxShadow: `6px 6px 0 ${BLACK}` }}>
                {card.icon}
                <h3 className="font-black text-xl">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{card.body}</p>
                <div className="mt-auto">
                  <button onClick={() => navigate('/discover')} className="inline-block px-3 py-1 rounded-full font-semibold text-xs" style={{ background: card.accent, color: BLACK, border: `1.5px solid ${BLACK}` }}>
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 relative overflow-hidden" style={{ background: GREEN, borderTop: `4px solid ${BLACK}`, borderBottom: `4px solid ${BLACK}` }}>
        <PlusIcon color={BLACK} size={24} style={{ position: "absolute", top: 30, left: 20, opacity: 0.25 }} />
        <PlusIcon color={BLACK} size={16} style={{ position: "absolute", bottom: 30, right: 40, opacity: 0.2 }} />
        <DotIcon color={CORAL} size={20} style={{ position: "absolute", top: "50%", left: 80, opacity: 0.4 }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
            {[
              { num: "2,400+", label: "Active members", sub: "across 6 campuses" },
              { num: "8,900+", label: "Resources shared", sub: "since launch day" },
              { num: "₹42L+", label: "Money saved", sub: "by not buying new" },
            ].map((stat, i) => (
              <div key={i} className="relative">
                {i > 0 && <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5" style={{ background: BLACK, opacity: 0.25 }} />}
                <div className="font-black leading-none mb-2" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: BLACK, letterSpacing: "-0.04em" }}>{stat.num}</div>
                <div className="font-black text-xl mb-1" style={{ color: BLACK }}>{stat.label}</div>
                <div className="text-sm" style={{ color: "#1a5a35" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 md:px-12 py-24 md:py-32" style={{ background: OFFWHITE }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full font-semibold text-sm" style={{ background: "#4B6EFF", color: OFFWHITE, border: `2px solid ${BLACK}` }}>Community voices</div>
            <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
              Real students, real saves.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Borrowed a DSLR and tripod for my film project in 20 minutes. Saved ₹8,000 vs renting from a shop.", name: "Arjun M.", dept: "B.Des, 3rd year", bg: GREEN },
              { quote: "Listed my old calc before exams — got 4 borrowing requests in the first hour. This thing works.", name: "Priya K.", dept: "B.Tech ECE, 2nd year", bg: CORAL },
              { quote: "The AI part is lowkey insane. I just described my situation and it found stuff I hadn't even thought to search for.", name: "Rohan S.", dept: "MBA, 1st year", bg: YELLOW },
            ].map(t => (
              <div key={t.name} className="rounded-3xl p-7 flex flex-col gap-4" style={{ background: t.bg, border: `3px solid ${BLACK}`, boxShadow: `5px 5px 0 ${BLACK}` }}>
                <div className="text-2xl" style={{ color: BLACK, opacity: 0.3 }}>"</div>
                <p className="text-base leading-relaxed font-medium" style={{ color: BLACK }}>{t.quote}</p>
                <div className="mt-auto pt-4 border-t-2 flex items-center gap-3" style={{ borderColor: BLACK }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base" style={{ background: BLACK, color: t.bg }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-sm">{t.name}</div>
                    <div className="text-xs" style={{ color: "#444" }}>{t.dept}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="px-6 md:px-12 py-24 md:py-36 text-center relative overflow-hidden" style={{ background: BLACK }}>
        <PlusIcon color={GREEN} size={28} style={{ position: "absolute", top: 40, left: 40, opacity: 0.4 }} />
        <PlusIcon color={CORAL} size={18} style={{ position: "absolute", bottom: 50, right: 60, opacity: 0.35 }} />
        <DotIcon color={YELLOW} size={18} style={{ position: "absolute", top: "30%", right: 100, opacity: 0.3 }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-semibold text-sm mb-5" style={{ color: GREEN }}>✦ your campus community is waiting</p>
          <h2 className="font-black leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)", color: OFFWHITE, letterSpacing: "-0.04em" }}>
            Stop buying.<br />
            <span style={{ color: GREEN }}>Start sharing.</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed" style={{ color: "#888" }}>
            Join Campus Circular and tap into everything your campus already has.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 hover:-translate-y-1 active:scale-95"
              style={{ background: GREEN, color: BLACK, border: `3px solid ${GREEN}`, boxShadow: `6px 6px 0 #2EE88755` }}
            >
              Sign up — it's free
            </button>
            <button
              onClick={() => navigate('/discover')}
              className="px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95"
              style={{ background: "transparent", color: OFFWHITE, border: `3px solid #555` }}
            >
              Browse resources →
            </button>
          </div>
          <p className="mt-8 text-xs" style={{ color: "#555" }}>
            Free forever for students · No credit card needed · Verified campus community
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
