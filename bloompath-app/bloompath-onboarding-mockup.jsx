import { useState } from "react";

// ── Color System ─────────────────────────────────────────────────────────────
const C = {
  coral:       '#FF8C76',
  coralLight:  '#FFF0ED',
  teal:        '#005F73',
  tealLight:   '#E6F2F5',
  tealDark:    '#003E4D',
  green:       '#94D2BD',
  greenLight:  '#EAF6F2',
  greenDark:   '#2D7A3E',
  yellow:      '#E9D8A6',
  yellowLight: '#FDF9EE',
  cream:       '#FDFBF7',
  slate:       '#2B2D42',
  gray:        '#8A8D9F',
  grayLight:   '#F3F3F6',
  white:       '#FFFFFF',
  rose:        '#D66F6F',
  purple:      '#6B4FA0',
  purpleDark:  '#3D2B6A',
  purpleLight: '#F0ECFA',
  bg:          '#0F1923',
};

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL = 13;

const PHASES = [
  { label: "Your Family",   screens: [0,1,2,3], emoji: "👨‍👩‍👧" },
  { label: "Health Basics", screens: [4],        emoji: "🏥"    },
  { label: "Your Goals",    screens: [5],        emoji: "🎯"    },
  { label: "Care Team",     screens: [6],        emoji: "👩‍⚕️" },
  { label: "Child Setup",   screens: [7,8],      emoji: "🧒"    },
  { label: "Your Journey",  screens: [9],        emoji: "🗺️"   },
  { label: "Baseline",      screens: [10,11],    emoji: "📸"    },
  { label: "All Set!",      screens: [12],       emoji: "🎉"    },
];

const GOALS = [
  { id: "energy",     label: "More energy",             emoji: "⚡" },
  { id: "sleep",      label: "Better sleep",            emoji: "😴" },
  { id: "confidence", label: "Feel confident",          emoji: "💪" },
  { id: "variety",    label: "Eat more variety",        emoji: "🥗" },
  { id: "active",     label: "Be more active",          emoji: "🏃" },
  { id: "health",     label: "Reduce health risks",     emoji: "❤️" },
  { id: "family",     label: "Healthy habits together", emoji: "👨‍👩‍👧" },
  { id: "stress",     label: "Manage stress",           emoji: "🧘" },
];

const ACTIVITIES = [
  { id: "biking",   emoji: "🚴", label: "Biking"    },
  { id: "swimming", emoji: "🏊", label: "Swimming"  },
  { id: "dancing",  emoji: "💃", label: "Dancing"   },
  { id: "sports",   emoji: "⚽", label: "Sports"    },
  { id: "hiking",   emoji: "🥾", label: "Hiking"    },
  { id: "cooking",  emoji: "👨‍🍳", label: "Cooking" },
  { id: "music",    emoji: "🎵", label: "Music"     },
  { id: "art",      emoji: "🎨", label: "Art"       },
  { id: "walking",  emoji: "🚶", label: "Walking"   },
  { id: "yoga",     emoji: "🧘", label: "Yoga"      },
];

const FAV_FOODS = [
  { id: "pizza",   emoji: "🍕", label: "Pizza"   },
  { id: "tacos",   emoji: "🌮", label: "Tacos"   },
  { id: "pasta",   emoji: "🍝", label: "Pasta"   },
  { id: "fruit",   emoji: "🍓", label: "Fruit"   },
  { id: "veggies", emoji: "🥦", label: "Veggies" },
  { id: "chicken", emoji: "🍗", label: "Chicken" },
  { id: "eggs",    emoji: "🍳", label: "Eggs"    },
  { id: "rice",    emoji: "🍚", label: "Rice"    },
  { id: "sushi",   emoji: "🍱", label: "Sushi"   },
  { id: "soup",    emoji: "🍲", label: "Soups"   },
];

function getPhase(step) {
  return PHASES.find(p => p.screens.includes(step)) || PHASES[0];
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function StatusBar({ dark }) {
  const fg = dark ? "rgba(255,255,255,0.85)" : C.slate;
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"14px 26px 6px", position:"relative", flexShrink:0 }}>
      <span style={{ fontSize:15, fontWeight:700, color:fg }}>9:41</span>
      <div style={{ width:120, height:32,
        background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.85)",
        borderRadius:20, position:"absolute", left:"50%", transform:"translateX(-50%)" }} />
      <div style={{ display:"flex", gap:4, alignItems:"center" }}>
        {[9,7,5,3].map((h,i) => (
          <div key={i} style={{ width:3, height:h, background:fg, borderRadius:1.5, opacity: i<3?1:0.4 }} />
        ))}
        <div style={{ width:3 }} />
        <div style={{ width:22, height:11, border:`1.5px solid ${fg}`, borderRadius:3,
          position:"relative", display:"flex", alignItems:"center", padding:"1px 1.5px" }}>
          <div style={{ width:"75%", height:"100%", background:fg, borderRadius:1.5 }} />
          <div style={{ position:"absolute", right:-4, top:"50%", transform:"translateY(-50%)",
            width:3, height:6, background:fg, borderRadius:"0 1px 1px 0", opacity:0.5 }} />
        </div>
      </div>
    </div>
  );
}

