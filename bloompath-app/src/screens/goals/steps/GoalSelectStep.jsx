import { useState } from 'react';
import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import StepBar from '../StepBar';
import RdAvatar from '../RdAvatar';
import BottomCTA from '../BottomCTA';
import { CAT_INFO } from '../goalData';

export default function GoalSelectStep({ step, category, goals, rdContext, selected, onSelect, onNext, onBack }) {
  const cat = CAT_INFO[category];
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <StepBar step={step} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 24px 110px' }}>

        <div style={{ display:'inline-flex', alignItems:'center', gap:6,
          background:cat.light, borderRadius:20, padding:'5px 14px', marginBottom:14 }}>
          <span style={{ fontSize:12, fontWeight:700, color:cat.color }}>{cat.label}</span>
        </div>

        <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
          Choose your goal
        </h2>
        <p style={{ margin:'0 0 8px', fontSize:14, color:C.gray, lineHeight:1.5 }}>
          Your RD suggested these based on your last session. Pick the one that feels right.
        </p>

        <div style={{ marginBottom:16 }}>
          <RdAvatar name="Your RD" note={rdContext} />
        </div>

        {goals.map(goal => {
          const isSel = selected?.id === goal.id;
          const isExp = expanded === goal.id;
          return (
            <div key={goal.id} style={{ marginBottom:10 }}>
              <div onClick={() => onSelect(goal)} style={{
                background: isSel ? cat.light : C.white,
                border:`2px solid ${isSel ? cat.color : '#E0E0E6'}`,
                borderRadius:18, padding:'16px', cursor:'pointer', transition:'all 0.15s',
                boxShadow: isSel ? `0 4px 18px ${cat.color}30` : 'none' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <div style={{ width:46, height:46, borderRadius:23, flexShrink:0,
                    background: isSel ? cat.color : C.grayLight,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                    {goal.emoji}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:'0 0 4px', fontSize:15, fontWeight:600,
                      color: isSel ? cat.color : C.slate, lineHeight:1.35 }}>
                      {goal.text}
                    </p>
                    <button
                      onClick={e => { e.stopPropagation(); setExpanded(isExp ? null : goal.id); }}
                      style={{ background:'none', border:'none', padding:0,
                        fontSize:12, color:C.gray, cursor:'pointer', fontWeight:500 }}>
                      {isExp ? 'Hide reason ▲' : 'Why this goal? ▼'}
                    </button>
                    {isExp && (
                      <p style={{ margin:'6px 0 0', fontSize:12, color:C.teal,
                        lineHeight:1.5, fontStyle:'italic' }}>
                        💬 "{goal.rdNote}"
                      </p>
                    )}
                  </div>
                  <div style={{ width:24, height:24, borderRadius:12, flexShrink:0,
                    border:`2.5px solid ${isSel ? cat.color : '#D0D0D0'}`,
                    background: isSel ? cat.color : 'transparent',
                    display:'flex', alignItems:'center', justifyContent:'center', marginTop:2 }}>
                    {isSel && <span style={{ color:C.white, fontSize:13, fontWeight:700 }}>✓</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ borderRadius:16, border:'2px dashed #D0D0D8',
          padding:'14px 16px', background:'transparent', textAlign:'center', cursor:'pointer' }}>
          <span style={{ fontSize:14, color:C.gray, fontWeight:500 }}>✏️  Write your own goal</span>
        </div>
      </div>

      <BottomCTA label="Personalize this goal →" onNext={onNext} onBack={onBack} disabled={!selected} />
    </div>
  );
}
