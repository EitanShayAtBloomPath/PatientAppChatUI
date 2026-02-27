import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

const GOALS = [
  { id:'energy',     label:'More energy',             emoji:'⚡' },
  { id:'sleep',      label:'Better sleep',            emoji:'😴' },
  { id:'confidence', label:'Feel confident',          emoji:'💪' },
  { id:'variety',    label:'Eat more variety',        emoji:'🥗' },
  { id:'active',     label:'Be more active',          emoji:'🏃' },
  { id:'health',     label:'Reduce health risks',     emoji:'❤️' },
  { id:'family',     label:'Healthy habits together', emoji:'👨‍👩‍👧' },
  { id:'stress',     label:'Manage stress',           emoji:'🧘' },
];

export default function Step05Goals({ data, setData, onNext, onBack }) {
  const goals = data.goals || [];
  const toggle = id => setData(p => {
    const c = p.goals || [];
    return { ...p, goals: c.includes(id) ? c.filter(g => g !== id) : [...c, id] };
  });

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={5} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          What matters most to your family?
        </h2>
        <p style={{ margin:'0 0 6px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          Select everything that resonates. Your care team will use this to shape your care plan.
        </p>
        <p style={{ margin:'0 0 22px', fontSize:13, color:C.coral, fontWeight:600 }}>
          Pick as many as you like — there's no wrong answer here.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {GOALS.map(goal => {
            const sel = goals.includes(goal.id);
            return (
              <button key={goal.id} onClick={() => toggle(goal.id)} style={{
                padding:'14px 12px', borderRadius:16,
                border:`2px solid ${sel ? C.teal : '#E0E0E6'}`,
                background: sel ? C.tealLight : C.white,
                cursor:'pointer', transition:'all 0.15s',
                display:'flex', flexDirection:'column', alignItems:'flex-start', gap:6,
                boxShadow: sel ? '0 4px 14px rgba(0,95,115,0.15)' : 'none' }}>
                <span style={{ fontSize:24 }}>{goal.emoji}</span>
                <span style={{ fontSize:13, fontWeight:600, color: sel ? C.teal : C.slate,
                  textAlign:'left', lineHeight:1.3 }}>{goal.label}</span>
                {sel && (
                  <div style={{ width:20, height:20, borderRadius:10, background:C.teal,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ color:C.white, fontSize:11, fontWeight:700 }}>✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <BottomCTA
        label={`Continue${goals.length > 0 ? ` (${goals.length} selected)` : ''} →`}
        onNext={onNext} onBack={onBack} />
    </div>
  );
}
