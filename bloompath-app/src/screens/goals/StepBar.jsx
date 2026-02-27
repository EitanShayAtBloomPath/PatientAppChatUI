import { C } from '../../constants/colors';

const TOTAL = 7;

export default function StepBar({ step }) {
  return (
    <div style={{ padding:'6px 22px 14px', background:C.white, flexShrink:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontSize:13, fontWeight:700, color:C.teal }}>🎯 Smart Goals</span>
        <div style={{ display:'flex', gap:5 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{ width: i === step ? 18 : 7, height:7, borderRadius:4,
              background: i < step ? C.teal : i === step ? C.coral : '#DDD',
              transition:'all 0.2s' }} />
          ))}
        </div>
      </div>
      <div style={{ height:5, background:C.grayLight, borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${(step / (TOTAL - 1)) * 100}%`, background:C.coral,
          borderRadius:3, transition:'width 0.4s ease' }} />
      </div>
    </div>
  );
}
