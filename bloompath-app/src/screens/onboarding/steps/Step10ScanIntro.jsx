import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import PhaseBar from '../PhaseBar';
import BottomCTA from '../BottomCTA';

export default function Step10ScanIntro({ data, onNext, onBack }) {
  const child = data.childName || 'your child';
  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <PhaseBar step={10} />
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 110px' }}>
        <h2 style={{ margin:'0 0 6px', fontSize:26, fontWeight:800, color:C.teal }}>
          One last step: {child}'s health baseline 📸
        </h2>
        <p style={{ margin:'0 0 22px', fontSize:15, color:C.gray, lineHeight:1.5 }}>
          We'll take a quick facial scan to establish a biometric baseline. This helps your care team
          track physical progress over time — alongside weight and clinical measurements.
          {/* TODO: HIPAA — facial scan data must not be stored server-side; on-device processing only */}
        </p>

        <div style={{ height:130, background:`linear-gradient(135deg, ${C.tealLight}, ${C.greenLight})`,
          borderRadius:20, marginBottom:22, display:'flex',
          alignItems:'center', justifyContent:'center', fontSize:54 }}>
          📸
        </div>

        <h3 style={{ margin:'0 0 12px', fontSize:15, fontWeight:700, color:C.slate }}>
          How it works:
        </h3>
        {[
          { icon:'📱', text:'Hold the phone at eye level, about 12 inches away' },
          { icon:'💡', text:'Find good, even lighting — natural light works best' },
          { icon:'⏱️', text:'The scan takes about 10 seconds' },
          { icon:'📊', text:'Results are compared at each check-in to show progress' },
        ].map((item, i) => (
          <div key={i} style={{ display:'flex', gap:12, marginBottom:10, padding:'11px 14px',
            background:C.white, borderRadius:13 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
            <span style={{ fontSize:14, color:C.slate, fontWeight:500, lineHeight:1.45 }}>{item.text}</span>
          </div>
        ))}

        <div style={{ marginTop:16, padding:'14px 16px', background:C.tealLight,
          borderRadius:14, display:'flex', gap:10 }}>
          <span style={{ fontSize:20, flexShrink:0 }}>🔒</span>
          <div>
            <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:C.teal }}>Your privacy is protected</p>
            <p style={{ margin:0, fontSize:12, color:C.teal, lineHeight:1.5 }}>
              Scans are processed on-device. No images are stored on our servers or shared with third parties.
            </p>
          </div>
        </div>
      </div>
      <BottomCTA label="Start Scan →" onNext={onNext} onBack={onBack} />
    </div>
  );
}
