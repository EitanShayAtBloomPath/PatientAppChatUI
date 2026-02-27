import { useNavigate } from 'react-router-dom';
import { C } from '../constants/colors';
import { DEMO } from '../constants/demo';

export default function JourneyScreen() {
  const navigate = useNavigate();
  const sessions=[
    {n:1,title:"Welcome & Intake",done:true},{n:2,title:"Nutrition Foundations",done:true},
    {n:3,title:"Building Healthy Routines",done:true},{n:4,title:"Physical Activity I",done:false,active:true},
    {n:5,title:"Parents as Agents of Change",done:false},{n:6,title:"Healthy Snacking & Beverages",done:false},
    {n:7,title:"Sleep, Stress & Emotional Eating",done:false},{n:8,title:"Eating Out & Social Situations",done:false},
    {n:9,title:"Physical Activity II",done:false},{n:10,title:"Family Meal Planning",done:false},
    {n:11,title:"Screen Time & Sedentary Behaviors",done:false},{n:12,title:"Midpoint Check-in",done:false},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <div style={{padding:"10px 20px 16px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}>
        <div style={{fontSize:20,fontWeight:800,color:C.teal}}>My Journey</div>
        <div style={{fontSize:12,color:C.gray,marginTop:2}}>Phase 1 · Session {DEMO.sessionsDone}/{DEMO.sessionsTotal}</div>
        <div style={{marginTop:10}}>
          <div style={{height:8,borderRadius:99,background:C.grayLight,overflow:"hidden"}}><div style={{height:"100%",width:`${(DEMO.sessionsDone/DEMO.sessionsTotal)*100}%`,borderRadius:99,background:`linear-gradient(90deg,${C.green},${C.teal})`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:10,color:C.gray}}>{Math.round((DEMO.sessionsDone/DEMO.sessionsTotal)*100)}% complete</span><span style={{fontSize:10,color:C.teal,fontWeight:600}}>{DEMO.sessionsTotal-DEMO.sessionsDone} sessions left</span></div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>
        <div style={{background:`linear-gradient(135deg,${C.tealLight},${C.greenLight})`,borderRadius:14,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:700,color:C.teal}}>Phase 1 · Intensive</div><div style={{fontSize:11,color:C.gray}}>Weeks 1–12 · 12 sessions</div></div><div style={{fontSize:24}}>🌱</div></div>
        {sessions.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,marginBottom:4,alignItems:"flex-start"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:40,flexShrink:0}}>
              <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,background:s.done?C.green:s.active?C.coral:C.grayLight,color:s.done||s.active?C.white:C.gray,boxShadow:s.active?`0 0 0 4px ${C.coralLight}`:"none",border:s.done||s.active?"none":`1.5px dashed #CCC`}}>{s.done?"✓":s.n}</div>
              {i<sessions.length-1&&<div style={{width:2,height:20,marginTop:2,background:s.done?C.green:C.grayLight}}/>}
            </div>
            <div style={{flex:1,background:s.active||s.done?C.white:"transparent",borderRadius:14,padding:s.active||s.done?"10px 14px":"6px 0",marginBottom:s.active||s.done?8:2,border:s.active?`1.5px solid ${C.coral}`:s.done?`1.5px solid ${C.green}`:"none",boxShadow:s.active?`0 4px 14px rgba(255,140,118,.2)`:s.done?"0 2px 8px rgba(0,0,0,.05)":"none"}}>
              <div style={{fontSize:s.active?13:12,fontWeight:s.active||s.done?700:500,color:s.active?C.coral:s.done?C.slate:C.gray}}>{s.title}</div>
              {s.active&&<div style={{marginTop:6}}><div style={{fontSize:11,color:C.gray,marginBottom:6}}>📅 Today, 4:00 PM · 60 min</div><button onClick={()=>navigate(`/journey/${s.n}`)} style={{padding:"8px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.coral},${C.coralDark})`,color:C.white,fontWeight:700,fontSize:12,border:"none",cursor:"pointer"}}>Join Session →</button></div>}
              {s.done&&<div style={{fontSize:11,color:C.gray,marginTop:3}}>✅ Completed · ⚡ +50 XP</div>}
            </div>
          </div>
        ))}
        <div style={{marginTop:8,borderRadius:14,padding:"12px 14px",background:C.grayLight,border:`1.5px dashed ${C.gray}`}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:13,fontWeight:700,color:C.gray}}>Phase 2 · Maintenance</div><div style={{fontSize:11,color:C.gray}}>Months 4–6 · Unlocks at Session 12</div></div><div style={{fontSize:20}}>🔒</div></div></div>
        <div style={{height:16}}/>
      </div>
    </div>
  );
}
