import { C } from '../../constants/colors';

const TOTAL = 13;

const PHASES = [
  { label: 'Your Family',   screens: [0,1,2,3], emoji: '👨‍👩‍👧' },
  { label: 'Health Basics', screens: [4],        emoji: '🏥'    },
  { label: 'Your Goals',    screens: [5],        emoji: '🎯'    },
  { label: 'Care Team',     screens: [6],        emoji: '👩‍⚕️' },
  { label: 'Child Setup',   screens: [7,8],      emoji: '🧒'    },
  { label: 'Your Journey',  screens: [9],        emoji: '🗺️'   },
  { label: 'Baseline',      screens: [10,11],    emoji: '📸'    },
  { label: 'All Set!',      screens: [12],       emoji: '🎉'    },
];

function getPhase(step) {
  return PHASES.find(p => p.screens.includes(step)) || PHASES[0];
}

export default function PhaseBar({ step }) {
  const phase = getPhase(step);
  const pct = (step / (TOTAL - 1)) * 100;
  return (
    <div style={{ padding:'6px 22px 14px', background:C.white, flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:14 }}>{phase.emoji}</span>
          <span style={{ fontSize:13, fontWeight:700, color:C.teal }}>{phase.label}</span>
        </div>
        <span style={{ fontSize:12, color:C.gray }}>Step {step+1} of {TOTAL}</span>
      </div>
      <div style={{ height:6, background:C.grayLight, borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:C.coral,
          borderRadius:3, transition:'width 0.4s ease' }} />
      </div>
    </div>
  );
}
