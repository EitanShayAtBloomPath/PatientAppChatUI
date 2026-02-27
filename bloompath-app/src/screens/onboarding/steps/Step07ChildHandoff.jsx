import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';

export default function Step07ChildHandoff({ data, onNext, onBack }) {
  const child = data.childName || 'your child';
  return (
    <div style={{ height:'100%',
      background:`linear-gradient(160deg, ${C.purple}, ${C.purpleDark})`,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'20px 32px', textAlign:'center' }}>

        <div style={{ fontSize:72, marginBottom:18 }}>📱</div>

        <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:800, color:C.white }}>
          Pass the phone to {child}!
        </h2>
        <p style={{ margin:'0 0 32px', fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.65 }}>
          Now let's set up {child}'s personal space. They'll pick their interests,
          favorite foods, and tell us a little about themselves.
        </p>

        <div style={{ width:'100%', background:'rgba(255,255,255,0.12)', borderRadius:20,
          padding:'18px 20px', marginBottom:32, backdropFilter:'blur(10px)' }}>
          <p style={{ margin:'0 0 14px', fontSize:13, fontWeight:700,
            color:'rgba(255,255,255,0.75)', textAlign:'left' }}>
            {child} will:
          </p>
          {[
            { icon:'🏃', text:'Choose activities they enjoy' },
            { icon:'🍎', text:'Tell us their favorite foods' },
            { icon:'🌟', text:'Set their first health goal' },
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ fontSize:18 }}>{item.icon}</span>
              <span style={{ fontSize:14, color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onNext} style={{ width:'100%', maxWidth:320, padding:'16px',
          background:C.coral, color:C.white, border:'none', borderRadius:17,
          fontSize:16, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 24px rgba(0,0,0,0.3)' }}>
          Hi, I'm {child}! 👋
        </button>

        <button onClick={onBack} style={{ marginTop:14, background:'none', border:'none',
          color:'rgba(255,255,255,0.45)', fontSize:13, cursor:'pointer' }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
