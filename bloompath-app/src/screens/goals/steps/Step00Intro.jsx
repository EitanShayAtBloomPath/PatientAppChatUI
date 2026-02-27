import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import StepBar from '../StepBar';
import RdAvatar from '../RdAvatar';
import BottomCTA from '../BottomCTA';

export default function Step00Intro({ childName, onNext }) {
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <StepBar step={0} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 24px 110px' }}>

        <div style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
          borderRadius:24, padding:'24px 20px', marginBottom:22, textAlign:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🎯</div>
          <h2 style={{ margin:'0 0 8px', fontSize:24, fontWeight:800, color:C.white }}>
            Goal time, {childName}!
          </h2>
          <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,0.75)', lineHeight:1.55 }}>
            Your RD reviewed your last session and prepared goal suggestions just for your family.
          </p>
        </div>

        <RdAvatar name="Your Registered Dietitian"
          note={`${childName}, I've looked at your session notes and your family's goals. I've prepared two goal suggestions — you'll pick the ones that feel right and make them your own.`} />

        <div style={{ height:18 }} />

        <p style={{ margin:'0 0 12px', fontSize:14, fontWeight:700, color:C.slate }}>
          You'll set 2 goals today:
        </p>
        {[
          { cat:'🥗 Nutrition Goal', desc:'A food habit to practice before Session 3',     bg:C.tealLight,  tc:C.teal  },
          { cat:'🏃 Activity Goal',  desc:'A movement habit to build energy and momentum', bg:C.coralLight, tc:C.coral },
        ].map((g, i) => (
          <div key={i} style={{ background:g.bg, borderRadius:16, padding:'14px 16px',
            marginBottom:10, display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:22, background:'rgba(255,255,255,0.6)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
              {g.cat.split(' ')[0]}
            </div>
            <div>
              <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:g.tc }}>{g.cat}</p>
              <p style={{ margin:0, fontSize:12, color:C.gray }}>{g.desc}</p>
            </div>
            <span style={{ marginLeft:'auto', fontSize:18, color:'rgba(0,0,0,0.2)' }}>🔒</span>
          </div>
        ))}

        <div style={{ marginTop:16, padding:'12px 14px', background:C.greenLight, borderRadius:13, display:'flex', gap:10 }}>
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
