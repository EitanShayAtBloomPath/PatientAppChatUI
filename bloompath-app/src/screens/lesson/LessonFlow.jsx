import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { C } from '../../constants/colors';
import StatusBar from '../../components/StatusBar';
import LessonIntro    from './steps/LessonIntro';
import TrafficLightStep from './steps/TrafficLightStep';
import FoodSortStep   from './steps/FoodSortStep';
import MyPlateStep    from './steps/MyPlateStep';
import CommitmentStep from './steps/CommitmentStep';
import CompleteScreen from './CompleteScreen';

// TODO: In production, fetch session content dynamically by sessionId from the backend.
// For now all sessions render the "Nutrition Foundations" content as a placeholder.
const SESSION_DATA = {
  2: {
    id:2, title:'Nutrition Foundations', emoji:'🥗',
    provider:'RD Session', mins:60, xp:50,
    intro:'Learn a simple framework for food choices — no calorie counting required.',
    learnings:[
      { icon:'🚦', text:'The Go/Slow/Whoa Method for choosing foods' },
      { icon:'🍽️', text:'How to build a balanced plate with MyPlate' },
      { icon:'🔄', text:'One swap to try this week' },
    ],
    completionMsg:'You learned the Go/Slow/Whoa Method and locked in your first swap commitment.',
    takeaways:[
      '🚦 Go/Slow/Whoa method for food choices',
      '🍽️ MyPlate balanced plate framework',
      '🔄 Your weekly swap is set',
    ],
    nextSession:{ id:3, title:'Healthy Routines', emoji:'⏰', provider:'Behavioral Coach', xp:50 },
  },
};

// Fallback for any session ID not yet authored
const DEFAULT_SESSION = id => ({
  id, title:'Session Content', emoji:'📚',
  provider:'Care Team', mins:60, xp:50,
  intro:'Your care team has prepared this session just for your family.',
  learnings:[
    { icon:'📖', text:'Review session materials' },
    { icon:'💬', text:'Discuss with your care team' },
    { icon:'🎯', text:'Set a goal for the week' },
  ],
  completionMsg:'Great work completing this session!',
  takeaways:['Session materials reviewed','Goal set for the week'],
  nextSession:null,
});

const TOTAL_STEPS = 5; // 0=intro 1=concept 2=activity 3=visual 4=commit

export default function LessonFlow() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(sessionId, 10);
  const session = SESSION_DATA[id] || DEFAULT_SESSION(id);

  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone]       = useState(false);

  if (done) return <CompleteScreen session={session} />;

  const pct = (step / TOTAL_STEPS) * 100;

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else navigate('/journey');
  };

  return (
    <div style={{ width:'100%', height:'100dvh', background:C.white,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />

      {/* Lesson header */}
      <div style={{ padding:'8px 22px 14px', background:C.white, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <button onClick={handleBack} style={{ width:36, height:36, borderRadius:18,
            background:C.grayLight, border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:16, color:C.slate }}>
            {step > 0 ? '←' : '✕'}
          </button>
          <div style={{ textAlign:'center' }}>
            <p style={{ margin:0, fontSize:11, fontWeight:700, color:C.coral,
              textTransform:'uppercase', letterSpacing:0.5 }}>
              {session.title}
            </p>
            <p style={{ margin:'1px 0 0', fontSize:12, color:C.gray }}>
              {step + 1} of {TOTAL_STEPS}
            </p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4,
            background:C.coralLight, borderRadius:20, padding:'5px 10px' }}>
            <span style={{ fontSize:13 }}>🔥</span>
            <span style={{ fontSize:12, fontWeight:700, color:C.coral }}>7</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height:8, background:'#F0F0F0', borderRadius:4, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background:C.coral,
            borderRadius:4, transition:'width 0.4s ease' }} />
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 22px 110px' }}>
        {step === 0 && <LessonIntro    session={session} />}
        {step === 1 && <TrafficLightStep />}
        {step === 2 && <FoodSortStep   answers={answers} setAnswers={setAnswers} />}
        {step === 3 && <MyPlateStep    />}
        {step === 4 && <CommitmentStep />}
      </div>

      {/* Sticky CTA */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'16px 22px 28px',
        background:'linear-gradient(to top, rgba(255,255,255,1) 65%, rgba(255,255,255,0))' }}>
        <button
          onClick={() => step < TOTAL_STEPS - 1 ? setStep(s => s + 1) : setDone(true)}
          style={{ width:'100%', padding:'16px',
            background:C.coral, color:C.white, border:'none', borderRadius:17,
            fontSize:16, fontWeight:700, cursor:'pointer',
            boxShadow:'0 6px 20px rgba(255,140,118,0.45)', transition:'transform 0.1s' }}>
          {step < TOTAL_STEPS - 1 ? 'Continue →' : '🎉 Complete Session!'}
        </button>
      </div>
    </div>
  );
}
