import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';

export default function Step12AllSet({ data, onComplete }) {
  const child  = data.childName       || 'your family';
  const parent = data.parentFirstName || 'there';
  return (
    <div style={{ height:'100%', background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'20px 26px', overflowY:'auto', textAlign:'center' }}>

        <div style={{ fontSize:70, marginBottom:14 }}>🌱</div>
        <h1 style={{ margin:'0 0 8px', fontSize:28, fontWeight:800, color:C.white }}>
          Welcome to BloomPath{child !== 'your family' ? `, ${child}` : ''}!
        </h1>
        <p style={{ margin:'0 0 28px', fontSize:15, color:'rgba(255,255,255,0.7)', lineHeight:1.65 }}>
          Your profile is set up and your care team has been notified. You're ready to begin.
        </p>

        {/* Session 1 card */}
        <div style={{ width:'100%', background:'rgba(255,255,255,0.14)', borderRadius:20,
          padding:'18px 20px', marginBottom:14, backdropFilter:'blur(10px)', textAlign:'left' }}>
          <p style={{ margin:'0 0 4px', fontSize:11, color:'rgba(255,255,255,0.5)',
            fontWeight:700, textTransform:'uppercase', letterSpacing:0.5 }}>Your first session</p>
          <p style={{ margin:'0 0 4px', fontSize:18, fontWeight:800, color:C.white }}>
            Session 1: Welcome & Intake
          </p>
          <p style={{ margin:'0 0 12px', fontSize:13, color:'rgba(255,255,255,0.65)' }}>
            MD/NP + Registered Dietitian · 75–90 min
          </p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[
              { icon:'📅', label:'Scheduling soon' },
              { icon:'📱', label:'Virtual telehealth' },
              { icon:'⚡', label:'+50 XP on completion' },
            ].map((tag, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5,
                background:'rgba(255,255,255,0.14)', borderRadius:10, padding:'5px 10px' }}>
                <span style={{ fontSize:12 }}>{tag.icon}</span>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div style={{ width:'100%', background:'rgba(255,255,255,0.1)', borderRadius:18,
          padding:'16px', marginBottom:26, textAlign:'left' }}>
          <p style={{ margin:'0 0 12px', fontSize:12, fontWeight:700,
            color:'rgba(255,255,255,0.7)', textTransform:'uppercase', letterSpacing:0.5 }}>
            What happens next
          </p>
          {[
            { emoji:'✉️', text:`${parent}, check your email for login details and Session 1 prep materials` },
            { emoji:'📋', text:"Your care team will review your family's full profile before your first session" },
            { emoji:'🗺️', text:'Explore your Path Map and get a feel for the app' },
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', gap:10, marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ fontSize:17, flexShrink:0 }}>{item.emoji}</span>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.82)', lineHeight:1.45 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onComplete} style={{ width:'100%', padding:'16px',
          background:C.coral, color:C.white, border:'none', borderRadius:17,
          fontSize:16, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 24px rgba(0,0,0,0.3)' }}>
          Go to My Path 🗺️
        </button>
      </div>
    </div>
  );
}
