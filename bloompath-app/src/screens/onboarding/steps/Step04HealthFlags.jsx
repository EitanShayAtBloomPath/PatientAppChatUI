import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

const FLAGS = [
  { id:'conditions',  icon:'🏥', label:'Any diagnosed medical conditions?',   sub:'e.g. diabetes, thyroid issues, PCOS' },
  { id:'medications', icon:'💊', label:'Takes any regular medications?',       sub:'Prescription or over-the-counter' },
  { id:'allergies',   icon:'⚠️', label:'Any food allergies or restrictions?',  sub:'Include intolerances or cultural/religious' },
  { id:'specialists', icon:'👨‍⚕️', label:'Currently seeing other specialists?', sub:'e.g. endocrinologist, therapist' },
];

export default function Step04HealthFlags({ data, setData, onNext, onBack }) {
  const fd = data.flags || {};
  const toggle = (id, val) => setData(p => ({ ...p, flags: { ...(p.flags || {}), [id]: val } }));

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={4} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Health basics
        </h2>
        <p style={{ margin:'0 0 6px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A few quick questions to help your care team prepare for Session 1.
        </p>
        <p style={{ margin:'0 0 22px', fontSize:13, color:C.coral, fontWeight:600 }}>
          ✨ No wrong answers — this gives your team a head start.
          {/* TODO: HIPAA — health flag data must be stored in HIPAA-compliant backend */}
        </p>
        {FLAGS.map(flag => (
          <div key={flag.id} style={{
            background:C.white, borderRadius:18, padding:'16px', marginBottom:12,
            border:`1.5px solid ${fd[flag.id] === true ? C.coral : '#E8E8EE'}` }}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:12 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{flag.icon}</span>
              <div>
                <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:700, color:C.slate }}>{flag.label}</p>
                <p style={{ margin:0, fontSize:12, color:C.gray }}>{flag.sub}</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {['Yes', 'No'].map(opt => {
                const active = fd[flag.id] === (opt === 'Yes');
                return (
                  <button key={opt} onClick={() => toggle(flag.id, opt === 'Yes')} style={{
                    flex:1, padding:'9px', borderRadius:11,
                    border:`2px solid ${active ? C.coral : '#E0E0E6'}`,
                    background: active ? C.coral : C.white,
                    color: active ? C.white : C.gray,
                    fontSize:14, fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ padding:'12px 14px', background:C.tealLight, borderRadius:13,
          display:'flex', gap:10, alignItems:'flex-start' }}>
          <span style={{ fontSize:16 }}>💡</span>
          <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.5 }}>
            Your MD/NP will review this before Session 1 and may follow up with more detailed questions.
          </p>
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
