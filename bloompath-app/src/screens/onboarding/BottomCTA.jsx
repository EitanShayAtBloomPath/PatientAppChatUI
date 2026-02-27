import { C } from '../../constants/colors';

export default function BottomCTA({ label, onNext, onBack, disabled }) {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0,
      padding:'12px 22px 28px',
      background:'linear-gradient(to top, rgba(253,251,247,1) 65%, transparent)' }}>
      <div style={{ display:'flex', gap:10 }}>
        {onBack && (
          <button onClick={onBack} style={{ width:50, padding:'15px', borderRadius:15,
            border:'2px solid #E0E0E6', background:C.white,
            fontSize:18, cursor:'pointer', flexShrink:0, color:C.gray }}>←</button>
        )}
        <button onClick={onNext} disabled={disabled} style={{ flex:1, padding:'15px',
          background: disabled ? '#CCC' : C.coral, color:C.white,
          border:'none', borderRadius:15, fontSize:15, fontWeight:700,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: disabled ? 'none' : '0 5px 18px rgba(255,140,118,0.4)' }}>
          {label}
        </button>
      </div>
    </div>
  );
}