function PhaseBar({ step }) {
  const phase = getPhase(step);
  const pct = (step / (TOTAL - 1)) * 100;
  return (
    <div style={{ padding:"6px 22px 14px", background:C.white, flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:14 }}>{phase.emoji}</span>
          <span style={{ fontSize:13, fontWeight:700, color:C.teal }}>{phase.label}</span>
        </div>
        <span style={{ fontSize:12, color:C.gray }}>Step {step+1} of {TOTAL}</span>
      </div>
      <div style={{ height:6, background:C.grayLight, borderRadius:3, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:C.coral,
          borderRadius:3, transition:"width 0.4s ease" }} />
      </div>
    </div>
  );
}

function FormField({ label, icon, value, placeholder, type, onChange }) {
  return (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:"block", fontSize:14, fontWeight:700, color:C.slate, marginBottom:7 }}>
        {icon} {label}
      </label>
      <input type={type||"text"} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ width:"100%", padding:"13px 16px",
          border:`1.5px solid ${value ? C.teal : "#E0E0E6"}`,
          borderRadius:13, fontSize:15, color:C.slate, background:C.white,
          outline:"none", boxSizing:"border-box", fontFamily:"inherit",
          transition:"border-color 0.2s" }} />
    </div>
  );
}

function BottomCTA({ label, onNext, onBack, disabled }) {
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0,
      padding:"12px 22px 28px",
      background:"linear-gradient(to top, rgba(253,251,247,1) 65%, transparent)" }}>
      <div style={{ display:"flex", gap:10 }}>
        {onBack && (
          <button onClick={onBack} style={{ width:50, padding:"15px", borderRadius:15,
            border:"2px solid #E0E0E6", background:C.white,
            fontSize:18, cursor:"pointer", flexShrink:0, color:C.gray }}>←</button>
        )}
        <button onClick={onNext} disabled={disabled} style={{ flex:1, padding:"15px",
          background: disabled ? "#CCC" : C.coral, color:C.white,
          border:"none", borderRadius:15, fontSize:15, fontWeight:700,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 5px 18px rgba(255,140,118,0.4)" }}>
          {label}
        </button>
      </div>
    </div>
  );
}

