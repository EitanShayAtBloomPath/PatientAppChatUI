import { Outlet } from 'react-router-dom';
import { C } from '../constants/colors';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';

export default function PhoneLayout() {
  return (
    <div style={{
      minHeight:'100vh',
      background:C.bg,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      padding:'32px 20px 40px',
    }}>
      <div style={{
        width:390,height:780,borderRadius:52,overflow:'hidden',
        boxShadow:'0 32px 80px rgba(0,0,0,.6),0 0 0 12px #1a2030,0 0 0 13px #0a0e18',
        background:C.cream,
        display:'flex',flexDirection:'column',
      }}>
        <StatusBar />
        {/* Outlet wrapper: fills remaining height, hides overflow so screens scroll internally */}
        <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <Outlet />
        </div>
        <BottomNav />
      </div>
      <div style={{marginTop:20,fontSize:12,color:'rgba(255,255,255,.35)',letterSpacing:'.05em'}}>
        BloomPath Health · Patient App
      </div>
    </div>
  );
}
