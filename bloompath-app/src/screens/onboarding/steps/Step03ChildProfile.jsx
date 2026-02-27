import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import FormField from '../FormField';
import BottomCTA from '../BottomCTA';

const GRADES = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'];

export default function Step03ChildProfile({ data, setData, onNext, onBack }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={3} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Tell us about your child
        </h2>
        <p style={{ margin:'0 0 24px', fontSize:15, color:C.gray }}>
          This helps us tailor their care plan and program experience.
        </p>

        <FormField label="Child's first name" icon="🧒" value={data.childName || ''} placeholder="e.g. Maya"
          onChange={v => setData(p => ({ ...p, childName: v }))} />

        <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:700, color:C.slate }}>Their age</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:22 }}>
          {[6,7,8,9,10,11,12,13,14,15,16,17].map(age => (
            <button key={age} onClick={() => setData(p => ({ ...p, childAge: age }))} style={{
              width:46, height:46, borderRadius:13,
              border:`2px solid ${data.childAge === age ? C.coral : '#E0E0E6'}`,
              background: data.childAge === age ? C.coral : C.white,
              color: data.childAge === age ? C.white : C.slate,
              fontSize:15, fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}>
              {age}
            </button>
          ))}
        </div>

        <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:700, color:C.slate }}>Current grade</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {GRADES.map(g => (
            <button key={g} onClick={() => setData(p => ({ ...p, childGrade: g }))} style={{
              padding:'8px 14px', borderRadius:12,
              border:`2px solid ${data.childGrade === g ? C.teal : '#E0E0E6'}`,
              background: data.childGrade === g ? C.teal : C.white,
              color: data.childGrade === g ? C.white : C.slate,
              fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
