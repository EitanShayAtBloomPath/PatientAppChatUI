import { useState } from "react";

// ── BloomPath Color System ──────────────────────────────────────────────────
const C = {
  coral:       '#FF8C76',
  coralLight:  '#FFF0ED',
  coralDark:   '#E06B55',
  teal:        '#005F73',
  tealLight:   '#E6F2F5',
  tealMid:     '#3A8FA0',
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
  roseLight:   '#FDEAEA',
  bg:          '#0F1923',
};

// ── Data ────────────────────────────────────────────────────────────────────
const SESSIONS = [
  { id: 1, title: "Welcome & Intake",           emoji: "🌱", done: true,   xp: 50, provider: "MD + RD",     mins: 90 },
  { id: 2, title: "Nutrition Foundations",       emoji: "🥗", active: true, xp: 50, provider: "RD",          mins: 60 },
  { id: 3, title: "Healthy Routines",            emoji: "⏰", xp: 50,       provider: "Coach",        mins: 60 },
  { id: 4, title: "Physical Activity I",         emoji: "🏃", xp: 50,       provider: "RD + Coach",   mins: 60 },
  { id: 5, title: "Parents as Change Agents",    emoji: "💪", xp: 50,       provider: "Coach",        mins: 60 },
  { id: 6, title: "Healthy Snacking",            emoji: "🍎", xp: 50,       provider: "RD",           mins: 60 },
];

const FOODS = [
  { id: 1, name: "Apple",            emoji: "🍎", correct: "green"  },
  { id: 2, name: "Soda",             emoji: "🥤", correct: "red"    },
  { id: 3, name: "Yogurt",           emoji: "🫙", correct: "yellow" },
  { id: 4, name: "French Fries",     emoji: "🍟", correct: "red"    },
  { id: 5, name: "Broccoli",         emoji: "🥦", correct: "green"  },
  { id: 6, name: "Whole Grain Bread",emoji: "🍞", correct: "yellow" },
];

const LESSON_STEPS = 5; // 0=intro 1=traffic-light 2=activity 3=myplate 4=commit

