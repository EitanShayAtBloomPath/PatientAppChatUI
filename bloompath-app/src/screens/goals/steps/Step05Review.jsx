import { useState } from 'react';
import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import StepBar from '../StepBar';
import RdAvatar from '../RdAvatar';
import BottomCTA from '../BottomCTA';
import { FREQUENCIES, CONFIDENCE, CAT_INFO } from '../goalData';

function Tag({ icon, label, color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:5, background:C.grayLight,
      borderRadius:10, padding:'4px 10px' }}>
      <span style={{ fontSize:13 }}>{icon}</span>
      <span style={{ fontSize:12, color, fontWeight:600 }}>{label}</span>
    </div>
  );
}

const DAYS = ['M','T','W','T','F','S','S'];

export default function Step05Review({ goals, onNext, onBack }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <StepBar step={5} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 24px 110px' }}>

        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Your 2 goals 🎯
        </h2>
        <p style={{ margin:'0 0 20px', fontSize:14, color:C.gray, lineHeight:1.5 }}>
          These will run until Session 3 (in ~2 weeks). Check in daily to keep your streak.
        </p>

        {goals.map((g, i) => {
          if (!g.goal) return null;
          const cat      = CAT_INFO[g.category];
          const freqShort = g.freq       ? FREQUENCIES.find(f => f.label === g.freq)?.short : '';
          const confItem  = g.confidence ? CONFIDENCE.find(c => c.val === g.confidence)    : null;
          return (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${cat.color}`,
              borderRadius:20, overflow:'hidden', marginBottom:14,
              boxShadow:`0 4px 20px ${cat.color}20` }}>

              <div style={{ background:cat.color, padding:'10px 16px',
                display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.white }}>{cat.label}</span>
                <span style={{ marginLeft:'auto', fontSize:11, fontWeight:600,
                  color:'rgba(255,255,255,0.75)' }}>Goal {i + 1} of 2</span>
              </div>

              <div style={{ padding:'16px' }}>
                <div style={{ display:'flex', gap:10, marginBottom:14, alignItems:'flex-start' }}>
                  <span style={{ fontSize:26, flexShrink:0 }}>{g.goal.emoji}</span>
                  <p style={{ margin:0, fontSize:15, fontWeight:600, color:C.slate, lineHeight:1.4 }}>
                    "{g.goal.text}, {freqShort}."
                  </p>
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Tag icon="🔁" label={g.freq || '—'}                          color={cat.color} />
                  <Tag icon={confItem?.emoji || '?'} label={`Confidence: ${confItem?.label || '—'}`} color={cat.color} />
                  <Tag icon="⚡" label="+15 XP/week"                            color={C.teal}    />
                </div>

                <div style={{ marginTop:14 }}>
                  <p style={{ margin:'0 0 8px', fontSize:12, color:C.gray, fontWeight:600 }}>
                    Weekly check-in tracker:
                  </p>
                  <div style={{ display:'flex', gap:8 }}>
                    {DAYS.map((d, j) => (
                      <div key={j} style={{ flex:1, display:'flex', flexDirection:'column',
                        alignItems:'center', gap:4 }}>
                        <div style={{ width:32, height:32, borderRadius:16,
                          background: j === 0 ? cat.color : C.grayLight,
                          border:`2px solid ${j === 0 ? cat.color : '#E0E0E6'}`,
                          display:'flex', alignItems:'center', justifyContent:'center' }}>
                          {j === 0 && <span style={{ color:C.white, fontSize:14, fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize:10, color: j === 0 ? cat.color : C.gray, fontWeight:600 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <RdAvatar name="Your Registered Dietitian"
          note="These goals look great. I'll review your check-in data before Session 3 and we'll celebrate your wins together." />

        <div style={{ height:14 }} />

        <div onClick={() => setAgreed(a => !a)}
          style={{ display:'flex', gap:12, alignItems:'center', padding:'14px 16px',
            background: agreed ? C.greenLight : C.white,
            border:`2px solid ${agreed ? C.greenDark : '#E0E0E6'}`,
            borderRadius:16, cursor:'pointer', transition:'all 0.15s' }}>
          <div style={{ width:26, height:26, borderRadius:7, flexShrink:0,
            border:`2.5px solid ${agreed ? C.greenDark : '#D0D0D0'}`,
            background: agreed ? C.greenDark : 'transparent',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
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
