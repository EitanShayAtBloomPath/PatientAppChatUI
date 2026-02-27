import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import FormField from '../FormField';
import BottomCTA from '../BottomCTA';

export default function Step02ParentAccount({ data, setData, onNext, onBack }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={2} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Let's set up your account
        </h2>
        <p style={{ margin:'0 0 24px', fontSize:15, color:C.gray }}>
          You'll be the primary contact for your child's care team.
        </p>

        <FormField label="Your first name" icon="👤" value={data.parentFirstName || ''} placeholder="e.g. Sarah"    onChange={v => setData(p => ({ ...p, parentFirstName: v }))} />
        <FormField label="Your last name"  icon="👤" value={data.parentLastName  || ''} placeholder="e.g. Johnson"  onChange={v => setData(p => ({ ...p, parentLastName: v }))} />
        <FormField label="Email address"   icon="✉️" value={data.email           || ''} placeholder="you@email.com" type="email" onChange={v => setData(p => ({ ...p, email: v }))} />

        <p style={{ margin:'4px 0 10px', fontSize:14, fontWeight:700, color:C.slate }}>
          Your relationship to the child
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
          {['Parent', 'Guardian', 'Caregiver', 'Grandparent'].map(r => (
            <button key={r} onClick={() => setData(p => ({ ...p, relationship: r }))} style={{
              padding:'9px 16px', borderRadius:20,
              border:`2px solid ${data.relationship === r ? C.teal : '#E0E0E6'}`,
              background: data.relationship === r ? C.teal : C.white,
              color: data.relationship === r ? C.white : C.slate,
              fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ padding:'12px 14px', background:C.tealLight, borderRadius:13,
          display:'flex', gap:10, alignItems:'flex-start' }}>
          <span style={{ fontSize:18, flexShrink:0 }}>🔒</span>
          <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.45 }}>
            Your information is stored securely in compliance with HIPAA. We'll never sell or share your data.
            {/* TODO: HIPAA — ensure all form data routes to HIPAA-compliant backend */}
          </p>
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