// ── Shared Components ────────────────────────────────────────────────────────
function StatusBar({ dark }) {
  const fg = dark ? "rgba(255,255,255,0.9)" : C.slate;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 26px 6px", position: "relative", flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: fg }}>9:41</span>
      <div style={{
        width: 120, height: 32, background: dark ? "rgba(255,255,255,0.15)" : C.slate,
        borderRadius: 20, position: "absolute", left: "50%", transform: "translateX(-50%)",
      }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {/* Signal bars */}
        {[9, 7, 5, 3].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, background: fg, borderRadius: 1.5, opacity: i < 3 ? 1 : 0.4 }} />
        ))}
        <div style={{ width: 2 }} />
        {/* Battery */}
        <div style={{ width: 22, height: 11, border: `1.5px solid ${fg}`, borderRadius: 3, position: "relative", display: "flex", alignItems: "center", padding: "1px 1.5px" }}>
          <div style={{ width: "75%", height: "100%", background: fg, borderRadius: 1.5 }} />
          <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 3, height: 6, background: fg, borderRadius: "0 1px 1px 0", opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    { id: "home",     icon: "🏠", label: "Home"     },
    { id: "lessons",  icon: "📚", label: "Lessons"  },
    { id: "goals",    icon: "🎯", label: "Goals"    },
    { id: "progress", icon: "📊", label: "Progress" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
      background: C.white, borderTop: "1px solid #EBEBEB",
      display: "flex", paddingBottom: 10,
    }}>
      {items.map(item => (
        <div key={item.id} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", paddingTop: 10, gap: 3,
        }}>
          <span style={{ fontSize: active === item.id ? 22 : 20 }}>{item.icon}</span>
          <span style={{
            fontSize: 11, fontWeight: active === item.id ? 700 : 500,
            color: active === item.id ? C.teal : C.gray,
          }}>{item.label}</span>
          {active === item.id && (
            <div style={{ width: 20, height: 3, borderRadius: 1.5, background: C.teal }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Journey Screen ───────────────────────────────────────────────────────────
function StatPill({ icon, value, label, color, bg }) {
  return (
    <div style={{
      flex: 1, background: bg, borderRadius: 14, padding: "11px 12px",
      display: "flex", flexDirection: "column", gap: 2,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 17 }}>{icon}</span>
        <span style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</span>
      </div>
      <span style={{ fontSize: 11, color: C.gray, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function SessionNode({ session, isLast, onStart }) {
  const isDone   = !!session.done;
  const isActive = !!session.active;
  const isLocked = !isDone && !isActive;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        onClick={isActive ? onStart : undefined}
        style={{
          width: "100%",
          background: isDone ? C.tealLight : isActive ? C.white : C.grayLight,
          border: `2px solid ${isDone ? C.teal : isActive ? C.coral : "#DDDDE0"}`,
          borderRadius: 18,
          padding: "13px 16px",
          display: "flex", alignItems: "center", gap: 14,
          cursor: isActive ? "pointer" : "default",
          boxShadow: isActive ? "0 6px 24px rgba(255,140,118,0.28)" : "none",
          transition: "all 0.2s",
        }}
      >
        {/* Icon circle */}
        <div style={{
          width: 50, height: 50, borderRadius: 25, flexShrink: 0,
          background: isDone ? C.teal : isActive ? C.coralLight : "#E5E5EA",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>
          {isDone ? <span style={{ color: C.white, fontSize: 20, fontWeight: 700 }}>✓</span> : session.emoji}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: isDone ? C.teal : isActive ? C.coral : C.gray,
              textTransform: "uppercase", letterSpacing: 0.4,
            }}>
              Session {session.id}
            </span>
            {isDone   && <Chip label="Done"    bg={C.teal}  />}
            {isActive && <Chip label="Up Next" bg={C.coral} />}
          </div>
          <p style={{
            margin: 0, fontSize: 15, fontWeight: 600,
            color: isLocked ? C.gray : C.slate,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{session.title}</p>
          {!isLocked && (
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.gray }}>
              +{session.xp} XP · {session.mins} min · {session.provider}
            </p>
          )}
        </div>

        {/* Right icon */}
        <span style={{ fontSize: 18, color: isLocked ? "#C8C8C8" : isActive ? C.coral : C.teal, flexShrink: 0 }}>
          {isLocked ? "🔒" : isActive ? "▶" : "✓"}
        </span>
      </div>

      {/* Connector */}
      {!isLast && (
        <div style={{ width: 2, height: 10, background: isDone ? C.teal : "#DDDDE0", margin: "2px 0" }} />
      )}
    </div>
  );
}

function Chip({ label, bg }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, color: C.white,
      background: bg, padding: "2px 7px", borderRadius: 10,
    }}>{label}</span>
  );
}

function JourneyScreen({ streak, xp, onStart }) {
  return (
    <div style={{ height: "100%", background: C.cream, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />

      {/* Header card */}
      <div style={{ background: C.white, padding: "10px 24px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: C.gray, fontWeight: 500 }}>Good morning,</p>
            <h1 style={{ margin: "2px 0 0", fontSize: 26, fontWeight: 800, color: C.teal }}>Maya 👋</h1>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 21, background: C.tealLight,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>🦋</div>
        </div>

        {/* Stat pills */}
        <div style={{ display: "flex", gap: 10 }}>
          <StatPill icon="🔥" value={streak}  label="day streak" color={C.coral} bg={C.coralLight} />
          <StatPill icon="⚡" value={xp}       label="XP earned"  color={C.teal}  bg={C.tealLight}  />
          <StatPill icon="🎯" value="2/3"      label="goals met"  color="#7B5EA7" bg="#F0ECFA"      />
        </div>
      </div>

      {/* Phase badge */}
      <div style={{ padding: "14px 24px 6px", flexShrink: 0 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: C.teal, borderRadius: 20, padding: "5px 14px",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.white, letterSpacing: 0.6, textTransform: "uppercase" }}>
            Phase 1 · Intensive
          </span>
        </div>
        <p style={{ margin: "7px 0 0", fontSize: 13, color: C.gray }}>
          Week 2 of 12 · 1 of 12 sessions complete
        </p>
      </div>

      {/* Session path */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 96px" }}>
        {SESSIONS.map((s, i) => (
          <SessionNode key={s.id} session={s} isLast={i === SESSIONS.length - 1} onStart={onStart} />
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  );
}

// ── Lesson Steps ─────────────────────────────────────────────────────────────
function LessonIntro() {
  return (
    <div style={{ paddingTop: 6 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: C.coralLight, borderRadius: 20, padding: "5px 13px", marginBottom: 14,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.coral }}>Session 2 · RD Session</span>
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: C.teal, lineHeight: 1.2 }}>
        Nutrition Foundations
      </h2>
      <p style={{ margin: "0 0 22px", fontSize: 15, color: C.gray, lineHeight: 1.5 }}>
        Learn a simple framework for food choices — no calorie counting required.
      </p>

      {/* Hero block */}
      <div style={{
        height: 148, background: `linear-gradient(135deg, ${C.yellow}, ${C.green})`,
        borderRadius: 20, marginBottom: 22,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60,
      }}>🥗</div>

      <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: C.slate }}>
        What you'll learn:
      </h3>
      {[
        { icon: "🚦", text: "The Traffic Light Method for choosing foods" },
        { icon: "🍽️", text: "How to build a balanced plate with MyPlate" },
        { icon: "🔄", text: "One swap to try this week" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 14px", background: C.cream, borderRadius: 13, marginBottom: 9,
        }}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span style={{ fontSize: 14, color: C.slate, fontWeight: 500 }}>{item.text}</span>
        </div>
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.tealLight, borderRadius: 10, padding: "6px 12px" }}>
          <span style={{ fontSize: 13 }}>⏱️</span>
          <span style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>~60 min session</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.coralLight, borderRadius: 10, padding: "6px 12px" }}>
          <span style={{ fontSize: 13 }}>⚡</span>
          <span style={{ fontSize: 12, color: C.coral, fontWeight: 600 }}>+50 XP on completion</span>
        </div>
      </div>
    </div>
  );
}

function TrafficLightExplain() {
  const tiers = [
    {
      dotColor: "#2D7A3E", bg: "#EAF6EB", border: "#A3D9A5",
      label: "🟢 Green — Eat Freely",
      desc: "Vegetables, fruits, lean proteins, water. Fill most of your plate with these.",
      examples: ["🥦", "🍎", "🐟", "💧"],
      note: "Aim for half your plate!",
    },
    {
      dotColor: "#8B6914", bg: "#FDF3DB", border: "#F0D070",
      label: "🟡 Yellow — Eat Sometimes",
      desc: "Whole grains, dairy, and legumes. Nutritious, but in balanced portions.",
      examples: ["🍞", "🧀", "🫘", "🥛"],
      note: "About a quarter of your plate.",
    },
    {
      dotColor: "#B03020", bg: "#FDEAEA", border: "#EFA8A0",
      label: "🔴 Red — Eat Less Often",
      desc: "Fried foods, sugary drinks, candy, and chips. Small amounts, less often.",
      examples: ["🍟", "🥤", "🍰", "🍬"],
      note: "A treat, not a staple.",
    },
  ];

  return (
    <div style={{ paddingTop: 6 }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: C.teal }}>
        The Traffic Light Method
      </h2>
      <p style={{ margin: "0 0 20px", fontSize: 14, color: C.gray, lineHeight: 1.5 }}>
        Instead of "good" or "bad" foods, we think about how <em>often</em> to eat them.
        No food is forbidden — it's about balance.
      </p>

      {tiers.map((tier, i) => (
        <div key={i} style={{
          background: tier.bg, border: `1.5px solid ${tier.border}`,
          borderRadius: 18, padding: "14px 16px", marginBottom: 12,
        }}>
          <p style={{ margin: "0 0 5px", fontSize: 14, fontWeight: 700, color: tier.dotColor }}>{tier.label}</p>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: "#444", lineHeight: 1.45 }}>{tier.desc}</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {tier.examples.map((e, j) => <span key={j} style={{ fontSize: 22 }}>{e}</span>)}
          </div>
          <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 9, padding: "5px 10px" }}>
            <span style={{ fontSize: 12, color: tier.dotColor, fontWeight: 600 }}>💡 {tier.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodSortActivity({ answers, setAnswers }) {
  const correct = Object.keys(answers).filter(id => answers[id] === FOODS.find(f => f.id === +id)?.correct).length;
  const attempted = Object.keys(answers).length;

  return (
    <div style={{ paddingTop: 6 }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: C.teal }}>
        Sort These Foods 🚦
      </h2>
      <p style={{ margin: "0 0 4px", fontSize: 14, color: C.gray }}>
        Tap the right color for each food using what you just learned.
      </p>

      {/* Score bar */}
      {attempted > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: C.greenLight, borderRadius: 12, padding: "8px 12px", marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>⭐</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.greenDark }}>
            {correct}/{attempted} correct so far
          </span>
        </div>
      )}
      {attempted === 0 && <div style={{ height: 16 }} />}

      {FOODS.map(food => {
        const selected = answers[food.id];
        const isCorrect = selected === food.correct;
        return (
          <div key={food.id} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
              <span style={{ fontSize: 26 }}>{food.emoji}</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: C.slate }}>{food.name}</span>
              {selected && (
                <span style={{ marginLeft: "auto", fontSize: 18 }}>
                  {isCorrect ? "✅" : "❌"}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { key: "green",  label: "🟢 Green",  active: "#2D7A3E", activeBg: "#2D7A3E", inactiveBg: "#EAF6EB", inactiveC: "#2D7A3E" },
                { key: "yellow", label: "🟡 Yellow", active: "#8B6914", activeBg: "#8B6914", inactiveBg: "#FDF3DB", inactiveC: "#8B6914" },
                { key: "red",    label: "🔴 Red",    active: "#B03020", activeBg: "#B03020", inactiveBg: "#FDEAEA", inactiveC: "#B03020" },
              ].map(btn => {
                const isSel = selected === btn.key;
                return (
                  <button
                    key={btn.key}
                    onClick={() => setAnswers(prev => ({ ...prev, [food.id]: btn.key }))}
                    style={{
                      flex: 1, padding: "9px 4px",
                      background: isSel ? btn.activeBg : btn.inactiveBg,
                      color: isSel ? C.white : btn.inactiveC,
                      border: "none", borderRadius: 11,
                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                      transition: "all 0.15s",
                      boxShadow: isSel ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                    }}
                  >{btn.label}</button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MyPlateStep() {
  const quadrants = [
    { label: "Vegetables", emoji: "🥦", bg: "#A3D9A5", textColor: "#1A5C24", top: 0,    left: 0    },
    { label: "Fruits",     emoji: "🍎", bg: "#FFB347", textColor: "#7A4B00", top: "50%", left: 0    },
    { label: "Grains",     emoji: "🌾", bg: "#F0C070", textColor: "#7A4B00", top: 0,     left: "50%"},
    { label: "Protein",    emoji: "🐟", bg: "#9FC5E8", textColor: "#1A3C5C", top: "50%", left: "50%"},
  ];

  return (
    <div style={{ paddingTop: 6 }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: C.teal }}>
        Build Your Plate 🍽️
      </h2>
      <p style={{ margin: "0 0 20px", fontSize: 14, color: C.gray, lineHeight: 1.5 }}>
        MyPlate is a simple visual guide — no calorie counting, no math.
      </p>

      {/* Plate */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div style={{
          width: 210, height: 210, borderRadius: "50%", overflow: "hidden",
          border: `4px solid ${C.teal}`,
          boxShadow: "0 8px 28px rgba(0,95,115,0.18)",
          position: "relative",
        }}>
          {quadrants.map((q, i) => (
            <div key={i} style={{
              position: "absolute", top: q.top, left: q.left, width: "50%", height: "50%",
              background: q.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 3,
            }}>
              <span style={{ fontSize: 22 }}>{q.emoji}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: q.textColor }}>{q.label}</span>
            </div>
          ))}
          {/* Dividers */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3, background: C.white, transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 3, background: C.white, transform: "translateX(-50%)" }} />
        </div>
      </div>

      {/* Dairy */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#DFF3FF", border: "2px solid #9FC5E8",
          borderRadius: 12, padding: "8px 18px",
        }}>
          <span style={{ fontSize: 20 }}>🥛</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1A3C5C" }}>+ Dairy on the side</span>
        </div>
      </div>

      {/* Tips */}
      {[
        "Fill HALF your plate with veggies and fruits",
        "Make at least HALF your grains whole grains",
        "Choose lean proteins: fish, chicken, beans",
      ].map((tip, i) => (
        <div key={i} style={{
          display: "flex", gap: 10, marginBottom: 9, padding: "10px 14px",
          background: C.greenLight, borderRadius: 13, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
          <span style={{ fontSize: 13, color: C.slate, fontWeight: 500, lineHeight: 1.4 }}>{tip}</span>
        </div>
      ))}
    </div>
  );
}

function CommitmentStep() {
  const [selected, setSelected] = useState(null);
  const swaps = [
    { id: 1, from: "🥤 Soda",             to: "💧 Water or sparkling water",      xp: "+15 XP" },
    { id: 2, from: "🍟 Chips after school", to: "🍎 Apple with peanut butter",    xp: "+15 XP" },
    { id: 3, from: "🧃 Juice",             to: "🥛 Low-fat milk",                 xp: "+15 XP" },
    { id: 4, from: "🍰 Dessert every night",to: "🍓 Fresh fruit",                 xp: "+15 XP" },
  ];

  return (
    <div style={{ paddingTop: 6 }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: C.teal }}>
        Make One Swap 🔄
      </h2>
      <p style={{ margin: "0 0 6px", fontSize: 14, color: C.gray, lineHeight: 1.5 }}>
        Small changes add up. Pick ONE swap you'll try this week.
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: C.coralLight, borderRadius: 10, padding: "6px 12px",
        marginBottom: 18, width: "fit-content",
      }}>
        <span style={{ fontSize: 13 }}>🔥</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.coral }}>
          Complete this to keep your streak!
        </span>
      </div>

      {swaps.map(swap => (
        <div
          key={swap.id}
          onClick={() => setSelected(swap.id)}
          style={{
            padding: "14px 16px", borderRadius: 17, marginBottom: 10, cursor: "pointer",
            border: `2px solid ${selected === swap.id ? C.coral : "#E5E5EA"}`,
            background: selected === swap.id ? C.coralLight : C.white,
            display: "flex", alignItems: "center", gap: 12,
            transition: "all 0.15s",
            boxShadow: selected === swap.id ? "0 4px 16px rgba(255,140,118,0.2)" : "none",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
              <span style={{ fontSize: 13, color: C.gray, textDecoration: "line-through" }}>{swap.from}</span>
              <span style={{ fontSize: 13, color: C.gray }}>→</span>
              <span style={{ fontSize: 13, color: C.slate, fontWeight: 600 }}>{swap.to}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.coral }}>{swap.xp}</span>
          </div>
          <div style={{
            width: 26, height: 26, borderRadius: 13, flexShrink: 0,
            border: `2.5px solid ${selected === swap.id ? C.coral : "#D0D0D0"}`,
            background: selected === swap.id ? C.coral : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {selected === swap.id && <span style={{ color: C.white, fontSize: 13, fontWeight: 700 }}>✓</span>}
          </div>
        </div>
      ))}

      {selected && (
        <div style={{
          marginTop: 14, padding: "13px 16px",
          background: C.greenLight, borderRadius: 13,
          border: `1.5px solid ${C.green}`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 22 }}>🎯</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.greenDark }}>Commitment locked in!</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.greenDark }}>
              Your RD will check in on this next session.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Lesson Screen ────────────────────────────────────────────────────────────
function LessonScreen({ step, setStep, answers, setAnswers, onComplete }) {
  const pct = (step / LESSON_STEPS) * 100;

  return (
    <div style={{ height: "100%", background: C.white, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />

      {/* Lesson top bar */}
      <div style={{ padding: "8px 22px 14px", background: C.white, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <button
            onClick={() => step > 0 ? setStep(step - 1) : null}
            style={{
              width: 36, height: 36, borderRadius: 18, background: C.grayLight,
              border: "none", cursor: step > 0 ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: C.slate, opacity: step > 0 ? 1 : 0.4,
            }}
          >✕</button>
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.coral, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Nutrition Foundations
            </p>
            <p style={{ margin: "1px 0 0", fontSize: 12, color: C.gray }}>{step + 1} of {LESSON_STEPS}</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, background: C.coralLight,
            borderRadius: 20, padding: "5px 10px",
          }}>
            <span style={{ fontSize: 13 }}>🔥</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.coral }}>7</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 8, background: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`, background: C.coral,
            borderRadius: 4, transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 22px 110px" }}>
        {step === 0 && <LessonIntro />}
        {step === 1 && <TrafficLightExplain />}
        {step === 2 && <FoodSortActivity answers={answers} setAnswers={setAnswers} />}
        {step === 3 && <MyPlateStep />}
        {step === 4 && <CommitmentStep />}
      </div>

      {/* CTA button */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px 22px 28px",
        background: "linear-gradient(to top, rgba(255,255,255,1) 65%, rgba(255,255,255,0))",
      }}>
        <button
          onClick={() => step < LESSON_STEPS - 1 ? setStep(step + 1) : onComplete()}
          style={{
            width: "100%", padding: "16px",
            background: C.coral, color: C.white,
            border: "none", borderRadius: 17,
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255,140,118,0.45)",
            transition: "transform 0.1s",
          }}
        >
          {step < LESSON_STEPS - 1 ? "Continue →" : "🎉 Complete Session!"}
        </button>
      </div>
    </div>
  );
}

// ── Complete Screen ───────────────────────────────────────────────────────────
function CompleteScreen({ xp, streak, onHome }) {
  return (
    <div style={{
      height: "100%", background: C.teal,
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <StatusBar dark />

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "16px 24px 24px", overflowY: "auto",
      }}>
        {/* Celebration */}
        <div style={{ fontSize: 68, marginBottom: 12 }}>🎉</div>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: C.white, textAlign: "center" }}>
          Session 2 Complete!
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 1.5 }}>
          You learned the Traffic Light Method and locked in your first swap commitment.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 22, width: "100%" }}>
          {[
            { value: "+50", label: "⚡ XP Earned" },
            { value: `🔥 ${streak + 1}`, label: "Day Streak" },
            { value: "2/20", label: "Sessions Done" },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 16,
              padding: "14px 8px", textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.white, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 5 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Learnings */}
        <div style={{
          width: "100%", background: "rgba(255,255,255,0.12)",
          borderRadius: 18, padding: "16px", marginBottom: 14,
        }}>
          <h3 style={{ margin: "0 0 11px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 0.4 }}>
            Today's takeaways
          </h3>
          {[
            "🚦 Traffic Light method for food choices",
            "🍽️ MyPlate balanced plate framework",
            "🔄 Your weekly swap is set",
          ].map((item, i) => (
            <p key={i} style={{ margin: "0 0 7px", fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.4 }}>
              {item}
            </p>
          ))}
        </div>

        {/* Next session */}
        <div style={{
          width: "100%", background: "rgba(255,255,255,0.12)",
          borderRadius: 18, padding: "13px 16px", marginBottom: 22,
          display: "flex", gap: 12, alignItems: "center",
        }}>
          <span style={{ fontSize: 28 }}>⏰</span>
          <div>
            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>Up Next</p>
            <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700, color: C.white }}>Session 3: Healthy Routines</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>with your Behavioral Coach · +50 XP</p>
          </div>
        </div>

        <button
          onClick={onHome}
          style={{
            width: "100%", padding: "16px",
            background: C.coral, color: C.white,
            border: "none", borderRadius: 17,
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          }}
        >
          Back to Journey Map
        </button>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function BloomPathApp() {
  const [screen, setScreen]   = useState("journey");
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});

  const streak = 7;
  const xp     = 320;

  const screenBg = screen === "complete" ? C.teal : screen === "lesson" ? C.white : C.cream;

  return (
    <div style={{
      background: C.bg, minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "64px 20px 24px",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* Screen switcher */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { id: "journey",  label: "📍 Journey Map"   },
          { id: "lesson",   label: "📖 Active Lesson" },
          { id: "complete", label: "🎉 Completion"    },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => { setScreen(s.id); setStep(0); setAnswers({}); }}
            style={{
              padding: "8px 18px", borderRadius: 22,
              border: "none", cursor: "pointer",
              background: screen === s.id ? C.coral : "rgba(255,255,255,0.1)",
              color: C.white, fontSize: 13, fontWeight: 600,
              transition: "all 0.15s",
            }}
          >{s.label}</button>
        ))}
      </div>

      {/* Phone frame */}
      <div style={{
        width: 390, height: 780,
        background: screenBg,
        borderRadius: 52,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.08)",
        border: "10px solid #1a2030",
      }}>
        {screen === "journey"  && <JourneyScreen  streak={streak} xp={xp} onStart={() => setScreen("lesson")} />}
        {screen === "lesson"   && <LessonScreen   step={step} setStep={setStep} answers={answers} setAnswers={setAnswers} onComplete={() => setScreen("complete")} />}
        {screen === "complete" && <CompleteScreen streak={streak} xp={xp} onHome={() => setScreen("journey")} />}
      </div>

      <p style={{ color: "rgba(255,255,255,0.2)", marginTop: 18, fontSize: 11, letterSpacing: 0.3 }}>
        BloomPath Health · Patient App · Session Experience Mockup
      </p>
    </div>
  );
}
