import { useNavigate } from 'react-router-dom';
import { C } from '../../constants/colors';
import StatusBar from '../../components/StatusBar';
import { DEMO } from '../../constants/demo';

export default function CompleteScreen({ session }) {
  const navigate = useNavigate();

  return (
    <div style={{ height:'100%', background:C.teal,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />

      <div style={{ flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'16px 24px 24px', overflowY:'auto' }}>

        <div style={{ fontSize:68, marginBottom:12 }}>🎉</div>
        <h1 style={{ margin:'0 0 6px', fontSize:28, fontWeight:800, color:C.white, textAlign:'center' }}>
          Session {session.id} Complete!
        </h1>
        <p style={{ margin:'0 0 28px', fontSize:14, color:'rgba(255,255,255,0.7)',
          textAlign:'center', lineHeight:1.5 }}>
          {session.completionMsg}
        </p>

        {/* Stats */}
        <div style={{ display:'flex', gap:12, marginBottom:22, width:'100%' }}>
          {[
            { value:`+${session.xp}`,            label:'⚡ XP Earned'    },
            { value:`🔥 ${DEMO.streak + 1}`,      label:'Day Streak'      },
            { value:`${DEMO.sessionsDone + 1}/20`, label:'Sessions Done'  },
          ].map((stat, i) => (
            <div key={i} style={{ flex:1, background:'rgba(255,255,255,0.15)', borderRadius:16,
              padding:'14px 8px', textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:800, color:C.white, lineHeight:1 }}>{stat.value}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', marginTop:5 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Takeaways */}
        <div style={{ width:'100%', background:'rgba(255,255,255,0.12)',
          borderRadius:18, padding:'16px', marginBottom:14 }}>
          <h3 style={{ margin:'0 0 11px', fontSize:13, fontWeight:700,
            color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:0.4 }}>
            Today's takeaways
          </h3>
          {session.takeaways.map((item, i) => (
            <p key={i} style={{ margin:'0 0 7px', fontSize:13,
              color:'rgba(255,255,255,0.9)', lineHeight:1.4 }}>
              {item}
            </p>
          ))}
        </div>

        {/* Next session */}
        {session.nextSession && (
          <div style={{ width:'100%', background:'rgba(255,255,255,0.12)',
            borderRadius:18, padding:'13px 16px', marginBottom:22,
            display:'flex', gap:12, alignItems:'center' }}>
            <span style={{ fontSize:28 }}>{session.nextSession.emoji}</span>
            <div>
              <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.55)',
                fontWeight:700, textTransform:'uppercase', letterSpacing:0.4 }}>Up Next</p>
              <p style={{ margin:'2px 0 0', fontSize:15, fontWeight:700, color:C.white }}>
                Session {session.nextSession.id}: {session.nextSession.title}
              </p>
              <p style={{ margin:'2px 0 0', fontSize:12, color:'rgba(255,255,255,0.6)' }}>
                with your {session.nextSession.provider} · +{session.nextSession.xp} XP
              </p>
            </div>
          </div>
        )}

        <button onClick={() => navigate('/journey')} style={{ width:'100%', padding:'16px',
          background:C.coral, color:C.white, border:'none', borderRadius:17,
          fontSize:16, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 24px rgba(0,0,0,0.25)' }}>
          Back to My Path
        </button>
      </div>
    </div>
  );
}
