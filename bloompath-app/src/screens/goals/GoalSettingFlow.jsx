import { useState } from 'react';
import { NUTRITION_GOALS, ACTIVITY_GOALS } from './goalData';
import { DEMO } from '../../constants/demo';
import Step00Intro        from './steps/Step00Intro';
import GoalSelectStep     from './steps/GoalSelectStep';
import GoalCustomizeStep  from './steps/GoalCustomizeStep';
import Step05Review       from './steps/Step05Review';
import Step06Celebration  from './steps/Step06Celebration';

const INITIAL_GOALS = [
  { category:'nutrition', goal:null, freq:null, confidence:null },
  { category:'activity',  goal:null, freq:null, confidence:null },
];

export default function GoalSettingFlow() {
  const [step, setStep]           = useState(0);
  const [goalState, setGoalState] = useState(INITIAL_GOALS);

  const next = () => setStep(s => Math.min(s + 1, 6));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const setGoal = (i, goal) =>
    setGoalState(gs => { const n = [...gs]; n[i] = { ...n[i], goal };             return n; });
  const setFreq = (i, freq) =>
    setGoalState(gs => { const n = [...gs]; n[i] = { ...n[i], freq };             return n; });
  const setConf = (i, conf) =>
    setGoalState(gs => { const n = [...gs]; n[i] = { ...n[i], confidence: conf }; return n; });

  return (
    <div style={{ width:'100%', height:'100dvh', overflow:'hidden' }}>
      {step === 0 && (
        <Step00Intro childName={DEMO.childName} onNext={next} />
      )}
      {step === 1 && (
        <GoalSelectStep
          step={1} category="nutrition" goals={NUTRITION_GOALS}
          rdContext="Based on your last session, the most impactful first step is usually a drink swap. But pick the goal that feels most doable for your family."
          selected={goalState[0].goal}
          onSelect={g => setGoal(0, g)}
          onNext={next} onBack={back} />
      )}
      {step === 2 && (
        <GoalCustomizeStep
          step={2} category="nutrition"
          goal={goalState[0].goal}
          freq={goalState[0].freq}
          confidence={goalState[0].confidence}
          onFreq={f => setFreq(0, f)}
          onConf={c => setConf(0, c)}
          ctaLabel="Set activity goal →"
          onNext={next} onBack={back} />
      )}
      {step === 3 && (
        <GoalSelectStep
          step={3} category="activity" goals={ACTIVITY_GOALS}
          rdContext="For activity goals, consistency matters more than intensity. A short daily walk beats a long gym session once a week."
          selected={goalState[1].goal}
          onSelect={g => setGoal(1, g)}
          onNext={next} onBack={back} />
      )}
      {step === 4 && (
        <GoalCustomizeStep
          step={4} category="activity"
          goal={goalState[1].goal}
          freq={goalState[1].freq}
          confidence={goalState[1].confidence}
          onFreq={f => setFreq(1, f)}
          onConf={c => setConf(1, c)}
          ctaLabel="Review my goals →"
          onNext={next} onBack={back} />
      )}
      {step === 5 && (
        <Step05Review goals={goalState} onNext={next} onBack={back} />
      )}
      {step === 6 && (
        <Step06Celebration goals={goalState} childName={DEMO.childName} />
      )}
    </div>
  );
}
