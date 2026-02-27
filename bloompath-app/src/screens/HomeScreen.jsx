import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../constants/colors';
import { DEMO } from '../constants/demo';
import SectionHeader from '../components/SectionHeader';
import WeekRings from '../components/WeekRings';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [goalsChecked,setGoalsChecked] = useState({n1:false,a1:false});
  const toggle=(id)=>setGoalsChecked(p=>({...p,[id]:!p[id]}));
  const allDone=Object.values(goalsChecked).every(Boolean);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <div style={{background:`linear-gradient(160deg,${C.tealDark},${C.teal})`,padding:"12px 20px 22px",borderRadius:"0 0 28px 28px",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:2}}>Good afternoon,</div>
            <div style={{fontSize:22,fontWeight:800,color:C.white}}>{DEMO.childName} 👋</div>
          </div>
          <div style={{position:"relative",cursor:"pointer"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🔔</div>
            <div style={{position:"absolute",top:2,right:2,width:10,height:10,borderRadius:"50%",background:C.coral,border:`2px solid ${C.teal}`}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div style={{flex:1,background:"rgba(255,255,255,.13)",borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:22}}>🔥</span>
            <div><div style={{fontSize:18,fontWeight:800,color:C.white,lineHeight:1}}>{DEMO.streak}</div><div style={{fontSize:10,color:"rgba(255,255,255,.7)"}}>Day Streak</div></div>
          </div>
          <div style={{flex:2,background:"rgba(255,255,255,.13)",borderRadius:14,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Level {DEMO.level}</span>
              <span style={{fontSize:11,fontWeight:700,color:C.yellow}}>⚡ {DEMO.xp} XP</span>
            </div>
            <div style={{height:8,borderRadius:99,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:99,width:`${Math.round(((DEMO.xp%200)/200)*100)}%`,background:`linear-gradient(90deg,${C.green},${C.yellow})`}}/>
            </div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.12)",borderRadius:14,padding:"10px 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,.85)",fontWeight:600}}>Program Progress</span>
            <span style={{fontSize:12,color:C.yellow,fontWeight:700}}>{DEMO.sessionsDone}/{DEMO.sessionsTotal} sessions</span>
          </div>
          <div style={{height:8,borderRadius:99,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:99,width:`${Math.round((DEMO.sessionsDone/DEMO.sessionsTotal)*100)}%`,background:`linear-gradient(90deg,${C.yellow},${C.coral})`}}/>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:16}}/>
        <SectionHeader label="Next Session" action="See all"/>
        <div style={{background:C.white,borderRadius:18,padding:16,boxShadow:"0 2px 12px rgba(0,95,115,.08)",marginBottom:20,border:`1.5px solid ${C.tealLight}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.teal,background:C.tealLight,borderRadius:6,padding:"2px 8px",display:"inline-block",marginBottom:6}}>Session {DEMO.nextSession.number}</div>
              <div style={{fontSize:16,fontWeight:700,color:C.slate}}>{DEMO.nextSession.title}</div>
              <div style={{fontSize:12,color:C.gray,marginTop:3}}>with {DEMO.nextSession.provider}</div>
            </div>
            <div style={{background:C.coralLight,borderRadius:12,padding:"8px 12px",textAlign:"center"}}>
              <div style={{fontSize:18}}>📅</div>
              <div style={{fontSize:10,fontWeight:700,color:C.coralDark,marginTop:2}}>TODAY</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[{icon:"🕐",t:`${DEMO.nextSession.durationMin} min`},{icon:"📹",t:"Telehealth"},{icon:"⚡",t:"+50 XP",bg:C.greenLight,c:C.greenDark}].map((tag,i)=>(
              <div key={i} style={{background:tag.bg||C.grayLight,borderRadius:8,padding:"4px 10px",fontSize:11,color:tag.c||C.slate}}>{tag.icon} {tag.t}</div>
            ))}
          </div>
          <button style={{width:"100%",padding:"12px",borderRadius:12,background:`linear-gradient(135deg,${C.coral},${C.coralDark})`,color:C.white,fontWeight:700,fontSize:14,border:"none",cursor:"pointer",boxShadow:`0 4px 12px rgba(255,140,118,.35)`}}>
            Join Session · {DEMO.nextSession.date}
          </button>
        </div>
        <SectionHeader label="Today's Goals"/>
        {allDone&&<div style={{background:C.greenLight,borderRadius:14,padding:"12px 14px",marginBottom:12,border:`1.5px solid ${C.green}`,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>🎉</span><div><div style={{fontSize:13,fontWeight:700,color:C.greenDark}}>All done today!</div><div style={{fontSize:11,color:C.greenDark,opacity:.8}}>🔥 Streak extended to {DEMO.streak+1} days!</div></div></div>}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
          {DEMO.goals.map(g=>(
            <div key={g.id} onClick={()=>toggle(g.id)} style={{background:goalsChecked[g.id]?C.greenLight:C.white,borderRadius:16,padding:"12px 14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.05)",border:`1.5px solid ${goalsChecked[g.id]?C.green:C.grayLight}`}}>
              <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:goalsChecked[g.id]?C.green:C.grayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{goalsChecked[g.id]?"✓":""}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:C.slate,textDecoration:goalsChecked[g.id]?"line-through":"none",opacity:goalsChecked[g.id]?.6:1}}>{g.emoji} {g.text}</div>
                <div style={{fontSize:11,color:C.gray,marginTop:2}}>{g.freq} · 🔥 {g.streak}-day streak</div>
                <div style={{marginTop:6}}><WeekRings days={g.weekDays}/></div>
              </div>
            </div>
          ))}
        </div>
        <SectionHeader label="Quick Actions"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
          {[
            {icon:"📸",label:"Scan Progress",sub:"Monthly photo",  color:C.tealLight, accent:C.teal,     to:'/scan'},
            {icon:"🚦",label:"Log a Meal",   sub:"Traffic light",  color:C.coralLight,accent:C.coralDark,to:'/diet'},
            {icon:"📊",label:"My Reports",   sub:"BMI + activity", color:C.greenLight, accent:C.greenDark,to:'/journey'},
            {icon:"📚",label:"Resources",    sub:"Recipes & tips", color:C.yellowLight,accent:C.slate,    to:'/team'},
          ].map((a,i)=>(
            <div key={i} onClick={()=>navigate(a.to)} style={{background:a.color,borderRadius:16,padding:"14px",cursor:"pointer"}}><div style={{fontSize:24,marginBottom:6}}>{a.icon}</div><div style={{fontSize:13,fontWeight:700,color:a.accent}}>{a.label}</div><div style={{fontSize:10,color:C.gray,marginTop:2}}>{a.sub}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}
