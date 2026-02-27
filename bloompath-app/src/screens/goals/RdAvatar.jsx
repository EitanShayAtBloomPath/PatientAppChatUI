import { C } from '../../constants/colors';

export default function RdAvatar({ name, note }) {
  return (
    <div style={{ display:'flex', gap:12, padding:'14px 16px',
      background:C.tealLight, borderRadius:16, alignItems:'flex-start' }}>
      <div style={{ width:38, height:38, borderRadius:19, background:C.teal, flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🥗</div>
      <div>
        <p style={{ margin:'0 0 3px', fontSize:11, fontWeight:700, color:C.teal,
          textTransform:'uppercase', letterSpacing:0.4 }}>Your RD · {name}</p>
        <p style={{ margin:0, fontSize:13, color:C.tealDark, lineHeight:1.5 }}>"{note}"</p>
      </div>
    </div>
  );
}
