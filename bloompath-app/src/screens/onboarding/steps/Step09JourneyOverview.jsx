import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

const PHASES = [
  { num:1, phase:'Intensive',      months:'Months 1–3',  sessions:'Sessions 1–12', hours:'~16–20 hrs',
    desc:'Weekly sessions building core skills in nutrition, activity, and behavior.',
    bg:C.coralLight, border:C.coral, tc:C.coral },
  { num:2, phase:'Maintenance',    months:'Months 4–6',  sessions:'Sessions 13–20', hours:'~10–12 hrs',
    desc:'Biweekly sessions reinforcing habits and building relapse resilience.',
    bg:C.tealLight, border:C.teal, tc:C.teal },
  { num:3, phase:'Long-term Care', months:'Months 7–12', sessions:'Optional', hours:'~12–16 hrs',
    desc:'Monthly check-ins for families who want continued clinical support.',
    bg:C.greenLight, border:C.green, tc:C.greenDark },
];

export default function Step09JourneyOverview({ onNext, onBack }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={9} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Your 12-month path 🗺️
        </h2>
        <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A structured program that adapts to your family's pace across three phases.
        </p>
        {PHASES.map((ph, i) => (
          <div key={i} style={{ background:ph.bg, border:`1.5px solid ${ph.border}`,
            borderRadius:18, padding:'16px', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:28, height:28, borderRadius:14, background:ph.border,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:C.white, fontSize:14, fontWeight:800 }}>{ph.num}</span>
              </div>
              <span style={{ fontSize:15, fontWeight:800, color:ph.tc }}>Phase {ph.num}: {ph.phase}</span>
              <span style={{ fontSize:11, color:C.gray, marginLeft:4 }}>{ph.months}</span>
            </div>
            <div style={{ display:'flex', gap:8, marginBottom:10 }}>
              {[ph.sessions, ph.hours].map((tag, j) => (
                <span key={j} style={{ fontSize:11, fontWeight:700, color:ph.tc,
                  background:'rgba(255,255,255,0.65)', padding:'3px 9px', borderRadius:8 }}>{tag}</span>
              ))}
            </div>
            <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{ph.desc}</p>
          </div>
        ))}
        <div style={{ background:C.teal, borderRadius:18, padding:'14px 16px', display:'flex', gap:10 }}>
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
