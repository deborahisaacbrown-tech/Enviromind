import { useState } from "react";
import {
  Bell, Sparkles, Thermometer, AlertTriangle, Smile, Lock, ShieldCheck, EyeOff,
  Plus, ArrowRight, ArrowLeft, MapPin, Check, X, Wind, Users,
  Zap, Bot, Shield, Trash2, Eye, Database, Clock, Award, Flame, TrendingUp, BarChart3
} from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

type Screen = "landing" | "privacy" | "home" | "report" | "success" | "notifications";

export default function EnviroMindApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");

  const isUniversityEmail = (e: string) => /\.edu\.(ng|gh)$/i.test(e.trim());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUniversityEmail(email)) {
      setEmailError("Use a valid university email (.edu.ng or .edu.gh)");
      return;
    }
    setEmailError("");
    setScreen("privacy");
  };

  const openNotifications = () => { setPrevScreen(screen); setScreen("notifications"); };
  const openPrivacy = () => { setPrevScreen(screen); setScreen("privacy"); };

  return (
    <div className="relative min-h-screen mesh-bg overflow-x-hidden">
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[oklch(0.3_0.15_220)]/20 blur-[140px]" />

      {screen === "landing" && <Landing email={email} setEmail={setEmail} emailError={emailError} onSubmit={handleLogin} />}
      {screen === "privacy" && <Privacy onContinue={() => setScreen(prevScreen === "home" ? "home" : "home")} onBack={() => setScreen(prevScreen)} fromHome={prevScreen === "home"} />}
      {screen === "home" && <Home onReport={() => setScreen("report")} onBell={openNotifications} />}
      {screen === "report" && <ReportFlow onClose={() => setScreen("home")} onSubmit={() => setScreen("success")} onPrivacy={openPrivacy} />}
      {screen === "success" && <Success onHome={() => setScreen("home")} />}
      {screen === "notifications" && <Notifications onClose={() => setScreen(prevScreen === "notifications" ? "home" : prevScreen)} />}
    </div>
  );
}

/* ---------------- Logo ---------------- */
function Logo({ size = "text-2xl", subtitle = false }: { size?: string; subtitle?: boolean }) {
  return (
    <div>
      <div className={`font-display font-extrabold ${size} tracking-tight inline-flex items-center gap-2`}>
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl glass-strong glow-teal">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6ef0c4] via-[#00e5a0] to-[#f5c87a] opacity-90" />
          <span className="relative font-display font-extrabold text-[#070c12] text-sm">E</span>
        </span>
        <span className="leading-none">
          <span className="logo-gradient">Enviro</span>
          <span className="text-foreground">Mind</span>
        </span>
      </div>
      {subtitle && (
        <p className="text-[10px] text-muted-foreground tracking-[0.2em] mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          CAMPUS INTELLIGENCE · LIVE
        </p>
      )}
    </div>
  );
}

