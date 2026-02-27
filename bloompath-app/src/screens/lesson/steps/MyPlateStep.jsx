import { C } from '../../../constants/colors';

const QUADRANTS = [
  { label:'Vegetables', emoji:'🥦', bg:'#A3D9A5', textColor:'#1A5C24', top:0,    left:0     },
  { label:'Fruits',     emoji:'🍎', bg:'#FFB347', textColor:'#7A4B00', top:'50%', left:0     },
  { label:'Grains',     emoji:'🌾', bg:'#F0C070', textColor:'#7A4B00', top:0,     left:'50%' },
  { label:'Protein',    emoji:'🐟', bg:'#9FC5E8', textColor:'#1A3C5C', top:'50%', left:'50%' },
];

const TIPS = [
  'Fill HALF your plate with veggies and fruits',
  'Make at least HALF your grains whole grains',
  'Choose lean proteins: fish, chicken, beans',
];

export default function MyPlateStep() {
  return (
    <div style={{ paddingTop:6 }}>
      <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
        Build Your Plate 🍽️
      </h2>
      <p style={{ margin:'0 0 20px', fontSize:14, color:C.gray, lineHeight:1.5 }}>
        MyPlate is a simple visual guide — no calorie counting, no math.
      </p>

      {/* Plate */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
        <div style={{ width:210, height:210, borderRadius:'50%', overflow:'hidden',
          border:`4px solid ${C.teal}`,
          boxShadow:'0 8px 28px rgba(0,95,115,0.18)', position:'relative' }}>
          {QUADRANTS.map((q, i) => (
            <div key={i} style={{ position:'absolute', top:q.top, left:q.left,
              width:'50%', height:'50%', background:q.bg,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexDirection:'column', gap:3 }}>
              <span style={{ fontSize:22 }}>{q.emoji}</span>
              <span style={{ fontSize:10, fontWeight:700, color:q.textColor }}>{q.label}</span>
            </div>
          ))}
          {/* Dividers */}
          <div style={{ position:'absolute', top:'50%', left:0, right:0, height:3,
            background:C.white, transform:'translateY(-50%)' }} />
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:3,
            background:C.white, transform:'translateX(-50%)' }} />
        </div>
      </div>

      {/* Dairy */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8,
          background:'#DFF3FF', border:'2px solid #9FC5E8',
          borderRadius:12, padding:'8px 18px' }}>
          <span style={{ fontSize:20 }}>🥛</span>
          <span style={{ fontSize:13, fontWeight:600, color:'#1A3C5C' }}>+ Dairy on the side</span>
        </div>
      </div>

      {TIPS.map((tip, i) => (
        <div key={i} style={{ display:'flex', gap:10, marginBottom:9, padding:'10px 14px',
          background:C.greenLight, borderRadius:13, alignItems:'flex-start' }}>
          <span style={{ fontSize:16, flexShrink:0 }}>✅</span>
          <span style={{ fontSize:13, color:C.slate, fontWeight:500, lineHeight:1.4 }}>{tip}</span>
        </div>
      ))}
    </div>
  );
}
