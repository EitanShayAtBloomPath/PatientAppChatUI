import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../constants/colors';
import { DEMO } from '../constants/demo';
import Step11Scan from './onboarding/steps/Step11Scan';

const INPUT_STYLE = {
  width: 72, fontSize: 28, fontWeight: 700, textAlign: 'center',
  background: 'rgba(255,255,255,0.12)',
  border: `2px solid rgba(255,255,255,0.25)`,
  borderRadius: 12, color: C.white, padding: '10px 0',
  outline: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield',
};

export default function ScanScreen() {
  const navigate = useNavigate();
  const [heightCm, setHeightCm] = useState(null);
  const [feet,   setFeet]   = useState('5');
  const [inches, setInches] = useState('8');

  const confirm = () => {
    const ft = Math.max(3, Math.min(7,  parseInt(feet)   || 5));
    const ins = Math.max(0, Math.min(11, parseInt(inches) || 8));
    setHeightCm(Math.round((ft * 12 + ins) * 2.54));
  };

  if (!heightCm) {
    return (
      <div style={{ height:'100%', background:'#0A0A0A', display:'flex',
        flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px' }}>

        <div style={{ fontSize:52, marginBottom:16 }}>📏</div>
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginBottom:8, textAlign:'center' }}>
          What's your height?
        </div>
        <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:36, textAlign:'center', lineHeight:1.5 }}>
          Used to calculate weight from your BMI scan
        </div>

        <div style={{ display:'flex', gap:16, marginBottom:36, alignItems:'flex-end' }}>
          <div style={{ textAlign:'center' }}>
            <input type="number" value={feet} min="3" max="7"
              onChange={e => setFeet(e.target.value)}
              style={INPUT_STYLE} />
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:8 }}>feet</div>
          </div>
          <div style={{ fontSize:28, color:'rgba(255,255,255,0.3)', paddingBottom:22 }}>·</div>
          <div style={{ textAlign:'center' }}>
            <input type="number" value={inches} min="0" max="11"
              onChange={e => setInches(e.target.value)}
              style={INPUT_STYLE} />
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:8 }}>inches</div>
          </div>
        </div>

        <button onClick={confirm} style={{ width:'100%', padding:16, background:C.coral,
          color:C.white, border:'none', borderRadius:17, fontSize:16, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 20px rgba(255,140,118,0.4)' }}>
          Continue to Scan →
        </button>
        <button onClick={() => navigate(-1)} style={{ marginTop:14, background:'none', border:'none',
          color:'rgba(255,255,255,0.35)', fontSize:14, cursor:'pointer' }}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <Step11Scan
      data={{ childName: DEMO.childName, heightCm }}
      onNext={() => navigate('/home')}
      onBack={() => setHeightCm(null)}
    />
  );
}
