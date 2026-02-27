import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

const ACTIVITIES = [
  { id:'biking',   emoji:'🚴', label:'Biking'   },
  { id:'swimming', emoji:'🏊', label:'Swimming' },
  { id:'dancing',  emoji:'💃', label:'Dancing'  },
  { id:'sports',   emoji:'⚽', label:'Sports'   },
  { id:'hiking',   emoji:'🥾', label:'Hiking'   },
  { id:'cooking',  emoji:'👨‍🍳', label:'Cooking' },
  { id:'music',    emoji:'🎵', label:'Music'    },
  { id:'art',      emoji:'🎨', label:'Art'      },
  { id:'walking',  emoji:'🚶', label:'Walking'  },
  { id:'yoga',     emoji:'🧘', label:'Yoga'     },
];

const FAV_FOODS = [
  { id:'pizza',   emoji:'🍕', label:'Pizza'   },
  { id:'tacos',   emoji:'🌮', label:'Tacos'   },
  { id:'pasta',   emoji:'🍝', label:'Pasta'   },
  { id:'fruit',   emoji:'🍓', label:'Fruit'   },
  { id:'veggies', emoji:'🥦', label:'Veggies' },
  { id:'chicken', emoji:'🍗', label:'Chicken' },
  { id:'eggs',    emoji:'🍳', label:'Eggs'    },
  { id:'rice',    emoji:'🍚', label:'Rice'    },
  { id:'sushi',   emoji:'🍱', label:'Sushi'   },
  { id:'soup',    emoji:'🍲', label:'Soups'   },
];

export default function Step08ChildPreferences({ data, setData, onNext, onBack }) {
  const child = data.childName || 'you';
  const selA = data.activities || [];
  const selF = data.favFoods || [];

  const toggleA = id => setData(p => {
    const c = p.activities || [];
    return { ...p, activities: c.includes(id) ? c.filter(a => a !== id) : [...c, id] };
  });
  const toggleF = id => setData(p => {
    const c = p.favFoods || [];
    return { ...p, favFoods: c.includes(id) ? c.filter(f => f !== id) : [...c, id] };
  });

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={8} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          Hi {child}! 👋
        </h2>
        <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          Tell us a bit about yourself so we can make BloomPath feel like yours.
        </p>

        <h3 style={{ margin:'0 0 12px', fontSize:15, fontWeight:700, color:C.slate }}>
          Activities you enjoy 🏃
        </h3>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
          {ACTIVITIES.map(act => {
            const sel = selA.includes(act.id);
            return (
              <button key={act.id} onClick={() => toggleA(act.id)} style={{
                display:'flex', alignItems:'center', gap:6, padding:'8px 14px',
                borderRadius:20, border:`2px solid ${sel ? C.coral : '#E0E0E6'}`,
                background: sel ? C.coral : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                <span style={{ fontSize:16 }}>{act.emoji}</span>{act.label}
              </button>
            );
          })}
        </div>

        <h3 style={{ margin:'0 0 12px', fontSize:15, fontWeight:700, color:C.slate }}>
          Foods you love 😋
        </h3>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
          {FAV_FOODS.map(food => {
            const sel = selF.includes(food.id);
            return (
              <button key={food.id} onClick={() => toggleF(food.id)} style={{
                display:'flex', alignItems:'center', gap:6, padding:'8px 14px',
                borderRadius:20, border:`2px solid ${sel ? C.teal : '#E0E0E6'}`,
                background: sel ? C.teal : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                <span style={{ fontSize:16 }}>{food.emoji}</span>{food.label}
              </button>
            );
          })}
        </div>

        {(selA.length > 0 || selF.length > 0) && (
          <div style={{ padding:'12px 14px', background:C.greenLight, borderRadius:13, display:'flex', gap:10 }}>
            <span style={{ fontSize:16 }}>✨</span>
            <p style={{ margin:0, fontSize:12, color:C.greenDark, lineHeight:1.5 }}>
              Your RD will use your food preferences to suggest swaps that feel familiar and doable — not foreign.
            </p>
          </div>
        )}
      </div>
      <BottomCTA label="Continue →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
