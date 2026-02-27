import { useState, useRef, useEffect } from 'react';
import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';

const BMI_SERVER = 'http://127.0.0.1:8080/predict';

export default function Step11Scan({ data, onNext, onBack }) {
  const [phase, setPhase] = useState('idle'); // idle | scanning | done
  const [bmiResult, setBmiResult] = useState(null); // { bmi, source } | null
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const child = data.childName || 'your child';

  // Open camera on mount; release on unmount
  // Note: navigator.mediaDevices requires a secure context (HTTPS or localhost).
  // Accessing over a plain HTTP LAN IP will leave mediaDevices undefined.
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      console.warn('[BMI Scan] Camera unavailable — requires HTTPS or localhost (not plain HTTP over LAN IP)');
      return;
    }
    let stream;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then(s => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(err => console.warn('[BMI Scan] Camera permission denied:', err.message));

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startScan = async () => {
    setPhase('scanning');

    // Capture a frame — guard against video not ready (readyState < HAVE_CURRENT_DATA)
    let imageData = null;
    try {
      const video  = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState >= 2 && video.videoWidth > 0) {
        canvas.width  = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        imageData = canvas.toDataURL('image/jpeg', 0.85);
      } else {
        console.warn('[BMI Scan] Video not ready — skipping frame capture');
      }
    } catch (err) {
      console.warn('[BMI Scan] Frame capture failed:', err.message);
    }

    // Send to local inference server and log the result
    if (imageData) {
      try {
        const res = await fetch(BMI_SERVER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData }),
        });
        const { bmi } = await res.json();
        const heightM = (data.heightCm || 152) / 100;
        const weightKg = bmi * (heightM * heightM);
        const weightLbs = weightKg * 2.205;
        // TODO: HIPAA — result logged locally only; not persisted or transmitted
        console.log('[BMI Scan] Predicted BMI:', bmi.toFixed(1), '| Weight:', weightKg.toFixed(1), 'kg /', weightLbs.toFixed(1), 'lbs');
        setBmiResult({ bmi, weightKg, weightLbs, source: 'model' });
      } catch (err) {
        console.warn('[BMI Scan] Server unreachable — skipping inference:', err.message);
        setBmiResult(null);
      }
    }

    setPhase('done');
  };

  const ovalColor = phase === 'done' ? C.green : phase === 'scanning' ? C.yellow : 'rgba(255,255,255,0.55)';
  const ovalGlow  = phase === 'done'
    ? '0 0 0 6px rgba(148,210,189,0.25), 0 0 60px rgba(148,210,189,0.2)'
    : phase === 'scanning'
    ? '0 0 0 6px rgba(233,216,166,0.25), 0 0 60px rgba(233,216,166,0.2)'
    : 'none';

  return (
    <div style={{ height:'100%', background:'#0A0A0A', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ padding:'4px 22px 12px', display:'flex', alignItems:'center',
        justifyContent:'space-between', flexShrink:0 }}>
        <button onClick={onBack} style={{ width:36, height:36, borderRadius:18,
          background:'rgba(255,255,255,0.12)', border:'none', cursor:'pointer',
          color:C.white, fontSize:16 }}>✕</button>
        <span style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.65)' }}>
          {phase === 'done' ? '✓ Scan Complete' : phase === 'scanning' ? 'Scanning…' : 'Baseline Scan'}
        </span>
        <div style={{ width:36 }} />
      </div>

      {/* Viewfinder */}
      <div style={{ flex:1, margin:'0 18px', borderRadius:24, overflow:'hidden',
        background:'radial-gradient(ellipse at 50% 40%, #2a2a2a 0%, #0d0d0d 100%)',
        position:'relative' }}>

        {/* Live camera feed */}
        <video ref={videoRef} autoPlay muted playsInline style={{
          position:'absolute', top:0, left:0, width:'100%', height:'100%',
          objectFit:'cover',
          opacity: phase === 'done' ? 0.4 : 1,
          transition:'opacity 0.5s',
        }} />

        {/* Face oval */}
        <div style={{ position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%, -55%)',
          width:180, height:220, border:`3px solid ${ovalColor}`,
          borderRadius:'50%', boxShadow:ovalGlow, transition:'all 0.6s ease' }}>

          {/* Oval corner dots */}
          {[
            { position:'absolute', top:-6,  left:'50%', marginLeft:-5 },
            { position:'absolute', bottom:-6, left:'50%', marginLeft:-5 },
            { position:'absolute', left:-6,  top:'50%', marginTop:-5 },
            { position:'absolute', right:-6, top:'50%', marginTop:-5 },
          ].map((s, i) => (
            <div key={i} style={{ ...s, width:10, height:10, borderRadius:5,
              background:ovalColor, transition:'all 0.6s' }} />
          ))}

          {/* Face guide landmarks */}
          {phase !== 'idle' && (
            <>
              <div style={{ position:'absolute', top:'30%', left:'28%', width:20, height:3,
                background: phase === 'done' ? C.green : C.yellow, borderRadius:2, opacity:0.7 }} />
              <div style={{ position:'absolute', top:'30%', right:'28%', width:20, height:3,
                background: phase === 'done' ? C.green : C.yellow, borderRadius:2, opacity:0.7 }} />
              <div style={{ position:'absolute', top:'50%', left:'50%',
                transform:'translate(-50%,-50%)', width:8, height:8, borderRadius:4,
                background: phase === 'done' ? C.green : C.yellow, opacity:0.6 }} />
            </>
          )}
        </div>

        {/* Scan sweep line */}
        {phase === 'scanning' && (
          <div style={{ position:'absolute',
            top:'22%', left:'calc(50% - 88px)', width:176,
            height:2, background:`linear-gradient(90deg, transparent, ${C.coral}, transparent)`,
            boxShadow:`0 0 12px ${C.coral}, 0 0 4px ${C.coral}` }} />
        )}

        {/* Corner brackets */}
        {['tl','tr','bl','br'].map(corner => (
          <div key={corner} style={{
            position:'absolute',
            top:    corner.startsWith('t') ? 16 : undefined,
            bottom: corner.startsWith('b') ? 16 : undefined,
            left:   corner.endsWith('l')   ? 16 : undefined,
            right:  corner.endsWith('r')   ? 16 : undefined,
            width:22, height:22,
            borderTop:    corner.startsWith('t') ? '2.5px solid rgba(255,255,255,0.4)' : 'none',
            borderBottom: corner.startsWith('b') ? '2.5px solid rgba(255,255,255,0.4)' : 'none',
            borderLeft:   corner.endsWith('l')   ? '2.5px solid rgba(255,255,255,0.4)' : 'none',
            borderRight:  corner.endsWith('r')   ? '2.5px solid rgba(255,255,255,0.4)' : 'none',
            borderTopLeftRadius:     corner === 'tl' ? 4 : 0,
            borderTopRightRadius:    corner === 'tr' ? 4 : 0,
            borderBottomLeftRadius:  corner === 'bl' ? 4 : 0,
            borderBottomRightRadius: corner === 'br' ? 4 : 0,
          }} />
        ))}

        {/* Status */}
        <div style={{ position:'absolute', bottom:22, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {phase === 'done' ? (
            <>
              <div style={{ width:44, height:44, borderRadius:22, background:C.green,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>✓</div>
              <span style={{ fontSize:13, color:C.green, fontWeight:700 }}>Baseline captured!</span>
              {bmiResult
                ? <div style={{ marginTop:4, textAlign:'center' }}>
                    <div style={{ fontSize:15, color:C.white, fontWeight:800, letterSpacing:.5 }}>
                      BMI {bmiResult.bmi.toFixed(1)}
                    </div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:2 }}>
                      ~{bmiResult.weightLbs.toFixed(0)} lbs &nbsp;·&nbsp; {bmiResult.weightKg.toFixed(1)} kg
                    </div>
                  </div>
                : <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:2 }}>
                    Server offline — no estimate
                  </span>
              }
            </>
          ) : phase === 'scanning' ? (
            <>
              <div style={{ display:'flex', gap:6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:9, height:9, borderRadius:5,
                    background:C.yellow, opacity:0.4 + i * 0.3 }} />
                ))}
              </div>
              <span style={{ fontSize:13, color:C.yellow, fontWeight:600 }}>Hold still…</span>
            </>
          ) : (
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)', textAlign:'center' }}>
              Position {child}'s face inside the oval
            </span>
          )}
        </div>
      </div>

      {/* Hidden canvas — used to capture a single video frame */}
      <canvas ref={canvasRef} style={{ display:'none' }} />

      {/* Bottom */}
      <div style={{ padding:'18px 22px 30px', flexShrink:0 }}>
        {phase === 'done' ? (
          <button onClick={onNext} style={{ width:'100%', padding:'16px',
            background:C.coral, color:C.white, border:'none', borderRadius:17,
            fontSize:16, fontWeight:700, cursor:'pointer',
            boxShadow:'0 6px 20px rgba(255,140,118,0.45)' }}>
            Continue →
          </button>
        ) : (
          <button onClick={startScan} disabled={phase === 'scanning'} style={{
            width:'100%', padding:'16px',
            background: phase === 'scanning' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.14)',
            color:C.white,
            border:`2px solid ${phase === 'scanning' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.28)'}`,
            borderRadius:17, fontSize:16, fontWeight:700,
            cursor: phase === 'scanning' ? 'not-allowed' : 'pointer' }}>
            {phase === 'scanning' ? 'Scanning…' : '📸 Capture Baseline Scan'}
          </button>
        )}
      </div>
    </div>
  );
}
