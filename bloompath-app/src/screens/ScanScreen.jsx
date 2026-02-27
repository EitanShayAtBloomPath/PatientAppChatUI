import { useNavigate } from 'react-router-dom';
import { DEMO } from '../constants/demo';
import Step11Scan from './onboarding/steps/Step11Scan';

export default function ScanScreen() {
  const navigate = useNavigate();
  return (
    <Step11Scan
      data={{ childName: DEMO.childName, heightCm: DEMO.heightCm }}
      onNext={() => navigate('/home')}
      onBack={() => navigate(-1)}
    />
  );
}
