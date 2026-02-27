import { useState } from "react";

// ── Color System ──────────────────────────────────────────────────────────────
const C = {
  coral:       '#FF8C76',
  coralLight:  '#FFF0ED',
  coralDark:   '#D96B57',
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
  purpleLight: '#F0ECFA',
  bg:          '#0F1923',
};

const TOTAL = 7;

// ── Goal Data ─────────────────────────────────────────────────────────────────
const NUTRITION_GOALS = [
  { id:"n1", emoji:"💧", text:"Replace one sugary drink with water each day",       rdNote:"Sugary drinks are the single highest-impact swap for metabolic health." },
  { id:"n2", emoji:"🥦", text:"Eat at least one green food at every dinner",         rdNote:"Adding vegetables before other foods naturally reduces overall intake." },
  { id:"n3", emoji:"🍎", text:"Bring a healthy snack from home to school, 3× a week", rdNote:"School environments have limited healthy options — planning ahead helps." },
];

const ACTIVITY_GOALS = [
  { id:"a1", emoji:"🚶", text:"Take a 15-minute walk after school",                     rdNote:"Even 15 minutes of low-intensity movement improves insulin sensitivity." },
  { id:"a2", emoji:"👨‍👩‍👧", text:"Do a fun physical activity together as a family",    rdNote:"Family activity builds motivation and makes movement feel social, not clinical." },
  { id:"a3", emoji:"💃", text:"Do 30 minutes of movement I actually enjoy",             rdNote:"Intrinsic enjoyment is the strongest predictor of long-term activity." },
];

const FREQUENCIES = [
  { label:"Every day", short:"daily"     },
  { label:"5× / week", short:"5×/week"  },
  { label:"4× / week", short:"4×/week"  },
  { label:"3× / week", short:"3×/week"  },
  { label:"2× / week", short:"2×/week"  },
  { label:"Once / week", short:"1×/week" },
];

const CONFIDENCE = [
  { emoji:"😬", label:"Not sure",  val:1 },
  { emoji:"😐", label:"Maybe",     val:2 },
  { emoji:"🙂", label:"Think so",  val:3 },
  { emoji:"😊", label:"Probably",  val:4 },
  { emoji:"💪", label:"Totally!",  val:5 },
];

// ── Shared Components ─────────────────────────────────────────────────────────
function StatusBar({ dark }) {
  const fg = dark ? "rgba(255,255,255,0.85)" : C.slate;
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"14px 26px 6px", position:"relative", flexShrink:0 }}>
      <span style={{ fontSize:15, fontWeight:700, color:fg }}>9:41</span>
      <div style={{ width:120, height:32, background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.85)",
        borderRadius:20, position:"absolute", left:"50%", transform:"translateX(-50%)" }} />
      <div style={{ display:"flex", gap:4, alignItems:"center" }}>
        {[9,7,5,3].map((h,i) => <div key={i} style={{ width:3, height:h, background:fg, borderRadius:1.5, opacity:i<3?1:0.4 }} />)}
        <div style={{ width:3 }} />
        <div style={{ width:22, height:11, border:`1.5px solid ${fg}`, borderRadius:3, position:"relative", display:"flex", alignItems:"center", padding:"1px 1.5px" }}>
          <div style={{ width:"75%", height:"100%", background:fg, borderRadius:1.5 }} />
          <div style={{ position:"absolute", right:-4, top:"50%", transform:"translateY(-50%)", width:3, height:6, background:fg, borderRadius:"0 1px 1px 0", opacity:0.5 }} />
        </div>
      </div>
    </div>
  );
}

