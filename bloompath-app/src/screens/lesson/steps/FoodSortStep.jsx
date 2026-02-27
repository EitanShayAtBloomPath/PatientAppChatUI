import { C } from '../../../constants/colors';

const FOODS = [
  { id:1, name:'Apple',             emoji:'🍎', correct:'green'  },
  { id:2, name:'Soda',              emoji:'🥤', correct:'red'    },
  { id:3, name:'Yogurt',            emoji:'🫙', correct:'yellow' },
  { id:4, name:'French Fries',      emoji:'🍟', correct:'red'    },
  { id:5, name:'Broccoli',          emoji:'🥦', correct:'green'  },
  { id:6, name:'Whole Grain Bread', emoji:'🍞', correct:'yellow' },
];

const BTNS = [
  { key:'green',  label:'🟢 Go',   activeBg:'#2D7A3E', inactiveBg:'#EAF6EB', color:'#2D7A3E' },
  { key:'yellow', label:'🟡 Slow', activeBg:'#8B6914', inactiveBg:'#FDF3DB', color:'#8B6914' },
  { key:'red',    label:'🔴 Whoa', activeBg:'#B03020', inactiveBg:'#FDEAEA', color:'#B03020' },
];

export default function FoodSortStep({ answers, setAnswers }) {
  const attempted = Object.keys(answers).length;
  const correct   = Object.keys(answers).filter(id => answers[id] === FOODS.find(f => f.id === +id)?.correct).length;

  return (
    <div style={{ paddingTop:6 }}>
      <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
        Sort These Foods 🚦
      </h2>
      <p style={{ margin:'0 0 4px', fontSize:14, color:C.gray }}>
        Tap the right category for each food using what you just learned.
      </p>

      {attempted > 0 ? (
        <div style={{ display:'flex', alignItems:'center', gap:10,
          background:C.greenLight, borderRadius:12, padding:'8px 12px', marginBottom:16 }}>
          <span style={{ fontSize:16 }}>⭐</span>
          <span style={{ fontSize:13, fontWeight:700, color:C.greenDark }}>
            {correct}/{attempted} correct so far
          </span>
        </div>
      ) : (
        <div style={{ height:16 }} />
      )}

      {FOODS.map(food => {
        const selected  = answers[food.id];
        const isCorrect = selected === food.correct;
        return (
          <div key={food.id} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7 }}>
              <span style={{ fontSize:26 }}>{food.emoji}</span>
              <span style={{ fontSize:16, fontWeight:600, color:C.slate }}>{food.name}</span>
              {selected && (
                <span style={{ marginLeft:'auto', fontSize:18 }}>
                  {isCorrect ? '✅' : '❌'}
                </span>
              )}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {BTNS.map(btn => {
                const isSel = selected === btn.key;
                return (
                  <button key={btn.key}
                    onClick={() => setAnswers(prev => ({ ...prev, [food.id]: btn.key }))}
                    style={{ flex:1, padding:'9px 4px',
                      background: isSel ? btn.activeBg : btn.inactiveBg,
                      color: isSel ? C.white : btn.color,
                      border:'none', borderRadius:11,
                      fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.15s',
                      boxShadow: isSel ? '0 2px 8px rgba(0,0,0,0.15)' : 'none' }}>
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