// ── Screen 0: Welcome Splash ──────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <div style={{ height:"100%", background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar dark />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"20px 32px", textAlign:"center" }}>

        {/* Logo mark */}
        <div style={{ width:84, height:84, borderRadius:26,
          background:"rgba(255,255,255,0.15)", backdropFilter:"blur(12px)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:42, marginBottom:20, border:"1.5px solid rgba(255,255,255,0.2)" }}>
          🌿
        </div>

        <h1 style={{ margin:"0 0 4px", fontSize:38, fontWeight:900, color:C.white, letterSpacing:-0.5 }}>
          BloomPath
        </h1>
        <p style={{ margin:"0 0 8px", fontSize:16, fontWeight:600, color:C.green, letterSpacing:0.5 }}>
          HEALTH
        </p>
        <p style={{ margin:"0 0 36px", fontSize:16, color:"rgba(255,255,255,0.7)",
          lineHeight:1.6, maxWidth:270 }}>
          Evidence-based pediatric health care, built for your whole family.
        </p>

        {/* Feature bullets */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:310, marginBottom:36 }}>
          {[
            { icon:"🏥", text:"Led by licensed clinicians (RD, MD, Coach)" },
            { icon:"👨‍👩‍👧", text:"Family-centered — parents are active partners" },
            { icon:"📱", text:"100% virtual, on your schedule" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
              background:"rgba(255,255,255,0.1)", borderRadius:14,
              padding:"11px 16px", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <span style={{ fontSize:14, color:"rgba(255,255,255,0.9)", fontWeight:500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onNext} style={{ width:"100%", maxWidth:320, padding:"17px",
          background:C.coral, color:C.white, border:"none", borderRadius:17,
          fontSize:17, fontWeight:700, cursor:"pointer",
          boxShadow:"0 6px 24px rgba(255,140,118,0.45)" }}>
          Let's Get Started →
        </button>
        <p style={{ margin:"14px 0 0", fontSize:12, color:"rgba(255,255,255,0.35)" }}>
          Takes about 5 minutes · HIPAA compliant
        </p>
      </div>
    </div>
  );
}

// ── Screen 1: How It Works ────────────────────────────────────────────────────
function HowItWorksScreen({ onNext, onBack }) {
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={1} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Here's how BloomPath works
        </h2>
        <p style={{ margin:"0 0 22px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A structured, evidence-based program aligned with AAP pediatric care guidelines.
        </p>
        {[
          { emoji:"📅", title:"20 structured sessions", desc:"Guided by your RD, Behavioral Coach, and physician across 6–12 months.", bg:C.coralLight, tc:C.coral },
          { emoji:"👨‍👩‍👧", title:"The whole family participates", desc:"Parents are active partners in care — not passive observers. This program is built for families.", bg:C.tealLight, tc:C.teal },
          { emoji:"🌱", title:"No shame. No diets. No \"traffic light\" guilt.", desc:"We use positive framing and focus on building lasting, joyful health habits.", bg:C.greenLight, tc:C.greenDark },
          { emoji:"📱", title:"Virtual + async tools", desc:"Telehealth sessions, goal tracking, meal logging, and coaching check-ins — all here.", bg:C.yellowLight, tc:"#8B6914" },
        ].map((c,i) => (
          <div key={i} style={{ background:c.bg, borderRadius:18, padding:"16px",
            marginBottom:12, display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:44, height:44, borderRadius:14,
              background:"rgba(255,255,255,0.6)", display:"flex",
              alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
              {c.emoji}
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:15, fontWeight:700, color:c.tc }}>{c.title}</p>
              <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <BottomCTA label="Sounds great →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 2: Parent Account ──────────────────────────────────────────────────
function ParentAccountScreen({ data, setData, onNext, onBack }) {
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={2} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Let's set up your account
        </h2>
        <p style={{ margin:"0 0 24px", fontSize:15, color:C.gray }}>
          You'll be the primary contact for your child's care team.
        </p>

        <FormField label="Your first name" icon="👤" value={data.parentFirstName||""} placeholder="e.g. Sarah" onChange={v => setData(p=>({...p,parentFirstName:v}))} />
        <FormField label="Your last name"  icon="👤" value={data.parentLastName||""}  placeholder="e.g. Johnson" onChange={v => setData(p=>({...p,parentLastName:v}))} />
        <FormField label="Email address"   icon="✉️" value={data.email||""}           placeholder="you@email.com" type="email" onChange={v => setData(p=>({...p,email:v}))} />

        <p style={{ margin:"4px 0 10px", fontSize:14, fontWeight:700, color:C.slate }}>
          Your relationship to the child
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
          {["Parent","Guardian","Caregiver","Grandparent"].map(r => (
            <button key={r} onClick={() => setData(p=>({...p,relationship:r}))} style={{
              padding:"9px 16px", borderRadius:20,
              border:`2px solid ${data.relationship===r ? C.teal : "#E0E0E6"}`,
              background: data.relationship===r ? C.teal : C.white,
              color: data.relationship===r ? C.white : C.slate,
              fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ padding:"12px 14px", background:C.tealLight, borderRadius:13,
          display:"flex", gap:10, alignItems:"flex-start" }}>
          <span style={{ fontSize:18, flexShrink:0 }}>🔒</span>
          <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.45 }}>
            Your information is stored securely in compliance with HIPAA. We'll never sell or share your data.
          </p>
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 3: Child Profile ───────────────────────────────────────────────────
function ChildProfileScreen({ data, setData, onNext, onBack }) {
  const grades = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={3} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Tell us about your child
        </h2>
        <p style={{ margin:"0 0 24px", fontSize:15, color:C.gray }}>
          This helps us tailor their care plan and program experience.
        </p>

        <FormField label="Child's first name" icon="🧒" value={data.childName||""} placeholder="e.g. Maya" onChange={v => setData(p=>({...p,childName:v}))} />

        <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:C.slate }}>Their age</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
          {[6,7,8,9,10,11,12,13,14,15,16,17].map(age => (
            <button key={age} onClick={() => setData(p=>({...p,childAge:age}))} style={{
              width:46, height:46, borderRadius:13,
              border:`2px solid ${data.childAge===age ? C.coral : "#E0E0E6"}`,
              background: data.childAge===age ? C.coral : C.white,
              color: data.childAge===age ? C.white : C.slate,
              fontSize:15, fontWeight:700, cursor:"pointer", transition:"all 0.15s" }}>
              {age}
            </button>
          ))}
        </div>

        <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:C.slate }}>Current grade</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {grades.map(g => (
            <button key={g} onClick={() => setData(p=>({...p,childGrade:g}))} style={{
              padding:"8px 14px", borderRadius:12,
              border:`2px solid ${data.childGrade===g ? C.teal : "#E0E0E6"}`,
              background: data.childGrade===g ? C.teal : C.white,
              color: data.childGrade===g ? C.white : C.slate,
              fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 4: Health Flags ────────────────────────────────────────────────────
function HealthFlagsScreen({ data, setData, onNext, onBack }) {
  const flags = [
    { id:"conditions",  icon:"🏥", label:"Any diagnosed medical conditions?",   sub:"e.g. diabetes, thyroid issues, PCOS" },
    { id:"medications", icon:"💊", label:"Takes any regular medications?",       sub:"Prescription or over-the-counter" },
    { id:"allergies",   icon:"⚠️", label:"Any food allergies or restrictions?",  sub:"Include intolerances or cultural/religious" },
    { id:"specialists", icon:"👨‍⚕️", label:"Currently seeing other specialists?", sub:"e.g. endocrinologist, therapist" },
  ];
  const fd = data.flags || {};
  const toggle = (id, val) => setData(p => ({ ...p, flags: { ...(p.flags||{}), [id]: val } }));

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={4} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Health basics
        </h2>
        <p style={{ margin:"0 0 6px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A few quick questions to help your care team prepare for Session 1.
        </p>
        <p style={{ margin:"0 0 22px", fontSize:13, color:C.coral, fontWeight:600 }}>
          ✨ No wrong answers — this gives your team a head start.
        </p>
        {flags.map(flag => (
          <div key={flag.id} style={{
            background:C.white, borderRadius:18, padding:"16px", marginBottom:12,
            border:`1.5px solid ${fd[flag.id]===true ? C.coral : fd[flag.id]===false ? "#E8E8EE" : "#E8E8EE"}` }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{flag.icon}</span>
              <div>
                <p style={{ margin:"0 0 2px", fontSize:14, fontWeight:700, color:C.slate }}>{flag.label}</p>
                <p style={{ margin:0, fontSize:12, color:C.gray }}>{flag.sub}</p>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {["Yes","No"].map(opt => {
                const active = fd[flag.id] === (opt === "Yes");
                return (
                  <button key={opt} onClick={() => toggle(flag.id, opt==="Yes")} style={{
                    flex:1, padding:"9px", borderRadius:11,
                    border:`2px solid ${active ? C.coral : "#E0E0E6"}`,
                    background: active ? C.coral : C.white,
                    color: active ? C.white : C.gray,
                    fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.15s" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ padding:"12px 14px", background:C.tealLight, borderRadius:13,
          display:"flex", gap:10, alignItems:"flex-start" }}>
          <span style={{ fontSize:16 }}>💡</span>
          <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.5 }}>
            Your MD/NP will review this before Session 1 and may follow up with more detail questions.
          </p>
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 5: Family Goals ────────────────────────────────────────────────────
function GoalsScreen({ data, setData, onNext, onBack }) {
  const goals = data.goals || [];
  const toggle = id => setData(p => {
    const c = p.goals || [];
    return { ...p, goals: c.includes(id) ? c.filter(g=>g!==id) : [...c,id] };
  });
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={5} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          What matters most to your family?
        </h2>
        <p style={{ margin:"0 0 6px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          Select everything that resonates. Your care team will use this to shape your care plan.
        </p>
        <p style={{ margin:"0 0 22px", fontSize:13, color:C.coral, fontWeight:600 }}>
          Pick as many as you like — there's no wrong answer here.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {GOALS.map(goal => {
            const sel = goals.includes(goal.id);
            return (
              <button key={goal.id} onClick={() => toggle(goal.id)} style={{
                padding:"14px 12px", borderRadius:16,
                border:`2px solid ${sel ? C.teal : "#E0E0E6"}`,
                background: sel ? C.tealLight : C.white,
                cursor:"pointer", transition:"all 0.15s",
                display:"flex", flexDirection:"column", alignItems:"flex-start", gap:6,
                boxShadow: sel ? "0 4px 14px rgba(0,95,115,0.15)" : "none" }}>
                <span style={{ fontSize:24 }}>{goal.emoji}</span>
                <span style={{ fontSize:13, fontWeight:600, color: sel ? C.teal : C.slate,
                  textAlign:"left", lineHeight:1.3 }}>{goal.label}</span>
                {sel && (
                  <div style={{ width:20, height:20, borderRadius:10, background:C.teal,
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:C.white, fontSize:11, fontWeight:700 }}>✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <BottomCTA
        label={`Continue${goals.length > 0 ? ` (${goals.length} selected)` : ""} →`}
        onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 6: Meet Care Team ──────────────────────────────────────────────────
function CareTeamScreen({ onNext, onBack }) {
  const team = [
    { emoji:"👩‍⚕️", name:"Dr. Julia Nordgren", role:"Chief Medical Officer",
      detail:"Pediatric Lipid Specialist · Stanford Children's Health",
      bg:C.coralLight, tc:C.coral },
    { emoji:"🥗", name:"Your Registered Dietitian", role:"Nutrition Lead",
      detail:"Personalized meal planning · Traffic Light Method · Family nutrition coaching",
      bg:C.tealLight, tc:C.teal },
    { emoji:"🧠", name:"Your Behavioral Coach", role:"Behavioral Health",
      detail:"Habits, routines, stress, sleep & family behavior change",
      bg:C.yellowLight, tc:"#8B6914" },
  ];
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={6} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Meet your care team
        </h2>
        <p style={{ margin:"0 0 22px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          You'll work with a dedicated multidisciplinary team across all 20 sessions.
        </p>
        {team.map((m, i) => (
          <div key={i} style={{ background:m.bg, borderRadius:20, padding:"18px", marginBottom:14 }}>
            <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:10 }}>
              <div style={{ width:52, height:52, borderRadius:26,
                background:"rgba(255,255,255,0.7)", display:"flex",
                alignItems:"center", justifyContent:"center", fontSize:26 }}>
                {m.emoji}
              </div>
              <div>
                <p style={{ margin:"0 0 2px", fontSize:15, fontWeight:700, color:m.tc }}>{m.name}</p>
                <p style={{ margin:0, fontSize:11, fontWeight:600, color:C.gray,
                  textTransform:"uppercase", letterSpacing:0.3 }}>{m.role}</p>
              </div>
            </div>
            <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{m.detail}</p>
          </div>
        ))}
        <div style={{ padding:"14px 16px", background:C.greenLight, borderRadius:16, display:"flex", gap:10 }}>
          <span style={{ fontSize:20 }}>🤝</span>
          <p style={{ margin:0, fontSize:13, color:C.greenDark, lineHeight:1.5 }}>
            Your whole team reviews your family profile before Session 1. You won't start from scratch at your first appointment.
          </p>
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 7: Child Handoff ───────────────────────────────────────────────────
function ChildHandoffScreen({ data, onNext, onBack }) {
  const child = data.childName || "your child";
  return (
    <div style={{ height:"100%",
      background:`linear-gradient(160deg, ${C.purple}, ${C.purpleDark})`,
      display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar dark />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"20px 32px", textAlign:"center" }}>

        <div style={{ fontSize:72, marginBottom:18 }}>📱</div>

        <h2 style={{ margin:"0 0 8px", fontSize:28, fontWeight:800, color:C.white }}>
          Pass the phone to {child}!
        </h2>
        <p style={{ margin:"0 0 32px", fontSize:15, color:"rgba(255,255,255,0.72)", lineHeight:1.65 }}>
          Now let's set up {child}'s personal space. They'll pick their interests,
          favorite foods, and tell us a little about themselves.
        </p>

        <div style={{ width:"100%", background:"rgba(255,255,255,0.12)", borderRadius:20,
          padding:"18px 20px", marginBottom:32, backdropFilter:"blur(10px)" }}>
          <p style={{ margin:"0 0 14px", fontSize:13, fontWeight:700,
            color:"rgba(255,255,255,0.75)", textAlign:"left" }}>
            {child} will:
          </p>
          {[
            { icon:"🏃", text:"Choose activities they enjoy" },
            { icon:"🍎", text:"Tell us their favorite foods" },
            { icon:"🌟", text:"Set their first health goal" },
          ].map((item,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom: i<2 ? 10 : 0 }}>
              <span style={{ fontSize:18 }}>{item.icon}</span>
              <span style={{ fontSize:14, color:"rgba(255,255,255,0.85)", fontWeight:500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onNext} style={{ width:"100%", maxWidth:320, padding:"16px",
          background:C.coral, color:C.white, border:"none", borderRadius:17,
          fontSize:16, fontWeight:700, cursor:"pointer",
          boxShadow:"0 6px 24px rgba(0,0,0,0.3)" }}>
          Hi, I'm {child}! 👋
        </button>

        <button onClick={onBack} style={{ marginTop:14, background:"none", border:"none",
          color:"rgba(255,255,255,0.45)", fontSize:13, cursor:"pointer" }}>
          ← Back
        </button>
      </div>
    </div>
  );
}

// ── Screen 8: Child Preferences ───────────────────────────────────────────────
function ChildPreferencesScreen({ data, setData, onNext, onBack }) {
  const child = data.childName || "you";
  const selA = data.activities || [];
  const selF = data.favFoods || [];
  const toggleA = id => setData(p => { const c=p.activities||[]; return {...p, activities: c.includes(id) ? c.filter(a=>a!==id) : [...c,id]}; });
  const toggleF = id => setData(p => { const c=p.favFoods||[];   return {...p, favFoods:   c.includes(id) ? c.filter(f=>f!==id) : [...c,id]}; });

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={8} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Hi {child}! 👋
        </h2>
        <p style={{ margin:"0 0 22px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          Tell us a bit about yourself so we can make BloomPath feel like yours.
        </p>

        <h3 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:C.slate }}>
          Activities you enjoy 🏃
        </h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
          {ACTIVITIES.map(act => {
            const sel = selA.includes(act.id);
            return (
              <button key={act.id} onClick={() => toggleA(act.id)} style={{
                display:"flex", alignItems:"center", gap:6, padding:"8px 14px",
                borderRadius:20, border:`2px solid ${sel ? C.coral : "#E0E0E6"}`,
                background: sel ? C.coral : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
                <span style={{ fontSize:16 }}>{act.emoji}</span>{act.label}
              </button>
            );
          })}
        </div>

        <h3 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:C.slate }}>
          Foods you love 😋
        </h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
          {FAV_FOODS.map(food => {
            const sel = selF.includes(food.id);
            return (
              <button key={food.id} onClick={() => toggleF(food.id)} style={{
                display:"flex", alignItems:"center", gap:6, padding:"8px 14px",
                borderRadius:20, border:`2px solid ${sel ? C.teal : "#E0E0E6"}`,
                background: sel ? C.teal : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
                <span style={{ fontSize:16 }}>{food.emoji}</span>{food.label}
              </button>
            );
          })}
        </div>

        {(selA.length > 0 || selF.length > 0) && (
          <div style={{ padding:"12px 14px", background:C.greenLight, borderRadius:13, display:"flex", gap:10 }}>
            <span style={{ fontSize:16 }}>✨</span>
            <p style={{ margin:0, fontSize:12, color:C.greenDark, lineHeight:1.5 }}>
              Your RD will use your food preferences to suggest swaps that feel familiar and doable — not foreign.
            </p>
          </div>
        )}
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 9: Journey Overview ────────────────────────────────────────────────
function JourneyOverviewScreen({ onNext, onBack }) {
  const phases = [
    { num:1, phase:"Intensive",      months:"Months 1–3",  sessions:"Sessions 1–12", hours:"~16–20 hrs",
      desc:"Weekly sessions building core skills in nutrition, activity, and behavior.",
      bg:C.coralLight, border:C.coral, tc:C.coral },
    { num:2, phase:"Maintenance",    months:"Months 4–6",  sessions:"Sessions 13–20", hours:"~10–12 hrs",
      desc:"Biweekly sessions reinforcing habits and building relapse resilience.",
      bg:C.tealLight, border:C.teal, tc:C.teal },
    { num:3, phase:"Long-term Care", months:"Months 7–12", sessions:"Optional",        hours:"~12–16 hrs",
      desc:"Monthly check-ins for families who want continued clinical support.",
      bg:C.greenLight, border:C.green, tc:C.greenDark },
  ];
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={9} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Your 12-month journey 🗺️
        </h2>
        <p style={{ margin:"0 0 22px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A structured program that adapts to your family's pace across three phases.
        </p>
        {phases.map((ph,i) => (
          <div key={i} style={{ background:ph.bg, border:`1.5px solid ${ph.border}`,
            borderRadius:18, padding:"16px", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:28, height:28, borderRadius:14, background:ph.border,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:C.white, fontSize:14, fontWeight:800 }}>{ph.num}</span>
              </div>
              <span style={{ fontSize:15, fontWeight:800, color:ph.tc }}>Phase {ph.num}: {ph.phase}</span>
              <span style={{ fontSize:11, color:C.gray, marginLeft:4 }}>{ph.months}</span>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {[ph.sessions, ph.hours].map((tag,j) => (
                <span key={j} style={{ fontSize:11, fontWeight:700, color:ph.tc,
                  background:"rgba(255,255,255,0.65)", padding:"3px 9px", borderRadius:8 }}>{tag}</span>
              ))}
            </div>
            <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{ph.desc}</p>
          </div>
        ))}
        <div style={{ background:C.teal, borderRadius:18, padding:"14px 16px", display:"flex", gap:10 }}>
          <span style={{ fontSize:20 }}>🏆</span>
          <p style={{ margin:0, fontSize:13, color:C.white, lineHeight:1.5 }}>
            Completing Phase 1 earns your family a program achievement badge and 200 XP!
          </p>
        </div>
      </div>
      <BottomCTA label="Almost there →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 10: Scan Intro ─────────────────────────────────────────────────────
function ScanIntroScreen({ data, onNext, onBack }) {
  const child = data.childName || "your child";
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <PhaseBar step={10} />
      <div style={{ flex:1, overflowY:"auto", padding:"4px 24px 110px" }}>
        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          One last step: {child}'s health baseline 📸
        </h2>
        <p style={{ margin:"0 0 22px", fontSize:15, color:C.gray, lineHeight:1.5 }}>
          We'll take a quick facial scan to establish a biometric baseline. This helps your care team
          track physical progress over time — alongside weight and clinical measurements.
        </p>

        {/* Illustration */}
        <div style={{ height:130, background:`linear-gradient(135deg, ${C.tealLight}, ${C.greenLight})`,
          borderRadius:20, marginBottom:22, display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:54 }}>
          📸
        </div>

        <h3 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:C.slate }}>
          How it works:
        </h3>
        {[
          { icon:"📱", text:"Hold the phone at eye level, about 12 inches away" },
          { icon:"💡", text:"Find good, even lighting — natural light works best" },
          { icon:"⏱️", text:"The scan takes about 10 seconds" },
          { icon:"📊", text:"Results are compared at each check-in to show progress" },
        ].map((item,i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10, padding:"11px 14px",
            background:C.white, borderRadius:13 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
            <span style={{ fontSize:14, color:C.slate, fontWeight:500, lineHeight:1.45 }}>{item.text}</span>
          </div>
        ))}

        <div style={{ marginTop:16, padding:"14px 16px", background:C.tealLight,
          borderRadius:14, display:"flex", gap:10 }}>
          <span style={{ fontSize:20, flexShrink:0 }}>🔒</span>
          <div>
            <p style={{ margin:"0 0 3px", fontSize:13, fontWeight:700, color:C.teal }}>Your privacy is protected</p>
            <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.5 }}>
              Scans are processed on-device. No images are stored on our servers or shared with third parties.
            </p>
          </div>
        </div>
      </div>
      <BottomCTA label="Start Scan →" onNext={onNext} onBack={onBack} />
    </div>
  );
}

// ── Screen 11: Scan UI ────────────────────────────────────────────────────────
function ScanScreen({ data, onNext, onBack }) {
  const [phase, setPhase] = useState("idle"); // idle | scanning | done
  const child = data.childName || "your child";

  const startScan = () => {
    setPhase("scanning");
    setTimeout(() => setPhase("done"), 3200);
  };

  const ovalColor = phase==="done" ? C.green : phase==="scanning" ? C.yellow : "rgba(255,255,255,0.55)";
  const ovalGlow  = phase==="done"
    ? "0 0 0 6px rgba(148,210,189,0.25), 0 0 60px rgba(148,210,189,0.2)"
    : phase==="scanning"
    ? "0 0 0 6px rgba(233,216,166,0.25), 0 0 60px rgba(233,216,166,0.2)"
    : "none";

  return (
    <div style={{ height:"100%", background:"#0A0A0A", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ padding:"4px 22px 12px", display:"flex", alignItems:"center",
        justifyContent:"space-between", flexShrink:0 }}>
        <button onClick={onBack} style={{ width:36, height:36, borderRadius:18,
          background:"rgba(255,255,255,0.12)", border:"none", cursor:"pointer",
          color:C.white, fontSize:16 }}>✕</button>
        <span style={{ fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.65)" }}>
          {phase==="done" ? "✓ Scan Complete" : phase==="scanning" ? "Scanning…" : "Baseline Scan"}
        </span>
        <div style={{ width:36 }} />
      </div>

      {/* Viewfinder */}
      <div style={{ flex:1, margin:"0 18px", borderRadius:24, overflow:"hidden",
        background:"radial-gradient(ellipse at 50% 40%, #2a2a2a 0%, #0d0d0d 100%)",
        position:"relative" }}>

        {/* Face oval */}
        <div style={{ position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%, -55%)",
          width:180, height:220, border:`3px solid ${ovalColor}`,
          borderRadius:"50%", boxShadow:ovalGlow, transition:"all 0.6s ease" }}>

          {/* Oval corner dots */}
          {[
            { position:"absolute", top:-6, left:"50%", marginLeft:-5 },
            { position:"absolute", bottom:-6, left:"50%", marginLeft:-5 },
            { position:"absolute", left:-6, top:"50%", marginTop:-5 },
            { position:"absolute", right:-6, top:"50%", marginTop:-5 },
          ].map((s,i) => (
            <div key={i} style={{ ...s, width:10, height:10, borderRadius:5,
              background:ovalColor, transition:"all 0.6s" }} />
          ))}

          {/* Face guide landmarks */}
          {phase !== "idle" && (
            <>
              {/* Eye guides */}
              <div style={{ position:"absolute", top:"30%", left:"28%", width:20, height:3,
                background: phase==="done" ? C.green : C.yellow, borderRadius:2, opacity:0.7 }} />
              <div style={{ position:"absolute", top:"30%", right:"28%", width:20, height:3,
                background: phase==="done" ? C.green : C.yellow, borderRadius:2, opacity:0.7 }} />
              {/* Nose guide */}
              <div style={{ position:"absolute", top:"50%", left:"50%",
                transform:"translate(-50%,-50%)", width:8, height:8, borderRadius:4,
                background: phase==="done" ? C.green : C.yellow, opacity:0.6 }} />
            </>
          )}
        </div>

        {/* Scan sweep line */}
        {phase === "scanning" && (
          <div style={{ position:"absolute",
            top:"22%", left:"calc(50% - 88px)", width:176,
            height:2, background:`linear-gradient(90deg, transparent, ${C.coral}, transparent)`,
            boxShadow:`0 0 12px ${C.coral}, 0 0 4px ${C.coral}` }} />
        )}

        {/* Corner brackets (camera frame UI) */}
        {["tl","tr","bl","br"].map(corner => (
          <div key={corner} style={{
            position:"absolute",
            top: corner.startsWith("t") ? 16 : undefined,
            bottom: corner.startsWith("b") ? 16 : undefined,
            left: corner.endsWith("l") ? 16 : undefined,
            right: corner.endsWith("r") ? 16 : undefined,
            width:22, height:22,
            borderTop: corner.startsWith("t") ? `2.5px solid rgba(255,255,255,0.4)` : "none",
            borderBottom: corner.startsWith("b") ? `2.5px solid rgba(255,255,255,0.4)` : "none",
            borderLeft: corner.endsWith("l") ? `2.5px solid rgba(255,255,255,0.4)` : "none",
            borderRight: corner.endsWith("r") ? `2.5px solid rgba(255,255,255,0.4)` : "none",
            borderTopLeftRadius: corner==="tl" ? 4 : 0,
            borderTopRightRadius: corner==="tr" ? 4 : 0,
            borderBottomLeftRadius: corner==="bl" ? 4 : 0,
            borderBottomRightRadius: corner==="br" ? 4 : 0,
          }} />
        ))}

        {/* Status */}
        <div style={{ position:"absolute", bottom:22, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          {phase === "done" ? (
            <>
              <div style={{ width:44, height:44, borderRadius:22, background:C.green,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>✓</div>
              <span style={{ fontSize:13, color:C.green, fontWeight:700 }}>Baseline captured!</span>
            </>
          ) : phase === "scanning" ? (
            <>
              <div style={{ display:"flex", gap:6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:9, height:9, borderRadius:5,
                    background:C.yellow, opacity:0.4 + i*0.3 }} />
                ))}
              </div>
              <span style={{ fontSize:13, color:C.yellow, fontWeight:600 }}>
                Hold still…
              </span>
            </>
          ) : (
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.55)", textAlign:"center" }}>
              Position {child}'s face inside the oval
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding:"18px 22px 30px", flexShrink:0 }}>
        {phase === "done" ? (
          <button onClick={onNext} style={{ width:"100%", padding:"16px",
            background:C.coral, color:C.white, border:"none", borderRadius:17,
            fontSize:16, fontWeight:700, cursor:"pointer",
            boxShadow:"0 6px 20px rgba(255,140,118,0.45)" }}>
            Continue →
          </button>
        ) : (
          <button onClick={startScan} disabled={phase==="scanning"} style={{
            width:"100%", padding:"16px",
            background: phase==="scanning" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.14)",
            color:C.white,
            border:`2px solid ${phase==="scanning" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.28)"}`,
            borderRadius:17, fontSize:16, fontWeight:700,
            cursor: phase==="scanning" ? "not-allowed" : "pointer" }}>
            {phase === "scanning" ? "Scanning…" : "📸 Capture Baseline Scan"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Screen 12: All Set ────────────────────────────────────────────────────────
function AllSetScreen({ data }) {
  const child  = data.childName      || "your family";
  const parent = data.parentFirstName|| "there";
  return (
    <div style={{ height:"100%", background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar dark />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"20px 26px", overflowY:"auto", textAlign:"center" }}>

        <div style={{ fontSize:70, marginBottom:14 }}>🌱</div>
        <h1 style={{ margin:"0 0 8px", fontSize:28, fontWeight:800, color:C.white }}>
          Welcome to BloomPath{child !== "your family" ? `, ${child}` : ""}!
        </h1>
        <p style={{ margin:"0 0 28px", fontSize:15, color:"rgba(255,255,255,0.7)", lineHeight:1.65 }}>
          Your profile is set up and your care team has been notified. You're ready to begin.
        </p>

        {/* Session 1 card */}
        <div style={{ width:"100%", background:"rgba(255,255,255,0.14)", borderRadius:20,
          padding:"18px 20px", marginBottom:14, backdropFilter:"blur(10px)", textAlign:"left" }}>
          <p style={{ margin:"0 0 4px", fontSize:11, color:"rgba(255,255,255,0.5)",
            fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>Your first session</p>
          <p style={{ margin:"0 0 4px", fontSize:18, fontWeight:800, color:C.white }}>
            Session 1: Welcome & Intake
          </p>
          <p style={{ margin:"0 0 12px", fontSize:13, color:"rgba(255,255,255,0.65)" }}>
            MD/NP + Registered Dietitian · 75–90 min
          </p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[
              { icon:"📅", label:"Scheduling soon" },
              { icon:"📱", label:"Virtual telehealth" },
              { icon:"⚡", label:"+50 XP on completion" },
            ].map((tag,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:5,
                background:"rgba(255,255,255,0.14)", borderRadius:10, padding:"5px 10px" }}>
                <span style={{ fontSize:12 }}>{tag.icon}</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)", fontWeight:600 }}>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div style={{ width:"100%", background:"rgba(255,255,255,0.1)", borderRadius:18,
          padding:"16px", marginBottom:26, textAlign:"left" }}>
          <p style={{ margin:"0 0 12px", fontSize:12, fontWeight:700,
            color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:0.5 }}>
            What happens next
          </p>
          {[
            { emoji:"✉️", text:`${parent}, check your email for login details and Session 1 prep materials` },
            { emoji:"📋", text:"Your care team will review your family's full profile before your first session" },
            { emoji:"🗺️", text:"Explore your Journey Map and get a feel for the app" },
          ].map((item,i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom: i<2 ? 10 : 0 }}>
              <span style={{ fontSize:17, flexShrink:0 }}>{item.emoji}</span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.82)", lineHeight:1.45 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button style={{ width:"100%", padding:"16px",
          background:C.coral, color:C.white, border:"none", borderRadius:17,
          fontSize:16, fontWeight:700, cursor:"pointer",
          boxShadow:"0 6px 24px rgba(0,0,0,0.3)" }}>
          Go to Journey Map 🗺️
        </button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function OnboardingApp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    parentFirstName: "Sarah",
    parentLastName:  "Johnson",
    email:           "sarah@email.com",
    relationship:    "Parent",
    childName:       "Maya",
    childAge:        13,
    childGrade:      "8th",
    flags:      { conditions: false, medications: false, allergies: true, specialists: false },
    goals:      ["energy", "active", "family", "confidence"],
    activities: ["dancing", "swimming", "cooking"],
    favFoods:   ["tacos", "fruit", "pasta", "eggs"],
  });

  const next = () => setStep(s => Math.min(s+1, TOTAL-1));
  const back = () => setStep(s => Math.max(s-1, 0));

  // Background per screen
  const phoneBg =
    step === 11 ? "#0A0A0A" :
    step === 7  ? C.purpleDark :
    (step === 0 || step === 12) ? C.teal :
    C.cream;

  return (
    <div style={{
      background: C.bg, minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"72px 20px 28px",
      fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* Step dot nav */}
      <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:20, flexWrap:"wrap", justifyContent:"center" }}>
        {Array.from({ length: TOTAL }).map((_,i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            width: step===i ? 24 : 8, height:8, borderRadius:4, padding:0, border:"none",
            background: i<=step ? C.coral : "rgba(255,255,255,0.18)",
            cursor:"pointer", transition:"all 0.2s" }} />
        ))}
        <span style={{ color:"rgba(255,255,255,0.35)", fontSize:12, marginLeft:8 }}>
          {step+1}/{TOTAL}
        </span>
      </div>

      {/* Phase label */}
      <div style={{ marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:14 }}>{getPhase(step).emoji}</span>
        <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontWeight:600 }}>
          {getPhase(step).label}
        </span>
      </div>

      {/* Phone frame */}
      <div style={{
        width:390, height:780, background:phoneBg, borderRadius:52,
        overflow:"hidden", position:"relative",
        boxShadow:"0 40px 100px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.07)",
        border:"10px solid #1a2030",
      }}>
        {step === 0  && <WelcomeScreen         onNext={next} />}
        {step === 1  && <HowItWorksScreen       onNext={next} onBack={back} />}
        {step === 2  && <ParentAccountScreen    data={data} setData={setData} onNext={next} onBack={back} />}
        {step === 3  && <ChildProfileScreen     data={data} setData={setData} onNext={next} onBack={back} />}
        {step === 4  && <HealthFlagsScreen      data={data} setData={setData} onNext={next} onBack={back} />}
        {step === 5  && <GoalsScreen            data={data} setData={setData} onNext={next} onBack={back} />}
        {step === 6  && <CareTeamScreen         onNext={next} onBack={back} />}
        {step === 7  && <ChildHandoffScreen     data={data} onNext={next} onBack={back} />}
        {step === 8  && <ChildPreferencesScreen data={data} setData={setData} onNext={next} onBack={back} />}
        {step === 9  && <JourneyOverviewScreen  onNext={next} onBack={back} />}
        {step === 10 && <ScanIntroScreen        data={data} onNext={next} onBack={back} />}
        {step === 11 && <ScanScreen             data={data} onNext={next} onBack={back} />}
        {step === 12 && <AllSetScreen           data={data} />}
      </div>

      <p style={{ color:"rgba(255,255,255,0.18)", marginTop:18, fontSize:11 }}>
        BloomPath Health · Onboarding Flow · {
          step < 7 ? "Parent-Facing" :
          step === 7 ? "Child Handoff" :
          step < 10 ? "Child-Facing" :
          step < 12 ? "Baseline Scan" : "Complete"
        }
      </p>
    </div>
  );
}