/* ---------------- Landing ---------------- */
function Landing({ email, setEmail, emailError, onSubmit }: any) {
  const scrollToLogin = () => document.getElementById("login-card")?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="relative">
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 -z-0">
          <img src={campusHero} alt="Sustainable university campus at dusk" className="h-full w-full object-cover opacity-40" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c12]/40 via-[#070c12]/65 to-[#070c12]" />
        </div>
        <header className="relative z-10 px-6 md:px-12 py-6 flex items-center justify-between animate-float-up">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground glass rounded-full px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Live · Campus Intelligence
          </div>
        </header>
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12">
          <div className="max-w-3xl animate-float-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-powered campus intelligence
            </div>
            <h1 className="font-display font-extrabold text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter">
              Intelligence<br />for a <span className="logo-gradient">Smarter</span><br />Campus.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl">
              Real-time environmental insight, anonymous reporting, and AI guidance — built for African universities.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={scrollToLogin} className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium glow-teal-strong animate-pulse-glow transition-transform hover:scale-105">
                <span className="flex items-center gap-2">Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </button>
              <a href="#login-card" onClick={scrollToLogin} className="px-8 py-4 rounded-full glass text-foreground font-medium hover:bg-white/10 transition">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      <section id="login-card" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md animate-scale-in">
          <div className="glass-strong rounded-3xl p-8 md:p-10 glow-teal">
            <div className="flex justify-center mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center glow-teal">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="font-display font-bold text-3xl text-center">Sign in to EnviroMind</h2>
            <p className="text-center text-muted-foreground mt-2 text-sm">University email required for verification</p>
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">University Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@university.edu.ng"
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition" />
                {emailError && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-[oklch(0.7_0.22_25)] bg-[oklch(0.65_0.22_25)]/10 border border-[oklch(0.65_0.22_25)]/30 rounded-xl px-3 py-2.5">
                    <X className="h-4 w-4 mt-0.5 shrink-0" /><span>{emailError}</span>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium glow-teal hover:scale-[1.01] transition">Continue</button>
              <p className="text-center text-xs text-muted-foreground pt-2">
                Only <span className="text-primary">.edu.ng / .edu.gh</span> domains accepted · Anonymous & encrypted
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Privacy Promise (6 cards) ---------------- */
function Privacy({ onContinue, onBack, fromHome }: { onContinue: () => void; onBack: () => void; fromHome: boolean }) {
  const items = [
    { icon: Database, t: "What we collect", d: "Only your university email for verification, the location you report, severity ratings, and any optional note you write." },
    { icon: EyeOff, t: "What we NEVER store", d: "We never store your name, student ID, face, or your real GPS location. Reports are unlinkable to you." },
    { icon: Eye, t: "What admins see", d: "Administrators only see aggregated report counts, patterns, and trends — never any individual identity." },
    { icon: Shield, t: "Who we share data with", d: "Nobody. Your data is never sold and never shared with third parties or university authorities." },
    { icon: Clock, t: "Rate limiting explained", d: "To prevent abuse, you can submit 1 report per location every 2 hours. This keeps signal high and noise low." },
    { icon: Trash2, t: "Your right to delete", d: "Email delete@enviromind.app from your university address and we erase everything tied to your account, forever." },
  ];
  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Privacy</div>
        <div className="h-10 w-10" />
      </div>

      <div className="text-center mb-10 animate-float-up">
        <div className="inline-flex h-16 w-16 rounded-2xl bg-primary/15 border border-primary/30 items-center justify-center glow-teal mb-6">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight">
          Our <span className="logo-gradient">Privacy</span> Promise.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          EnviroMind is built so you can speak freely about campus conditions without anyone being able to trace it back to you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <div key={it.t} className="glass-strong rounded-2xl p-5 animate-float-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg">{it.t}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>

      <button onClick={fromHome ? onBack : onContinue}
        className="mt-10 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium glow-teal-strong hover:scale-[1.01] transition flex items-center justify-center gap-2">
        {fromHome ? "Back" : "I Understand — Continue"} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- Home Dashboard ---------------- */
const BUILDINGS = [
  { name: "Lecture Hall A", short: "Hall A", temp: 38.4, trendUp: true, power: false, occ: 94, airflow: false, envo: 28, critical: true },
  { name: "Hostel Block C", short: "Hostel C", temp: 41.1, trendUp: true, power: false, occ: 88, airflow: false, envo: 22, critical: true },
  { name: "Main Library", short: "Library", temp: 28.2, trendUp: false, power: true, occ: 62, airflow: true, envo: 84, critical: false },
  { name: "Engineering Block", short: "Eng Block", temp: 33.5, trendUp: true, power: true, occ: 71, airflow: true, envo: 58, critical: false },
  { name: "Science Faculty", short: "Science", temp: 31.0, trendUp: false, power: true, occ: 48, airflow: true, envo: 76, critical: false },
  { name: "Med Centre", short: "Med Ctr", temp: 27.4, trendUp: false, power: true, occ: 30, airflow: true, envo: 88, critical: false },
  { name: "Sports Complex", short: "Sports", temp: 30.6, trendUp: false, power: true, occ: 55, airflow: true, envo: 72, critical: false },
];

function Home({ onReport, onBell }: { onReport: () => void; onBell: () => void }) {
  const stats = [
    { icon: Thermometer, label: "Avg Campus Temp", value: "33.8°C", color: "text-primary" },
    { icon: AlertTriangle, label: "Critical Zones", value: "2", color: "text-[oklch(0.7_0.22_25)]" },
    { icon: Smile, label: "Mood Score", value: "47/100", color: "text-[oklch(0.85_0.14_80)]" },
  ];

  return (
    <div className="pb-32">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#070c12]/65 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <Logo size="text-xl" subtitle />
          <div className="flex items-center gap-2">
            <button onClick={onBell} className="relative h-11 w-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.22_25)] animate-pulse" />
            </button>
            <button className="h-11 px-4 rounded-full glass text-xs font-medium uppercase tracking-wider hover:bg-white/10 transition">Admin</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-3 gap-3 md:gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass rounded-2xl p-4 md:p-5 animate-float-up" style={{ animationDelay: `${i * 80}ms` }}>
              <s.icon className={`h-5 w-5 mb-3 ${s.color}`} />
              <div className={`font-display font-bold text-2xl md:text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Ask ENVO */}
        <section className="glass-strong rounded-3xl p-6 md:p-7 relative overflow-hidden glow-teal animate-float-up cursor-pointer hover:bg-white/[0.07] transition">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl shrink-0 glow-teal">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-primary font-medium uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI Assistant
              </div>
              <h3 className="font-display font-bold text-2xl mt-1">Ask ENVO</h3>
              <p className="text-sm text-muted-foreground mt-1 truncate">Best study spot? Why is Hostel C hot?</p>
            </div>
            <Bot className="h-6 w-6 text-primary hidden md:block" />
          </div>
        </section>

        {/* Buildings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl">All Buildings</h2>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Tap to explore</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILDINGS.map((b, i) => <BuildingCard key={b.name} {...b} delay={i * 50} />)}
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 left-0 right-0 z-40 px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <button onClick={onReport}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-lg glow-teal-strong animate-pulse-glow hover:scale-[1.01] transition flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" /> SUBMIT REPORT
          </button>
        </div>
      </div>
    </div>
  );
}

function BuildingCard({ name, short, temp, trendUp, power, occ, airflow, envo, delay }: any) {
  const tempTone = temp >= 38 ? "oklch(0.65 0.22 25)" : temp >= 33 ? "oklch(0.85 0.14 80)" : "oklch(0.82 0.18 165)";
  const envoColor = envo < 40 ? "text-[oklch(0.7_0.22_25)]" : envo < 70 ? "text-[oklch(0.85_0.14_80)]" : "text-primary";
  const pct = Math.min(100, (temp / 45) * 100);
  const C = 2 * Math.PI * 28;
  const offset = C - (pct / 100) * C;

  return (
    <div className="glass rounded-2xl p-5 animate-float-up hover:bg-white/[0.06] transition" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-16 w-16 shrink-0">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" stroke="oklch(1 0 0 / 0.08)" strokeWidth="4" fill="none" />
              <circle cx="32" cy="32" r="28" stroke={tempTone} strokeWidth="4" fill="none" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={offset}
                style={{ filter: `drop-shadow(0 0 6px ${tempTone})`, transition: "stroke-dashoffset 0.8s" }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-xs" style={{ color: tempTone }}>{temp}°</span>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold truncate flex items-center gap-1.5">
              {short}
              {trendUp ? <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.7_0.22_25)]" />
                : <TrendingUp className="h-3.5 w-3.5 text-primary rotate-180" />}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <Zap className={`h-3 w-3 ${power ? "text-primary" : "text-[oklch(0.7_0.22_25)]"}`} />
              <Users className="h-3 w-3 text-muted-foreground" />
              <Wind className={`h-3 w-3 ${airflow ? "text-primary" : "text-[oklch(0.7_0.22_25)]"}`} />
              <span className="text-[10px] text-muted-foreground">{occ}%</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-display font-extrabold text-3xl leading-none ${envoColor}`}>{envo}</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">ENVO</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Report Flow (5 steps) ---------------- */
const REPORT_LOCATIONS = [
  { name: "Lecture Hall A", temp: 38.4, occ: 94, critical: true },
  { name: "Hostel Block C", temp: 41.1, occ: 88, critical: true },
  { name: "Main Library", temp: 28.2, occ: 62, critical: false },
  { name: "Engineering Block", temp: 33.5, occ: 71, critical: false },
  { name: "Science Faculty", temp: 31.0, occ: 48, critical: false },
  { name: "Med Centre", temp: 27.4, occ: 30, critical: false },
  { name: "Sports Complex", temp: 30.6, occ: 55, critical: false },
];

const ISSUES = [
  { id: "heat", emoji: "🔥", label: "Extreme Heat" },
  { id: "crowd", emoji: "👥", label: "Overcrowding" },
  { id: "power", emoji: "⚡", label: "Power Issues" },
  { id: "air", emoji: "💨", label: "Poor Airflow" },
  { id: "noise", emoji: "🔊", label: "Noise" },
  { id: "other", emoji: "📋", label: "Other" },
];

const SEVERITY = [
  { n: 1, label: "MILD", color: "text-primary", desc: "Slightly noticeable but not affecting your work." },
  { n: 2, label: "LOW", color: "text-[oklch(0.7_0.25_300)]", desc: "Mildly distracting, manageable for now." },
  { n: 3, label: "MODERATE", color: "text-[oklch(0.85_0.14_80)]", desc: "Affecting comfort and concentration noticeably." },
  { n: 4, label: "HIGH", color: "text-[oklch(0.7_0.22_25)]", desc: "Hard to stay or focus — needs attention soon." },
  { n: 5, label: "CRITICAL", color: "text-[oklch(0.65_0.25_25)]", desc: "Unsafe or unbearable — urgent action required." },
];

const MOODS = [
  { e: "😩", l: "Awful" }, { e: "😕", l: "Low" }, { e: "😐", l: "OK" }, { e: "🙂", l: "Good" }, { e: "😊", l: "Great" },
];

const STEP_LABELS = ["VERIFY", "LOCATION", "ISSUES", "SEVERITY", "MOOD"];

const FEED = [
  { dot: "bg-primary", t: "Library AC restored", s: "8 min ago" },
  { dot: "bg-[oklch(0.85_0.14_80)]", t: "Hostel C generator dispatched", s: "23 min ago" },
  { dot: "bg-[oklch(0.7_0.22_25)]", t: "Hall A flagged CRITICAL", s: "47 min ago" },
];

function ReportFlow({ onClose, onSubmit, onPrivacy }: { onClose: () => void; onSubmit: () => void; onPrivacy: () => void }) {
  const [step, setStep] = useState(1);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [issues, setIssues] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [severity, setSeverity] = useState(3);
  const [mood, setMood] = useState<number | null>(null);
  const [moodScore, setMoodScore] = useState(50);

  const validEmail = /\.edu\.(ng|gh)$/i.test(verifyEmail.trim());

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => (step === 1 ? onClose() : setStep((s) => s - 1));

  const handleVerify = () => {
    if (!validEmail) return;
    setVerifying(true);
    setTimeout(() => { setVerifying(false); next(); }, 1500);
  };

  const toggleIssue = (id: string) =>
    setIssues((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);

  const sev = SEVERITY[severity - 1];

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-6">
        <button onClick={back} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <div className="font-display font-bold text-lg">Submit Report</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
            Step {step} of 5 · {STEP_LABELS[step - 1]}
          </div>
        </div>
        <button onClick={onClose} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1.5 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
            i < step ? "bg-primary"
            : i === step ? "bg-primary glow-teal animate-pulse-glow"
            : "bg-white/10"
          }`} />
        ))}
      </div>

      <div className="animate-scale-in" key={step}>
        {step === 1 && (
          <>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">Verify your identity</h2>
            <p className="text-muted-foreground mt-3">
              Enter your university email. This is the only personal information EnviroMind stores — it is never shown to administrators.
            </p>
            <button onClick={onPrivacy} className="mt-2 text-sm text-[oklch(0.75_0.16_240)] underline underline-offset-4 hover:text-primary transition">
              Why do we need this?
            </button>

            <input type="email" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)}
              placeholder="yourname@university.edu.gh"
              className="mt-6 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition" />

            <div className="mt-5 glass rounded-2xl p-5 space-y-3">
              {[
                "Reports are 100% anonymous to administrators",
                "Your email is never linked to your report content",
                "Rate limited: 1 report per location per 2 hours",
                "You can delete all your data at any time",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>

            <button onClick={handleVerify} disabled={!validEmail || verifying}
              className={`mt-8 w-full py-4 rounded-2xl font-medium transition flex items-center justify-center gap-2 ${
                validEmail && !verifying
                  ? "bg-primary text-primary-foreground glow-teal hover:scale-[1.01]"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              }`}>
              {verifying ? <>VERIFYING<span className="animate-pulse">...</span></> : <>VERIFY AND CONTINUE <ArrowRight className="h-4 w-4" /></>}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">Where are you now?</h2>
            <p className="text-muted-foreground mt-3">Pick your current location.</p>
            <div className="mt-8 space-y-2">
              {REPORT_LOCATIONS.map((l) => (
                <button key={l.name}
                  onClick={() => { setLocation(l.name); next(); }}
                  className={`w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 hover:bg-white/10 transition text-left ${location === l.name ? "ring-2 ring-primary" : ""}`}>
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.temp}°C · {l.occ}% occupied</div>
                  </div>
                  {l.critical && (
                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full bg-[oklch(0.65_0.22_25)]/20 text-[oklch(0.7_0.22_25)] border border-[oklch(0.65_0.22_25)]/40">
                      CRITICAL
                    </span>
                  )}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
            <LiveFeed />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">What are you experiencing?</h2>
            <p className="text-muted-foreground mt-3">Select all that apply.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {ISSUES.map((it) => {
                const sel = issues.includes(it.id);
                return (
                  <button key={it.id} onClick={() => toggleIssue(it.id)}
                    className={`glass rounded-2xl p-5 text-left transition ${
                      sel ? "bg-primary/15 ring-2 ring-primary glow-teal" : "hover:bg-white/10"
                    }`}>
                    <div className="text-2xl mb-2">{it.emoji}</div>
                    <div className="font-display font-bold">{it.label}</div>
                    {sel && <div className="text-[10px] text-primary uppercase tracking-wider mt-1">SELECTED ✓</div>}
                  </button>
                );
              })}
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
              placeholder="Add an optional note…"
              className="mt-6 w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition resize-none" />
            <button onClick={next} disabled={issues.length === 0}
              className={`mt-6 w-full py-4 rounded-2xl font-medium transition ${
                issues.length > 0
                  ? "bg-primary text-primary-foreground glow-teal hover:scale-[1.01]"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              }`}>
              Continue
            </button>
            <LiveFeed />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">How severe is it?</h2>
            <p className="text-muted-foreground mt-3">Slide to match how bad it feels.</p>
            <div className="mt-8 glass-strong rounded-3xl p-8 text-center">
              <div className={`font-display font-extrabold text-9xl leading-none ${sev.color}`}>{sev.n}</div>
              <div className={`mt-2 text-xs uppercase tracking-[0.3em] ${sev.color}`}>{sev.label}</div>
              <input type="range" min={1} max={5} value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="mt-8 w-full accent-[oklch(0.82_0.18_165)]" />
              <p className="mt-6 text-sm text-muted-foreground">{sev.desc}</p>
            </div>
            <button onClick={next} className="mt-6 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium glow-teal hover:scale-[1.01] transition">
              Continue
            </button>
            <LiveFeed />
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">How are you feeling?</h2>
            <p className="text-muted-foreground mt-3">
              This helps ENVO connect physical conditions to student wellbeing. Anonymous, never shared individually.
            </p>

            <div className="mt-8 grid grid-cols-5 gap-2">
              {MOODS.map((m, i) => (
                <button key={m.l} onClick={() => { setMood(i); setMoodScore(i * 25); }}
                  className={`glass rounded-2xl p-3 text-center transition ${
                    mood === i ? "ring-2 ring-primary glow-teal scale-110" : "hover:bg-white/10"
                  }`}>
                  <div className="text-3xl">{m.e}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{m.l}</div>
                </button>
              ))}
            </div>

            {/* Keep current mood-score slider version */}
            <div className="mt-6 glass-strong rounded-3xl p-6 text-center">
              <div className="text-5xl mb-1">
                {moodScore < 25 ? "😩" : moodScore < 50 ? "😕" : moodScore < 75 ? "🙂" : "😊"}
              </div>
              <div className="font-display font-bold text-3xl text-primary text-glow">{moodScore}</div>
              <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Mood Score</div>
              <input type="range" min={0} max={100} value={moodScore}
                onChange={(e) => setMoodScore(Number(e.target.value))}
                className="mt-6 w-full accent-[oklch(0.82_0.18_165)]" />
            </div>

            <div className="mt-5 glass rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                ENVO uses mood data to detect chains between environment and academic performance — never linked to you.
              </p>
            </div>

            <button onClick={onSubmit} disabled={mood === null}
              className={`mt-6 w-full py-4 rounded-2xl font-medium transition flex items-center justify-center gap-2 ${
                mood !== null
                  ? "bg-primary text-primary-foreground glow-teal-strong hover:scale-[1.01]"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              }`}>
              <Check className="h-5 w-5" /> SUBMIT REPORT
            </button>
            <LiveFeed />
          </>
        )}
      </div>
    </div>
  );
}

function LiveFeed() {
  return (
    <div className="mt-10">
      <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live Campus Feed
      </div>
      <div className="space-y-2">
        {FEED.map((f, i) => (
          <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-3 text-sm">
            <span className={`h-2 w-2 rounded-full ${f.dot}`} />
            <span className="flex-1 truncate">{f.t}</span>
            <span className="text-[10px] text-muted-foreground">{f.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Success ---------------- */
function Success({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen px-6 py-12 max-w-xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="text-7xl mb-4 animate-scale-in">✅</div>
      <h2 className="font-display font-extrabold text-5xl text-primary text-glow">Report Submitted</h2>
      <p className="text-muted-foreground mt-4 max-w-md">
        ENVO has logged your report. You joined <span className="text-foreground font-medium">34 other verified students</span> who reported this today.
      </p>

      <div className="mt-8 w-full glass-strong rounded-2xl p-5 border border-primary/30 bg-primary/5 text-left">
        <div className="flex items-center gap-2 text-primary font-display font-bold">
          <Bell className="h-4 w-4" /> FACILITIES ALERTED AUTOMATICALLY
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Response expected within 48 hours. You will be notified when action is taken.
        </p>
      </div>

      <div className="mt-4 w-full glass-strong rounded-2xl p-5 text-left">
        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">Your Credibility Score</div>
        <div className="font-display font-bold text-2xl">
          <span className="text-primary">+3 points added</span>
          <span className="text-muted-foreground"> · Score: </span>
          <span className="text-[oklch(0.85_0.14_80)]">91/100</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Higher scores give your reports more weight in ENVO analysis.</p>
      </div>

      <button onClick={onHome} className="mt-10 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium glow-teal-strong hover:scale-[1.01] transition">
        BACK TO CAMPUS
      </button>
    </div>
  );
}

/* ---------------- Notifications / Impact Panel ---------------- */
function Notifications({ onClose }: { onClose: () => void }) {
  const cards = [
    {
      unread: true, dot: "bg-primary", emoji: "✅", title: "Hall A Heat — Resolved",
      body: "Emergency fans deployed 8am today. Your 3 reports contributed to this fix. 47 students benefited.",
      credits: "+9 Credits", time: "2 hours ago",
    },
    {
      unread: true, dot: "bg-[oklch(0.85_0.14_80)]", emoji: "⚡", title: "Hostel C Generator — Approved",
      body: "University approved generator upgrade. Your 5 reports were cited in the facilities decision.",
      credits: "+15 Credits", time: "1 day ago",
    },
    {
      unread: false, dot: "bg-[oklch(0.65_0.18_240)]", emoji: "📊", title: "ENVO Weekly Forecast Ready",
      body: "Hall A critical Thursday 10am–3pm. Library and Engineering Block recommended all week.",
      credits: "0 Credits", time: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-display font-extrabold text-3xl">Your Impact</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">How your reports changed things</div>
        </div>
        <button onClick={onClose} className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Hero */}
      <div className="glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden glow-teal animate-scale-in">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[oklch(0.85_0.14_80)]/20 blur-3xl" />
        <div className="relative">
          <div className="text-[10px] text-primary font-medium uppercase tracking-[0.25em]">Your Campus Impact</div>
          <div className="font-display font-extrabold text-6xl md:text-7xl text-primary text-glow mt-2 leading-none">33<span className="text-2xl text-muted-foreground ml-2 font-medium">Credits</span></div>
          <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1.5 flex-wrap">
            <Award className="h-3.5 w-3.5 text-primary" /> Top 12% of campus reporters
            <span>·</span> 91/100 credibility
            <span>·</span> 5-day streak <Flame className="h-3.5 w-3.5 text-[oklch(0.7_0.22_25)]" />
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Metric v="11" l="Reports" />
            <Metric v="2" l="Issues Fixed" />
            <Metric v="847" l="Students Helped" />
          </div>
        </div>
      </div>

      {/* Notification cards */}
      <div className="mt-8 space-y-3">
        {cards.map((c, i) => (
          <div key={i} className="glass rounded-2xl p-5 relative animate-float-up" style={{ animationDelay: `${i * 80}ms` }}>
            {c.unread && <span className={`absolute top-4 right-4 h-2.5 w-2.5 rounded-full ${c.dot} animate-pulse`} />}
            <div className="flex items-start gap-4">
              <div className="text-2xl shrink-0">{c.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-base md:text-lg pr-6">{c.title}</div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.body}</p>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <span className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-[oklch(0.85_0.14_80)]/15 text-[oklch(0.85_0.14_80)] border border-[oklch(0.85_0.14_80)]/30">
                    {c.credits}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{c.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone */}
      <div className="mt-6 rounded-2xl p-5 border border-[oklch(0.85_0.14_80)]/30 bg-[oklch(0.85_0.14_80)]/10 flex items-start gap-3">
        <BarChart3 className="h-5 w-5 text-[oklch(0.85_0.14_80)] mt-0.5 shrink-0" />
        <p className="text-sm">
          <span className="text-[oklch(0.85_0.14_80)] font-bold">Next milestone:</span>{" "}
          <span className="text-muted-foreground">Submit 4 more verified reports to reach Top 10% of campus reporters.</span>
        </p>
      </div>
    </div>
  );
}

function Metric({ v, l }: { v: string; l: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <div className="font-display font-bold text-2xl text-primary">{v}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{l}</div>
    </div>
  );
}
