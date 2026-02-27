import { C } from '../constants/colors';
import { COLOR_META } from '../constants/demo';

export default function ConfirmCard({ food, color, meal, onMealChange, meals, onConfirm, onReset, resetLabel }) {
  const m = COLOR_META[color];
  const foodEmoji = color==='green' ? '🥦' : color==='yellow' ? '🍊' : '🍕';
  return (
    <div>
      <div style={{background:m.bg,borderRadius:14,padding:'14px',marginBottom:12,
        border:`1.5px solid ${m.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:11,color:m.textColor,fontWeight:600,marginBottom:4}}>
            {color==='green' ? '🟢' : color==='yellow' ? '🟡' : '🔴'} {m.label}
          </div>
          <div style={{fontSize:16,fontWeight:800,color:C.slate}}>{food}</div>
          <div style={{fontSize:11,color:m.textColor,marginTop:2}}>{m.sub}</div>
        </div>
        <div style={{fontSize:36}}>{foodEmoji}</div>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:8,fontWeight:600}}>Which meal?</div>
      <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
        {meals.map(ml => (
          <div key={ml} onClick={() => onMealChange(ml)}
            style={{padding:'7px 14px',borderRadius:99,cursor:'pointer',fontSize:12,
              fontWeight:meal===ml ? 700 : 500,
              background:meal===ml ? C.tealLight : C.grayLight,
              color:meal===ml ? C.teal : C.gray,
              border:meal===ml ? `1.5px solid ${C.teal}` : '1.5px solid transparent'}}>
            {ml}
          </div>
        ))}
      </div>
      <button onClick={onConfirm}
        style={{width:'100%',padding:'13px',borderRadius:12,marginBottom:8,
          background:`linear-gradient(135deg,${C.teal},${C.tealDark})`,
          color:C.white,fontWeight:700,fontSize:14,border:'none',cursor:'pointer',
          boxShadow:`0 4px 12px rgba(0,95,115,.3)`}}>
        ✓ Log This Food
      </button>
      <button onClick={onReset}
        style={{width:'100%',padding:'10px',borderRadius:12,background:C.grayLight,
          color:C.gray,fontWeight:600,fontSize:12,border:'none',cursor:'pointer'}}>
        {resetLabel}
      </button>
    </div>
  );
}
