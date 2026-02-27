import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../../../constants/colors';
import StatusBar from '../../../components/StatusBar';
import { CAT_INFO } from '../goalData';

export default function Step06Celebration({ goals, childName }) {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState([false, false]);

  const toggle = i => setCheckedIn(prev => {
    const next = [...prev];
    next[i] = !next[i];
    return next;
  });

  const allDone = checkedIn[0] && checkedIn[1];

  return (
    <div style={{ height:'100%', background:`linear-gradient(160deg, ${C.teal}, ${C.tealDark})`,
      display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <StatusBar dark />
      <div style={{ flex:1, overflowY:'auto', padding:'16px 24px 24px' }}>

        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🎯</div>
          <h1 style={{ margin:'0 0 8px', fontSize:26, fontWeight:800, color:C.white }}>
            Goals locked in, {childName}!
          </h1>
          <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>
            2 smart goals are now active. Check in daily to earn XP and build your streak.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:12, marginBottom:20 }}>
          {[
            { value:'🔥 0',  label:'Day streak',    sub:'Starts today'   },
            { value:'+30 ⚡', label:'XP per week',  sub:'If you hit both' },
            { value:'2/20',  label:'Sessions done', sub:'Nice progress!'  },
          ].map((s, i) => (
            <div key={i} style={{ flex:1, background:'rgba(255,255,255,0.14)',
              borderRadius:16, padding:'12px 8px', textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:800, color:C.white, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', marginTop:4 }}>{s.label}</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Today's first check-in */}
        <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:20,
          padding:'16px 18px', marginBottom:14 }}>
          <p style={{ margin:'0 0 14px', fontSize:13, fontWeight:700,
            color:'rgba(255,255,255,0.8)', textTransform:'uppercase', letterSpacing:0.5 }}>
            🌅 Today's first check-in
          </p>
          {goals.map((g, i) => {
            if (!g.goal) return null;
            const cat     = CAT_INFO[g.category];
            const checked = checkedIn[i];
            return (
              <div key={i} onClick={() => toggle(i)} style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'13px 14px', borderRadius:16, marginBottom: i === 0 ? 10 : 0,
                background: checked ? cat.color : 'rgba(255,255,255,0.1)',
                border:`1.5px solid ${checked ? cat.color : 'rgba(255,255,255,0.2)'}`,
                cursor:'pointer', transition:'all 0.2s' }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{g.goal.emoji}</span>
                <p style={{ margin:0, fontSize:13, fontWeight:500,
                  color: checked ? C.white : 'rgba(255,255,255,0.85)',
                  flex:1, lineHeight:1.4, textDecoration: checked ? 'line-through' : 'none' }}>
                  {g.goal.text}
                </p>
                <div style={{ width:28, height:28, borderRadius:14, flexShrink:0,
                  border:`2px solid ${checked ? C.white : 'rgba(255,255,255,0.35)'}`,
                  background: checked ? 'rgba(255,255,255,0.3)' : 'transparent',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {checked && <span style={{ color:C.white, fontSize:14, fontWeight:700 }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Streak ignited */}
        {allDone && (
          <div style={{ background:'rgba(255,140,118,0.25)', borderRadius:16,
            border:'1.5px solid rgba(255,140,118,0.5)',
            padding:'13px 16px', marginBottom:14,
            display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:28 }}>🔥</span>
            <div>
              <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:800, color:C.white }}>Streak started!</p>
              <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,0.7)' }}>
                Day 1 ✓ — come back tomorrow to keep it going.
              </p>
            </div>
          </div>
        )}

        {/* Until session 3 */}
        <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:16,
          padding:'13px 16px', marginBottom:20, display:'flex', gap:10 }}>
          <span style={{ fontSize:20 }}>📅</span>
          <div>
            <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.9)' }}>
              Session 3 in ~14 days
            </p>
            <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,0.6)' }}>
              Your RD will review your check-in data before that session.
            </p>
          </div>
        </div>

        <button onClick={() => navigate('/goals')} style={{ width:'100%', padding:'16px',
          background:C.coral, color:C.white, border:'none', borderRadius:17,
          fontSize:16, fontWeight:700, cursor:'pointer',
          boxShadow:'0 6px 24px rgba(0,0,0,0.3)' }}>
          View My Goals 🎯
        </button>
      </div>
    </div>
  );
}