function StepBar({ step }) {
  return (
    <div style={{ padding:"6px 22px 14px", background:C.white, flexShrink:0 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ fontSize:13, fontWeight:700, color:C.teal }}>🎯 Smart Goals</span>
        <div style={{ display:"flex", gap:5 }}>
          {Array.from({ length: TOTAL }).map((_,i) => (
            <div key={i} style={{ width: i===step ? 18 : 7, height:7, borderRadius:4,
              background: i<step ? C.teal : i===step ? C.coral : "#DDD",
              transition:"all 0.2s" }} />
          ))}
        </div>
      </div>
      <div style={{ height:5, background:C.grayLight, borderRadius:3, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(step/(TOTAL-1))*100}%`, background:C.coral,
          borderRadius:3, transition:"width 0.4s ease" }} />
      </div>
    </div>
  );
}

function BottomCTA({ label, onNext, onBack, disabled, secondary }) {
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0,
      padding:"12px 22px 28px",
      background:"linear-gradient(to top, rgba(253,251,247,1) 65%, transparent)" }}>
      <div style={{ display:"flex", gap:10 }}>
        {onBack && (
          <button onClick={onBack} style={{ width:50, padding:"14px", borderRadius:15,
            border:"2px solid #E0E0E6", background:C.white,
            fontSize:18, cursor:"pointer", flexShrink:0, color:C.gray }}>←</button>
        )}
        <button onClick={onNext} disabled={!!disabled} style={{
          flex:1, padding:"15px",
          background: disabled ? "#D8D8D8" : C.coral, color:C.white,
          border:"none", borderRadius:15, fontSize:15, fontWeight:700,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 5px 18px rgba(255,140,118,0.4)",
          transition:"all 0.2s" }}>
          {label}
        </button>
      </div>
      {secondary && (
        <button onClick={secondary.fn} style={{ width:"100%", marginTop:10, padding:"12px",
          background:"transparent", border:"none", color:C.gray,
          fontSize:13, cursor:"pointer", fontWeight:500 }}>
          {secondary.label}
        </button>
      )}
    </div>
  );
}

function RdAvatar({ name, note }) {
  return (
    <div style={{ display:"flex", gap:12, padding:"14px 16px",
      background:C.tealLight, borderRadius:16, alignItems:"flex-start" }}>
      <div style={{ width:38, height:38, borderRadius:19, background:C.teal, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🥗</div>
      <div>
        <p style={{ margin:"0 0 3px", fontSize:11, fontWeight:700, color:C.teal,
          textTransform:"uppercase", letterSpacing:0.4 }}>Your RD · {name}</p>
        <p style={{ margin:0, fontSize:13, color:C.tealDark, lineHeight:1.5 }}>"{note}"</p>
      </div>
    </div>
  );
}

// ── Screen 0: Intro ───────────────────────────────────────────────────────────
function GoalsIntroScreen({ childName, onNext }) {
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <StepBar step={0} />
      <div style={{ flex:1, overflowY:"auto", padding:"8px 24px 110px" }}>

        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
          borderRadius:24, padding:"24px 20px", marginBottom:22, textAlign:"center" }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🎯</div>
          <h2 style={{ margin:"0 0 8px", fontSize:24, fontWeight:800, color:C.white }}>
            Goal time, {childName}!
          </h2>
          <p style={{ margin:0, fontSize:14, color:"rgba(255,255,255,0.75)", lineHeight:1.55 }}>
            Your RD reviewed Session 2 and prepared goal suggestions just for your family.
          </p>
        </div>

        {/* RD note */}
        <RdAvatar name="Your Registered Dietitian" note={`${childName}, I've looked at your session notes and your family's goals. I've prepared two goal suggestions — you'll pick the ones that feel right and make them your own.`} />

        <div style={{ height:18 }} />

        {/* Preview of goals (teased) */}
        <p style={{ margin:"0 0 12px", fontSize:14, fontWeight:700, color:C.slate }}>
          You'll set 2 goals today:
        </p>
        {[
          { cat:"🥗 Nutrition Goal", desc:"A food habit to practice before Session 3",     bg:C.tealLight,   tc:C.teal   },
          { cat:"🏃 Activity Goal",  desc:"A movement habit to build energy and momentum", bg:C.coralLight,  tc:C.coral  },
        ].map((g,i) => (
          <div key={i} style={{ background:g.bg, borderRadius:16, padding:"14px 16px",
            marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:22, background:"rgba(255,255,255,0.6)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
              {g.cat.split(" ")[0]}
            </div>
            <div>
              <p style={{ margin:"0 0 3px", fontSize:13, fontWeight:700, color:g.tc }}>{g.cat}</p>
              <p style={{ margin:0, fontSize:12, color:C.gray }}>{g.desc}</p>
            </div>
            <span style={{ marginLeft:"auto", fontSize:18, color:"rgba(0,0,0,0.2)" }}>🔒</span>
          </div>
        ))}

        <div style={{ marginTop:16, padding:"12px 14px", background:C.greenLight, borderRadius:13, display:"flex", gap:10 }}>
          <span style={{ fontSize:16 }}>💡</span>
          <p style={{ margin:0, fontSize:12, color:C.greenDark, lineHeight:1.5 }}>
            Goals are set collaboratively — your RD suggests, you choose. You'll check in on both goals every day until Session 3.
          </p>
        </div>
      </div>
      <BottomCTA label="Let's set my goals →" onNext={onNext} />
    </div>
  );
}

// ── Screen 1 & 3: Goal Selection ──────────────────────────────────────────────
function GoalSelectScreen({ step, category, goals, rdContext, selected, onSelect, onNext, onBack }) {
  const catInfo = category === "nutrition"
    ? { label:"🥗 Nutrition Goal", color:C.teal, light:C.tealLight }
    : { label:"🏃 Activity Goal",  color:C.coral, light:C.coralLight };

  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <StepBar step={step} />
      <div style={{ flex:1, overflowY:"auto", padding:"8px 24px 110px" }}>

        {/* Category header */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:6,
          background:catInfo.light, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
          <span style={{ fontSize:12, fontWeight:700, color:catInfo.color }}>{catInfo.label}</span>
        </div>

        <h2 style={{ margin:"0 0 6px", fontSize:24, fontWeight:800, color:C.teal }}>
          Choose your goal
        </h2>
        <p style={{ margin:"0 0 8px", fontSize:14, color:C.gray, lineHeight:1.5 }}>
          Your RD suggested these based on Session 2. Pick the one that feels right, or write your own.
        </p>

        <div style={{ marginBottom:16 }}>
          <RdAvatar name="Your RD" note={rdContext} />
        </div>

        {/* Goal cards */}
        {goals.map((goal, i) => {
          const isSelected = selected?.id === goal.id;
          const isExp = expanded === goal.id;
          return (
            <div key={goal.id} style={{ marginBottom:10 }}>
              <div
                onClick={() => onSelect(goal)}
                style={{
                  background: isSelected ? catInfo.light : C.white,
                  border: `2px solid ${isSelected ? catInfo.color : "#E0E0E6"}`,
                  borderRadius:18, padding:"16px", cursor:"pointer",
                  transition:"all 0.15s",
                  boxShadow: isSelected ? `0 4px 18px ${catInfo.color}30` : "none",
                }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  {/* Emoji + radio */}
                  <div style={{ width:46, height:46, borderRadius:23, flexShrink:0,
                    background: isSelected ? catInfo.color : C.grayLight,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                    {goal.emoji}
                  </div>

                  <div style={{ flex:1 }}>
                    <p style={{ margin:"0 0 4px", fontSize:15, fontWeight:600,
                      color: isSelected ? catInfo.color : C.slate, lineHeight:1.35 }}>
                      {goal.text}
                    </p>
                    <button
                      onClick={e => { e.stopPropagation(); setExpanded(isExp ? null : goal.id); }}
                      style={{ background:"none", border:"none", padding:0,
                        fontSize:12, color:C.gray, cursor:"pointer", fontWeight:500 }}>
                      {isExp ? "Hide reason ▲" : "Why this goal? ▼"}
                    </button>
                    {isExp && (
                      <p style={{ margin:"6px 0 0", fontSize:12, color:C.teal,
                        lineHeight:1.5, fontStyle:"italic" }}>
                        💬 "{goal.rdNote}"
                      </p>
                    )}
                  </div>

                  {/* Radio circle */}
                  <div style={{ width:24, height:24, borderRadius:12, flexShrink:0,
                    border: `2.5px solid ${isSelected ? catInfo.color : "#D0D0D0"}`,
                    background: isSelected ? catInfo.color : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
                    {isSelected && <span style={{ color:C.white, fontSize:13, fontWeight:700 }}>✓</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Write your own */}
        <div style={{ borderRadius:16, border:"2px dashed #D0D0D8",
          padding:"14px 16px", background:"transparent", textAlign:"center", cursor:"pointer" }}>
          <span style={{ fontSize:14, color:C.gray, fontWeight:500 }}>
            ✏️  Write your own goal
          </span>
        </div>
      </div>

      <BottomCTA label="Personalize this goal →" onNext={onNext} onBack={onBack}
        disabled={!selected} />
    </div>
  );
}

// ── Screen 2 & 4: Goal Customization ─────────────────────────────────────────
function GoalCustomizeScreen({ step, category, goal, freq, confidence, onFreq, onConf, onNext, onBack }) {
  if (!goal) return null;
  const catInfo = category === "nutrition"
    ? { color:C.teal, light:C.tealLight, label:"🥗 Nutrition Goal" }
    : { color:C.coral, light:C.coralLight, label:"🏃 Activity Goal" };

  const freqShort = freq ? FREQUENCIES.find(f=>f.label===freq)?.short : null;
  const confItem  = confidence ? CONFIDENCE.find(c=>c.val===confidence) : null;
  const previewReady = freqShort && confItem;

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <StepBar step={step} />
      <div style={{ flex:1, overflowY:"auto", padding:"8px 24px 110px" }}>

        <div style={{ display:"inline-flex", alignItems:"center", gap:6,
          background:catInfo.light, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
          <span style={{ fontSize:12, fontWeight:700, color:catInfo.color }}>{catInfo.label}</span>
        </div>

        <h2 style={{ margin:"0 0 6px", fontSize:24, fontWeight:800, color:C.teal }}>
          Make it yours
        </h2>
        <p style={{ margin:"0 0 20px", fontSize:14, color:C.gray }}>
          Personalize the details so it fits your life.
        </p>

        {/* Selected goal card */}
        <div style={{ background:catInfo.light, border:`1.5px solid ${catInfo.color}`,
          borderRadius:18, padding:"14px 16px", marginBottom:22,
          display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:26 }}>{goal.emoji}</span>
          <p style={{ margin:0, fontSize:14, fontWeight:600, color:catInfo.color, lineHeight:1.4, flex:1 }}>
            {goal.text}
          </p>
        </div>

        {/* Frequency */}
        <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:C.slate }}>
          How often?
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
          {FREQUENCIES.map(f => {
            const sel = freq === f.label;
            return (
              <button key={f.label} onClick={() => onFreq(f.label)} style={{
                padding:"9px 16px", borderRadius:20,
                border:`2px solid ${sel ? catInfo.color : "#E0E0E6"}`,
                background: sel ? catInfo.color : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Confidence */}
        <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:C.slate }}>
          How confident do you feel about this?
        </p>
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {CONFIDENCE.map(c => {
            const sel = confidence === c.val;
            return (
              <button key={c.val} onClick={() => onConf(c.val)} style={{
                flex:1, padding:"10px 4px", borderRadius:14,
                border:`2px solid ${sel ? catInfo.color : "#E0E0E6"}`,
                background: sel ? catInfo.light : C.white,
                cursor:"pointer", transition:"all 0.15s",
                display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                <span style={{ fontSize:22 }}>{c.emoji}</span>
                <span style={{ fontSize:10, color: sel ? catInfo.color : C.gray,
                  fontWeight: sel ? 700 : 500, lineHeight:1.2, textAlign:"center" }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* SMART Goal Preview */}
        <div style={{ borderRadius:18, overflow:"hidden",
          border: `1.5px solid ${previewReady ? catInfo.color : "#E0E0E6"}`,
          transition:"all 0.3s" }}>
          <div style={{ padding:"8px 14px", background: previewReady ? catInfo.color : "#F0F0F4" }}>
            <span style={{ fontSize:11, fontWeight:700,
              color: previewReady ? C.white : C.gray,
              textTransform:"uppercase", letterSpacing:0.5 }}>
              {previewReady ? "✓ Your SMART goal" : "Your SMART goal preview"}
            </span>
          </div>
          <div style={{ padding:"14px 16px", background: previewReady ? catInfo.light : C.grayLight }}>
            {previewReady ? (
              <>
                <p style={{ margin:"0 0 10px", fontSize:15, fontWeight:600, color:catInfo.color, lineHeight:1.5 }}>
                  "{goal.text}, {freqShort}."
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:18 }}>{confItem.emoji}</span>
                  <span style={{ fontSize:13, color:C.gray }}>
                    Confidence: <strong style={{ color:catInfo.color }}>{confItem.label}</strong>
                  </span>
                  <span style={{ marginLeft:"auto", fontSize:12, fontWeight:700,
                    color:C.greenDark, background:C.greenLight,
                    padding:"3px 8px", borderRadius:8 }}>+15 XP/week</span>
                </div>
              </>
            ) : (
              <p style={{ margin:0, fontSize:13, color:"#ADADB5", fontStyle:"italic" }}>
                Select frequency and confidence to preview your full goal…
              </p>
            )}
          </div>
        </div>

        {/* Streak preview */}
        {previewReady && (
          <div style={{ marginTop:14, padding:"12px 14px", background:C.white,
            borderRadius:14, border:"1.5px solid #E8E8EE", display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:20 }}>🔥</span>
            <div>
              <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:700, color:C.slate }}>Daily streak starts today</p>
              <p style={{ margin:0, fontSize:12, color:C.gray }}>
                Check in each day to build your streak and earn XP.
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomCTA
        label={step === 2 ? "Set activity goal →" : "Review my goals →"}
        onNext={onNext} onBack={onBack}
        disabled={!previewReady} />
    </div>
  );
}

// ── Screen 5: Review ──────────────────────────────────────────────────────────
function GoalReviewScreen({ goals, onNext, onBack }) {
  const [agreed, setAgreed] = useState(false);

  const getInfo = cat => cat === "nutrition"
    ? { color:C.teal, light:C.tealLight, label:"🥗 Nutrition Goal" }
    : { color:C.coral, light:C.coralLight, label:"🏃 Activity Goal" };

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar />
      <StepBar step={5} />
      <div style={{ flex:1, overflowY:"auto", padding:"8px 24px 110px" }}>

        <h2 style={{ margin:"0 0 6px", fontSize:26, fontWeight:800, color:C.teal }}>
          Your 2 goals 🎯
        </h2>
        <p style={{ margin:"0 0 20px", fontSize:14, color:C.gray, lineHeight:1.5 }}>
          These will run until Session 3 (in ~2 weeks). Check in daily to keep your streak.
        </p>

        {goals.map((g, i) => {
          if (!g.goal) return null;
          const info = getInfo(g.category);
          const freqShort = g.freq ? FREQUENCIES.find(f=>f.label===g.freq)?.short : "";
          const confItem  = g.confidence ? CONFIDENCE.find(c=>c.val===g.confidence) : null;
          return (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${info.color}`,
              borderRadius:20, overflow:"hidden", marginBottom:14,
              boxShadow:`0 4px 20px ${info.color}20` }}>

              {/* Card header */}
              <div style={{ background:info.color, padding:"10px 16px",
                display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.white }}>{info.label}</span>
                <span style={{ marginLeft:"auto", fontSize:11, fontWeight:600,
                  color:"rgba(255,255,255,0.75)" }}>Goal {i+1} of 2</span>
              </div>

              <div style={{ padding:"16px" }}>
                {/* Goal text */}
                <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"flex-start" }}>
                  <span style={{ fontSize:26, flexShrink:0 }}>{g.goal.emoji}</span>
                  <p style={{ margin:0, fontSize:15, fontWeight:600, color:C.slate, lineHeight:1.4 }}>
                    "{g.goal.text}, {freqShort}."
                  </p>
                </div>

                {/* Meta row */}
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <Tag icon="🔁" label={g.freq || "—"} color={info.color} />
                  <Tag icon={confItem?.emoji||"?"} label={`Confidence: ${confItem?.label||"—"}`} color={info.color} />
                  <Tag icon="⚡" label="+15 XP/week" color={C.teal} />
                </div>

                {/* Week rings */}
                <div style={{ marginTop:14 }}>
                  <p style={{ margin:"0 0 8px", fontSize:12, color:C.gray, fontWeight:600 }}>
                    Weekly check-in tracker:
                  </p>
                  <div style={{ display:"flex", gap:8 }}>
                    {["M","T","W","T","F","S","S"].map((d,j) => (
                      <div key={j} style={{ flex:1, display:"flex", flexDirection:"column",
                        alignItems:"center", gap:4 }}>
                        <div style={{ width:32, height:32, borderRadius:16,
                          background: j===0 ? info.color : C.grayLight,
                          border:`2px solid ${j===0 ? info.color : "#E0E0E6"}`,
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {j===0 && <span style={{ color:C.white, fontSize:14, fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize:10, color:j===0 ? info.color : C.gray, fontWeight:600 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* RD sign-off */}
        <RdAvatar name="Your Registered Dietitian"
          note="These goals look great. I'll review your check-in data before Session 3 and we'll celebrate your wins together." />

        <div style={{ height:14 }} />

        {/* Commitment check */}
        <div
          onClick={() => setAgreed(a => !a)}
          style={{ display:"flex", gap:12, alignItems:"center", padding:"14px 16px",
            background: agreed ? C.greenLight : C.white,
            border:`2px solid ${agreed ? C.greenDark : "#E0E0E6"}`,
            borderRadius:16, cursor:"pointer", transition:"all 0.15s" }}>
          <div style={{ width:26, height:26, borderRadius:7, flexShrink:0,
            border:`2.5px solid ${agreed ? C.greenDark : "#D0D0D0"}`,
            background: agreed ? C.greenDark : "transparent",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {agreed && <span style={{ color:C.white, fontSize:14, fontWeight:700 }}>✓</span>}
          </div>
          <p style={{ margin:0, fontSize:14, color: agreed ? C.greenDark : C.slate,
            fontWeight: agreed ? 600 : 400, lineHeight:1.4 }}>
            I commit to checking in on both goals each day until Session 3.
          </p>
        </div>
      </div>

      <BottomCTA label="🔒 Lock In My Goals" onNext={onNext} onBack={onBack} disabled={!agreed} />
    </div>
  );
}

function Tag({ icon, label, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, background:C.grayLight,
      borderRadius:10, padding:"4px 10px" }}>
      <span style={{ fontSize:13 }}>{icon}</span>
      <span style={{ fontSize:12, color, fontWeight:600 }}>{label}</span>
    </div>
  );
}

// ── Screen 6: Goals Set Celebration ──────────────────────────────────────────
function GoalsSetScreen({ goals, childName }) {
  const [checkedIn, setCheckedIn] = useState([false, false]);

  const doCheck = i => {
    setCheckedIn(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const getInfo = cat => cat === "nutrition"
    ? { color:C.teal, light:C.tealLight }
    : { color:C.coral, light:C.coralLight };

  const allDone = checkedIn[0] && checkedIn[1];

  return (
    <div style={{ height:"100%", background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <StatusBar dark />
      <div style={{ flex:1, overflowY:"auto", padding:"16px 24px 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🎯</div>
          <h1 style={{ margin:"0 0 8px", fontSize:26, fontWeight:800, color:C.white }}>
            Goals locked in, {childName}!
          </h1>
          <p style={{ margin:0, fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>
            2 smart goals are now active. Check in daily to earn XP and build your streak.
          </p>
        </div>

        {/* XP + streak stats */}
        <div style={{ display:"flex", gap:12, marginBottom:20 }}>
          {[
            { value:"🔥 0",  label:"Day streak",     sub:"Starts today" },
            { value:"+30 ⚡", label:"XP per week",   sub:"If you hit both" },
            { value:"2/20",  label:"Sessions done",  sub:"Nice progress!" },
          ].map((s,i) => (
            <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.14)",
              borderRadius:16, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:C.white, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:4 }}>{s.label}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Daily check-in preview */}
        <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:20,
          padding:"16px 18px", marginBottom:14 }}>
          <p style={{ margin:"0 0 14px", fontSize:13, fontWeight:700,
            color:"rgba(255,255,255,0.8)", textTransform:"uppercase", letterSpacing:0.5 }}>
            🌅 Today's first check-in
          </p>
          {goals.map((g, i) => {
            if (!g.goal) return null;
            const info = getInfo(g.category);
            const checked = checkedIn[i];
            return (
              <div key={i}
                onClick={() => doCheck(i)}
                style={{
                  display:"flex", alignItems:"center", gap:12,
                  padding:"13px 14px", borderRadius:16, marginBottom: i===0 ? 10 : 0,
                  background: checked ? info.color : "rgba(255,255,255,0.1)",
                  border:`1.5px solid ${checked ? info.color : "rgba(255,255,255,0.2)"}`,
                  cursor:"pointer", transition:"all 0.2s" }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{g.goal.emoji}</span>
                <p style={{ margin:0, fontSize:13, fontWeight:500,
                  color: checked ? C.white : "rgba(255,255,255,0.85)",
                  flex:1, lineHeight:1.4,
                  textDecoration: checked ? "line-through" : "none" }}>
                  {g.goal.text}
                </p>
                <div style={{ width:28, height:28, borderRadius:14, flexShrink:0,
                  border:`2px solid ${checked ? C.white : "rgba(255,255,255,0.35)"}`,
                  background: checked ? "rgba(255,255,255,0.3)" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {checked && <span style={{ color:C.white, fontSize:14, fontWeight:700 }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Streak ignited */}
        {allDone && (
          <div style={{ background:"rgba(255,140,118,0.25)", borderRadius:16,
            border:"1.5px solid rgba(255,140,118,0.5)",
            padding:"13px 16px", marginBottom:14,
            display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:28 }}>🔥</span>
            <div>
              <p style={{ margin:"0 0 2px", fontSize:14, fontWeight:800, color:C.white }}>Streak started!</p>
              <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.7)" }}>
                Day 1 ✓ — come back tomorrow to keep it going.
              </p>
            </div>
          </div>
        )}

        {/* Until session 3 */}
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:16,
          padding:"13px 16px", marginBottom:20, display:"flex", gap:10 }}>
          <span style={{ fontSize:20 }}>📅</span>
          <div>
            <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.9)" }}>
              Session 3 in ~14 days
            </p>
            <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.6)" }}>
              Your RD will review your check-in data before that session.
            </p>
          </div>
        </div>

        <button style={{ width:"100%", padding:"16px",
          background:C.coral, color:C.white, border:"none", borderRadius:17,
          fontSize:16, fontWeight:700, cursor:"pointer",
          boxShadow:"0 6px 24px rgba(0,0,0,0.3)" }}>
          View My Journey Map 🗺️
        </button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function SmartGoalsApp() {
  const [step, setStep] = useState(0);

  const [goalState, setGoalState] = useState([
    // Goal 1 — nutrition
    { category:"nutrition", goal: NUTRITION_GOALS[0], freq:"Every day",  confidence:4 },
    // Goal 2 — activity
    { category:"activity",  goal: ACTIVITY_GOALS[0],  freq:"4× / week", confidence:3 },
  ]);

  const childName = "Maya";

  const next = () => setStep(s => Math.min(s+1, TOTAL-1));
  const back = () => setStep(s => Math.max(s-1, 0));

  const setGoal  = (i, goal)  => setGoalState(gs => { const n=[...gs]; n[i]={...n[i], goal};  return n; });
  const setFreq  = (i, freq)  => setGoalState(gs => { const n=[...gs]; n[i]={...n[i], freq};  return n; });
  const setConf  = (i, conf)  => setGoalState(gs => { const n=[...gs]; n[i]={...n[i], confidence:conf}; return n; });

  const phoneBg = step === 6 ? C.teal : C.cream;

  return (
    <div style={{
      background: C.bg, minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"72px 20px 28px",
      fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* Step nav */}
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:14, flexWrap:"wrap", justifyContent:"center" }}>
        {[
          "Intro","Pick nutrition","Customize","Pick activity","Customize","Review","🎉 Done"
        ].map((label,i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding:"5px 12px", borderRadius:16, border:"none", cursor:"pointer",
            background: step===i ? C.coral : i<step ? "rgba(255,140,118,0.3)" : "rgba(255,255,255,0.1)",
            color: step===i ? C.white : i<step ? C.coral : "rgba(255,255,255,0.4)",
            fontSize:11, fontWeight:600, transition:"all 0.2s",
            outline: step===i ? `2px solid ${C.coral}` : "none", outlineOffset:2 }}>
            {label}
          </button>
        ))}
      </div>

      {/* Phone */}
      <div style={{
        width:390, height:780, background:phoneBg, borderRadius:52,
        overflow:"hidden", position:"relative",
        boxShadow:"0 40px 100px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.07)",
        border:"10px solid #1a2030",
      }}>
        {step === 0 && (
          <GoalsIntroScreen childName={childName} onNext={next} />
        )}
        {step === 1 && (
          <GoalSelectScreen
            step={1} category="nutrition"
            goals={NUTRITION_GOALS}
            rdContext="Based on Session 2, the most impactful first step is usually a drink swap. But pick the goal that feels most doable for your family."
            selected={goalState[0].goal}
            onSelect={g => setGoal(0, g)}
            onNext={next} onBack={back} />
        )}
        {step === 2 && (
          <GoalCustomizeScreen
            step={2} category="nutrition"
            goal={goalState[0].goal}
            freq={goalState[0].freq}
            confidence={goalState[0].confidence}
            onFreq={f => setFreq(0, f)}
            onConf={c => setConf(0, c)}
            onNext={next} onBack={back} />
        )}
        {step === 3 && (
          <GoalSelectScreen
            step={3} category="activity"
            goals={ACTIVITY_GOALS}
            rdContext="For activity goals, consistency matters more than intensity. A short daily walk beats a long gym session once a week."
            selected={goalState[1].goal}
            onSelect={g => setGoal(1, g)}
            onNext={next} onBack={back} />
        )}
        {step === 4 && (
          <GoalCustomizeScreen
            step={4} category="activity"
            goal={goalState[1].goal}
            freq={goalState[1].freq}
            confidence={goalState[1].confidence}
            onFreq={f => setFreq(1, f)}
            onConf={c => setConf(1, c)}
            onNext={next} onBack={back} />
        )}
        {step === 5 && (
          <GoalReviewScreen goals={goalState} onNext={next} onBack={back} />
        )}
        {step === 6 && (
          <GoalsSetScreen goals={goalState} childName={childName} />
        )}
      </div>

      <p style={{ color:"rgba(255,255,255,0.2)", marginTop:18, fontSize:11 }}>
        BloomPath Health · Smart Goals Flow · {
          step===0 ? "Intro" : step===1||step===3 ? "Goal Selection" :
          step===2||step===4 ? "Customization" : step===5 ? "Review" : "Celebration"
        }
      </p>
    </div>
  );
}
