import { C } from '../constants/colors';

export default function StatusBar({ dark }) {
  const fg = dark ? 'rgba(255,255,255,0.85)' : C.slate;
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'14px 26px 6px', position:'relative', flexShrink:0 }}>
      <span style={{ fontSize:15, fontWeight:700, color:fg }}>9:41</span>
      <div style={{ width:120, height:32,
        background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.85)',
        borderRadius:20, position:'absolute', left:'50%', transform:'translateX(-50%)' }} />
      <div style={{ display:'flex', gap:4, alignItems:'center' }}>
        {[9,7,5,3].map((h,i) => (
          <div key={i} style={{ width:3, height:h, background:fg, borderRadius:1.5, opacity:i<3?1:0.4 }} />
        ))}
        <div style={{ width:3 }} />
        <div style={{ width:22, height:11, border:`1.5px solid ${fg}`, borderRadius:3,
          position:'relative', display:'flex', alignItems:'center', padding:'1px 1.5px' }}>
          <div style={{ width:'75%', height:'100%', background:fg, borderRadius:1.5 }} />
          <div style={{ position:'absolute', right:-4, top:'50%', transform:'translateY(-50%)',
            width:3, height:6, background:fg, borderRadius:'0 1px 1px 0', opacity:0.5 }} />
        </div>
      </div>
    </div>
  );
}
