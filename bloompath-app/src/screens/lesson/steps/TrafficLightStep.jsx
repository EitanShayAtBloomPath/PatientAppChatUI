import { C } from '../../../constants/colors';

const TIERS = [
  {
    dotColor:'#2D7A3E', bg:'#EAF6EB', border:'#A3D9A5',
    label:'🟢 Go Foods — Eat Freely',
    desc:'Vegetables, fruits, lean proteins, water. Fill most of your plate with these.',
    examples:['🥦','🍎','🐟','💧'],
    note:'Aim for half your plate!',
  },
  {
    dotColor:'#8B6914', bg:'#FDF3DB', border:'#F0D070',
    label:'🟡 Slow Foods — Eat Sometimes',
    desc:'Whole grains, dairy, and legumes. Nutritious, but in balanced portions.',
    examples:['🍞','🧀','🫘','🥛'],
    note:'About a quarter of your plate.',
  },
  {
    dotColor:'#B03020', bg:'#FDEAEA', border:'#EFA8A0',
    label:'🔴 Whoa Foods — Eat Less Often',
    desc:'Fried foods, sugary drinks, candy, and chips. Small amounts, less often.',
    examples:['🍟','🥤','🍰','🍬'],
    note:'A treat, not a staple.',
  },
];

export default function TrafficLightStep() {
  return (
    <div style={{ paddingTop:6 }}>
      <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
        The Go/Slow/Whoa Method
      </h2>
      <p style={{ margin:'0 0 20px', fontSize:14, color:C.gray, lineHeight:1.5 }}>
        Instead of "good" or "bad" foods, we think about how <em>often</em> to eat them.
        No food is forbidden — it's about balance.
      </p>

      {TIERS.map((tier, i) => (
        <div key={i} style={{ background:tier.bg, border:`1.5px solid ${tier.border}`,
          borderRadius:18, padding:'14px 16px', marginBottom:12 }}>
          <p style={{ margin:'0 0 5px', fontSize:14, fontWeight:700, color:tier.dotColor }}>{tier.label}</p>
          <p style={{ margin:'0 0 10px', fontSize:13, color:'#444', lineHeight:1.45 }}>{tier.desc}</p>
          <div style={{ display:'flex', gap:10, marginBottom:10 }}>
            {tier.examples.map((e, j) => <span key={j} style={{ fontSize:22 }}>{e}</span>)}
          </div>
          <div style={{ background:'rgba(255,255,255,0.65)', borderRadius:9, padding:'5px 10px' }}>
            <span style={{ fontSize:12, color:tier.dotColor, fontWeight:600 }}>💡 {tier.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
