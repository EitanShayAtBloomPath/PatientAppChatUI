import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import StepBar from '../StepBar';
import BottomCTA from '../BottomCTA';
import { FREQUENCIES, CONFIDENCE, CAT_INFO } from '../goalData';

export default function GoalCustomizeStep({ step, category, goal, freq, confidence, onFreq, onConf, onNext, onBack, ctaLabel }) {
  if (!goal) return null;
  const cat = CAT_INFO[category];
  const freqShort  = freq       ? FREQUENCIES.find(f => f.label === freq)?.short : null;
  const confItem   = confidence ? CONFIDENCE.find(c => c.val === confidence)     : null;
  const previewReady = freqShort && confItem;

  return (
    <div style={{ height:'100%', background:C.cream, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar />
      <StepBar step={step} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 24px 110px' }}>

        <div style={{ display:'inline-flex', alignItems:'center', gap:6,
          background:cat.light, borderRadius:20, padding:'5px 14px', marginBottom:14 }}>
          <span style={{ fontSize:12, fontWeight:700, color:cat.color }}>{cat.label}</span>
        </div>

        <h2 style={{ margin:'0 0 6px', fontSize:24, fontWeight:800, color:C.teal }}>
          Make it yours
        </h2>
        <p style={{ margin:'0 0 20px', fontSize:14, color:C.gray }}>
          Personalize the details so it fits your family's life.
        </p>

        {/* Selected goal card */}
        <div style={{ background:cat.light, border:`1.5px solid ${cat.color}`,
          borderRadius:18, padding:'14px 16px', marginBottom:22,
          display:'flex', gap:12, alignItems:'center' }}>
          <span style={{ fontSize:26 }}>{goal.emoji}</span>
          <p style={{ margin:0, fontSize:14, fontWeight:600, color:cat.color, lineHeight:1.4, flex:1 }}>
            {goal.text}
          </p>
        </div>

        {/* Frequency */}
        <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:700, color:C.slate }}>How often?</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
          {FREQUENCIES.map(f => {
            const sel = freq === f.label;
            return (
              <button key={f.label} onClick={() => onFreq(f.label)} style={{
                padding:'9px 16px', borderRadius:20,
                border:`2px solid ${sel ? cat.color : '#E0E0E6'}`,
                background: sel ? cat.color : C.white,
                color: sel ? C.white : C.slate,
                fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Confidence */}
        <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:700, color:C.slate }}>
          How confident do you feel about this?
        </p>
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          {CONFIDENCE.map(c => {
            const sel = confidence === c.val;
            return (
              <button key={c.val} onClick={() => onConf(c.val)} style={{
                flex:1, padding:'10px 4px', borderRadius:14,
                border:`2px solid ${sel ? cat.color : '#E0E0E6'}`,
                background: sel ? cat.light : C.white,
                cursor:'pointer', transition:'all 0.15s',
                display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontSize:22 }}>{c.emoji}</span>
                <span style={{ fontSize:10, color: sel ? cat.color : C.gray,
                  fontWeight: sel ? 700 : 500, lineHeight:1.2, textAlign:'center' }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* SMART Goal Preview */}
        <div style={{ borderRadius:18, overflow:'hidden',
          border:`1.5px solid ${previewReady ? cat.color : '#E0E0E6'}`, transition:'all 0.3s' }}>
          <div style={{ padding:'8px 14px', background: previewReady ? cat.color : '#F0F0F4' }}>
            <span style={{ fontSize:11, fontWeight:700,
              color: previewReady ? C.white : C.gray,
              textTransform:'uppercase', letterSpacing:0.5 }}>
              {previewReady ? '✓ Your SMART goal' : 'Your SMART goal preview'}
            </span>
          </div>
          <div style={{ padding:'14px 16px', background: previewReady ? cat.light : C.grayLight }}>
            {previewReady ? (
              <>
                <p style={{ margin:'0 0 10px', fontSize:15, fontWeight:600, color:cat.color, lineHeight:1.5 }}>
                  "{goal.text}, {freqShort}."
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:18 }}>{confItem.emoji}</span>
                  <span style={{ fontSize:13, color:C.gray }}>
                    Confidence: <strong style={{ color:cat.color }}>{confItem.label}</strong>
                  </span>
                  <span style={{ marginLeft:'auto', fontSize:12, fontWeight:700,
                    color:C.greenDark, background:C.greenLight, padding:'3px 8px', borderRadius:8 }}>
                    +15 XP/week
                  </span>
                </div>
              </>
            ) : (
              <p style={{ margin:0, fontSize:13, color:'#ADADB5', fontStyle:'italic' }}>
                Select frequency and confidence to preview your full goal…
              </p>
            )}
          </div>
        </div>

        {previewReady && (
          <div style={{ marginTop:14, padding:'12px 14px', background:C.white,
            borderRadius:14, border:'1.5px solid #E8E8EE', display:'flex', gap:10, alignItems:'center' }}>
            <span style={{ fontSize:20 }}>🔥</span>
            <div>
              <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:700, color:C.slate }}>Daily streak starts today</p>
              <p style={{ margin:0, fontSize:12, color:C.gray }}>
                Check in each day to build your streak and earn XP.
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomCTA label={ctaLabel} onNext={onNext} onBack={onBack} disabled={!previewReady} />
    </div>
  );
}
