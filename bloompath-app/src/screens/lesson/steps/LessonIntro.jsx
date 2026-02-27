import { C } from '../../../constants/colors';

export default function LessonIntro({ session }) {
  return (
    <div style={{ paddingTop:6 }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:6,
        background:C.coralLight, borderRadius:20, padding:'5px 13px', marginBottom:14 }}>
        <span style={{ fontSize:12, fontWeight:700, color:C.coral }}>
          Session {session.id} · {session.provider}
        </span>
      </div>

      <h2 style={{ margin:'0 0 8px', fontSize:26, fontWeight:800, color:C.teal, lineHeight:1.2 }}>
        {session.title}
      </h2>
      <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
        {session.intro}
      </p>

      <div style={{ height:148, background:`linear-gradient(135deg, ${C.yellow}, ${C.green})`,
        borderRadius:20, marginBottom:22,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:60 }}>
        {session.emoji}
      </div>

      <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:700, color:C.slate }}>
        What you'll learn:
      </h3>
      {session.learnings.map((item, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:12,
          padding:'10px 14px', background:C.cream, borderRadius:13, marginBottom:9 }}>
          <span style={{ fontSize:20 }}>{item.icon}</span>
          <span style={{ fontSize:14, color:C.slate, fontWeight:500 }}>{item.text}</span>
        </div>
      ))}

      <div style={{ display:'flex', gap:10, marginTop:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, background:C.tealLight, borderRadius:10, padding:'6px 12px' }}>
          <span style={{ fontSize:13 }}>⏱️</span>
          <span style={{ fontSize:12, color:C.teal, fontWeight:600 }}>~{session.mins} min session</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, background:C.coralLight, borderRadius:10, padding:'6px 12px' }}>
          <span style={{ fontSize:13 }}>⚡</span>
          <span style={{ fontSize:12, color:C.coral, fontWeight:600 }}>+{session.xp} XP on completion</span>
        </div>
      </div>
    </div>
  );
}
