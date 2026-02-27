import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';

export default function Step00Welcome({ onNext }) {
  return (
    <div style={{ height:'100%', background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'20px 32px', textAlign:'center' }}>

        <div style={{ width:84, height:84, borderRadius:26,
          background:'rgba(255,255,255,0.15)', backdropFilter:'blur(12px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:42, marginBottom:20, border:'1.5px solid rgba(255,255,255,0.2)' }}>
          🌿
        </div>

        <h1 style={{ margin:'0 0 4px', fontSize:38, fontWeight:900, color:C.white, letterSpacing:-0.5 }}>
          BloomPath
        </h1>
        <p style={{ margin:'0 0 8px', fontSize:16, fontWeight:600, color:C.green, letterSpacing:0.5 }}>
          HEALTH
        </p>
        <p style={{ margin:'0 0 36px', fontSize:16, color:'rgba(255,255,255,0.7)',
          lineHeight:1.6, maxWidth:270 }}>
          Evidence-based pediatric health care, built for your whole family.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', maxWidth:310, marginBottom:36 }}>
          {[
            { icon:'🏥', text:'Led by licensed clinicians (RD, MD, Coach)' },
            { icon:'👨‍👩‍👧', text:'Family-centered — parents are active partners' },
            { icon:'📱', text:'100% virtual, on your schedule' },
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12,
              background:'rgba(255,255,255,0.1)', borderRadius:14,
              padding:'11px 16px', backdropFilter:'blur(8px)' }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <span style={{ fontSize:14, color:'rgba(255,255,255,0.9)', fontWeight:500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onNext} style={{ width:'100%', maxWidth:320, padding:'17px',
          background:C.coral, color:C.white, border:'none', borderRadius:17,
          fontSize:17, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 24px rgba(255,140,118,0.45)' }}>
          Let's Get Started →
        </button>
        <p style={{ margin:'14px 0 0', fontSize:12, color:'rgba(255,255,255,0.35)' }}>
          Takes about 5 minutes · HIPAA compliant
        </p>
      </div>
    </div>
  );
}
