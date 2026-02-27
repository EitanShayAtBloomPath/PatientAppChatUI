import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

export default function Step01HowItWorks({ onNext, onBack }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={1} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Here's how BloomPath works
        </h2>
        <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          A structured, evidence-based program aligned with AAP pediatric care guidelines.
        </p>
        {[
          { emoji:'📅', title:'20 structured sessions', desc:'Guided by your RD, Behavioral Coach, and physician across 6–12 months.', bg:C.coralLight, tc:C.coral },
          { emoji:'👨‍👩‍👧', title:'The whole family participates', desc:'Parents are active partners in care — not passive observers. This program is built for families.', bg:C.tealLight, tc:C.teal },
          { emoji:'🌱', title:'No shame. No diets. No guilt.', desc:'We use positive framing and focus on building lasting, joyful health habits.', bg:C.greenLight, tc:C.greenDark },
          { emoji:'📱', title:'Virtual + async tools', desc:'Telehealth sessions, goal tracking, meal logging, and coaching check-ins — all here.', bg:C.yellowLight, tc:'#8B6914' },
        ].map((c, i) => (
          <div key={i} style={{ background:c.bg, borderRadius:18, padding:'16px',
            marginBottom:12, display:'flex', gap:14, alignItems:'flex-start' }}>
            <div style={{ width:44, height:44, borderRadius:14,
              background:'rgba(255,255,255,0.6)', display:'flex',
              alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
              {c.emoji}
            </div>
            <div>
              <p style={{ margin:'0 0 4px', fontSize:15, fontWeight:700, color:c.tc }}>{c.title}</p>
              <p style={{ margin:0, fontSize:13, color:C.slate, lineHeight:1.45 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <BottomCTA label="Sounds great →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
