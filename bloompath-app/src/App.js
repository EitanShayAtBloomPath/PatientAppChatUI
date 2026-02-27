import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneLayout from './layouts/PhoneLayout';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import LessonFlow from './screens/lesson/LessonFlow';
import GoalSettingFlow from './screens/goals/GoalSettingFlow';
import HomeScreen from './screens/HomeScreen';
import JourneyScreen from './screens/JourneyScreen';
import GoalsScreen from './screens/GoalsScreen';
import DietScreen from './screens/DietScreen';
import TeamScreen from './screens/TeamScreen';
import ScanScreen from './screens/ScanScreen';

function RootRedirect() {
  const hasSession = Boolean(localStorage.getItem('bloompath_session'));
  return <Navigate to={hasSession ? '/home' : '/onboarding'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/journey/:sessionId" element={<LessonFlow />} />
        <Route path="/goals/set" element={<GoalSettingFlow />} />
        <Route path="/scan" element={<ScanScreen />} />
        <Route element={<PhoneLayout />}>
          <Route path="/home"    element={<HomeScreen />} />
          <Route path="/journey" element={<JourneyScreen />} />
          <Route path="/goals"   element={<GoalsScreen />} />
          <Route path="/diet"    element={<DietScreen />} />
          <Route path="/team"    element={<TeamScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
