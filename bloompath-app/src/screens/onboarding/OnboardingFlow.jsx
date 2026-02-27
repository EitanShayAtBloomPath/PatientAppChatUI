import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Step00Welcome          from './steps/Step00Welcome';
import Step01HowItWorks       from './steps/Step01HowItWorks';
import Step02ParentAccount    from './steps/Step02ParentAccount';
import Step03ChildProfile     from './steps/Step03ChildProfile';
import Step04HealthFlags      from './steps/Step04HealthFlags';
import Step05Goals            from './steps/Step05Goals';
import Step06CareTeam         from './steps/Step06CareTeam';
import Step07ChildHandoff     from './steps/Step07ChildHandoff';
import Step08ChildPreferences from './steps/Step08ChildPreferences';
import Step09JourneyOverview  from './steps/Step09JourneyOverview';
import Step10ScanIntro        from './steps/Step10ScanIntro';
import Step11Scan             from './steps/Step11Scan';
import Step12AllSet           from './steps/Step12AllSet';

const TOTAL = 13;

const INITIAL_DATA = {
  parentFirstName: '',
  parentLastName:  '',
  email:           '',
  relationship:    '',
  childName:       '',
  childAge:        null,
  childGrade:      '',
  flags:           {},
  goals:           [],
  activities:      [],
  favFoods:        [],
};

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);

  const next = () => setStep(s => Math.min(s + 1, TOTAL - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const complete = () => {
    // TODO: HIPAA — POST data to HIPAA-compliant backend before saving session flag
    localStorage.setItem('bloompath_session', JSON.stringify({ onboardingComplete: true, childName: data.childName }));
    navigate('/home');
  };

  const props = { data, setData, onNext: next, onBack: back };

  return (
    <div style={{ width:'100%', height:'100dvh', overflow:'hidden' }}>
      {step === 0  && <Step00Welcome          onNext={next} />}
      {step === 1  && <Step01HowItWorks       {...props} />}
      {step === 2  && <Step02ParentAccount    {...props} />}
      {step === 3  && <Step03ChildProfile     {...props} />}
      {step === 4  && <Step04HealthFlags      {...props} />}
      {step === 5  && <Step05Goals            {...props} />}
      {step === 6  && <Step06CareTeam         onNext={next} onBack={back} />}
      {step === 7  && <Step07ChildHandoff     data={data} onNext={next} onBack={back} />}
      {step === 8  && <Step08ChildPreferences {...props} />}
      {step === 9  && <Step09JourneyOverview  onNext={next} onBack={back} />}
      {step === 10 && <Step10ScanIntro        data={data} onNext={next} onBack={back} />}
      {step === 11 && <Step11Scan             data={data} onNext={next} onBack={back} />}
      {step === 12 && <Step12AllSet           data={data} onComplete={complete} />}
    </div>
  );
}
