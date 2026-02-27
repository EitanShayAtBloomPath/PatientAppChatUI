import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

const TEAM = [
  { emoji:'👩‍⚕️', name:'Dr. Julia Nordgren', role:'Chief Medical Officer',
    detail:'Pediatric Lipid Specialist · Stanford Children\'s Health',
    bg:C.coralLight, tc:C.coral },
  { emoji:'🥗', name:'Your Registered Dietitian', role:'Nutrition Lead',
    detail:'Personalized meal planning · Traffic Light Method · Family nutrition coaching',
    bg:C.tealLight, tc:C.teal },
  { emoji:'🧠', name:'Your Behavioral Coach', role:'Behavioral Health',
    detail:'Habits, routines, stress, sleep & family behavior change',
    bg:C.yellowLight, tc:'#8B6914' },
];

export default function Step06CareTeam({ onNext, onBack }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={6} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Meet your care team
        </h2>
        <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          You'll work with a dedicated multidisciplinary team across all 20 sessions.
        </p>
        {TEAM.map((m, i) => (
          <div key={i} style={{ background:m.bg, borderRadius:20, padding:'18px', marginBottom:14 }}>
            <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:10 }}>
              <div style={{ width:52, height:52, borderRadius:26,
                background:'rgba(255,255,255,0.7)', display:'flex',
                alignItems:'center', justifyContent:'center', fontSize:26 }}>
                {m.emoji}
              </div>
              <div>
                <p style={{ margin:'0 0 2px', fontSize:15, fontWeight:700, color:m.tc }}>{m.name}</p>
                <p style={{ margin:0, fontSize:11, fontWeight:600, color:C.gray,
                  textTransform:'uppercase', letterSpacing:0.3 }}>{m.role}</p>
              </div>
            </div>
            <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{m.detail}</p>
          </div>
        ))}
        <div style={{ padding:'14px 16px', background:C.greenLight, borderRadius:16, display:'flex', gap:10 }}>
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
