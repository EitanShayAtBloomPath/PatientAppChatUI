import { useState } from 'react';
import { C } from '../../../constants/colors';

const SWAPS = [
  { id:1, from:'🥤 Soda',              to:'💧 Water or sparkling water',   xp:'+15 XP' },
  { id:2, from:'🍟 Chips after school', to:'🍎 Apple with peanut butter',  xp:'+15 XP' },
  { id:3, from:'🧃 Juice',             to:'🥛 Low-fat milk',               xp:'+15 XP' },
  { id:4, from:'🍰 Dessert every night',to:'🍓 Fresh fruit',               xp:'+15 XP' },
];

export default function CommitmentStep() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ paddingTop:6 }}>
      <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
        Make One Swap 🔄
      </h2>
      <p style={{ margin:'0 0 6px', fontSize:14, color:C.gray, lineHeight:1.5 }}>
        Small changes add up. Pick ONE swap you'll try this week.
      </p>

      <div style={{ display:'flex', alignItems:'center', gap:6,
        background:C.coralLight, borderRadius:10, padding:'6px 12px',
        marginBottom:18, width:'fit-content' }}>
        <span style={{ fontSize:13 }}>🔥</span>
        <span style={{ fontSize:12, fontWeight:600, color:C.coral }}>
          Complete this to keep your streak!
        </span>
      </div>

      {SWAPS.map(swap => (
        <div key={swap.id} onClick={() => setSelected(swap.id)} style={{
          padding:'14px 16px', borderRadius:17, marginBottom:10, cursor:'pointer',
          border:`2px solid ${selected === swap.id ? C.coral : '#E5E5EA'}`,
          background: selected === swap.id ? C.coralLight : C.white,
          display:'flex', alignItems:'center', gap:12, transition:'all 0.15s',
          boxShadow: selected === swap.id ? '0 4px 16px rgba(255,140,118,0.2)' : 'none' }}>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:3 }}>
              <span style={{ fontSize:13, color:C.gray, textDecoration:'line-through' }}>{swap.from}</span>
              <span style={{ fontSize:13, color:C.gray }}>→</span>
              <span style={{ fontSize:13, color:C.slate, fontWeight:600 }}>{swap.to}</span>
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:C.coral }}>{swap.xp}</span>
          </div>
          <div style={{ width:26, height:26, borderRadius:13, flexShrink:0,
            border:`2.5px solid ${selected === swap.id ? C.coral : '#D0D0D0'}`,
            background: selected === swap.id ? C.coral : 'transparent',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            {selected === swap.id && <span style={{ color:C.white, fontSize:13, fontWeight:700 }}>✓</span>}
          </div>
        </div>
      ))}

      {selected && (
        <div style={{ marginTop:14, padding:'13px 16px',
          background:C.greenLight, borderRadius:13,
          border:`1.5px solid ${C.green}`,
          display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:22 }}>🎯</span>
          <div>
            <p style={{ margin:0, fontSize:13, fontWeight:700, color:C.greenDark }}>Commitment locked in!</p>
            <p style={{ margin:'2px 0 0', fontSize:12, color:C.greenDark }}>
              Your RD will check in on this next session.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
