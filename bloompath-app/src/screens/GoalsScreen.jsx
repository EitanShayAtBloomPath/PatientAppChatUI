import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../constants/colors';
import { DEMO } from '../constants/demo';

export default function GoalsScreen() {
  const navigate = useNavigate();
  const [checks,setChecks] = useState({n1:[true,true,false,true,true,true,false],a1:[true,false,true,true,false,null,null]});
  const weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const today=4;
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <div style={{padding:"10px 20px 14px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:20,fontWeight:800,color:C.teal}}>My Goals</div>
          <button onClick={()=>navigate('/goals/set')} style={{padding:"6px 14px",borderRadius:20,background:C.coral,color:C.white,border:"none",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Set goals</button>
        </div>
        <div style={{fontSize:12,color:C.gray,marginTop:2}}>This week · Set with Amy (RD)</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>
        <div style={{background:`linear-gradient(135deg,${C.teal},${C.tealDark})`,borderRadius:18,padding:16,marginBottom:20,color:C.white}}>
          <div style={{fontSize:13,fontWeight:600,opacity:.8,marginBottom:6}}>Week Overview</div>
          <div style={{display:"flex",gap:6}}>
            {weekDays.map((d,i)=>{const n1=checks.n1[i],a1=checks.a1[i];const both=n1===true&&a1===true,one=(n1===true||a1===true)&&!both,miss=n1===false||a1===false,future=n1===null&&a1===null;const isToday=i===today;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:"100%",height:32,borderRadius:8,background:future?"rgba(255,255,255,.1)":both?C.green:one?C.yellow:miss?"rgba(255,100,80,.4)":"rgba(255,255,255,.1)",border:isToday?`2px solid ${C.coral}`:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{both?"✓✓":one?"✓":miss?"•":""}</div><span style={{fontSize:9,color:isToday?C.coral:"rgba(255,255,255,.6)",fontWeight:isToday?700:400}}>{d[0]}</span></div>);})}
          </div>
          <div style={{marginTop:10,display:"flex",gap:10}}><div style={{fontSize:11,opacity:.8}}>🔥 {DEMO.streak}-day streak</div><div style={{fontSize:11,opacity:.8}}>⚡ {DEMO.xp} XP</div></div>
        </div>
        {DEMO.goals.map(g=>(
          <div key={g.id} style={{background:C.white,borderRadius:18,padding:16,marginBottom:16,boxShadow:"0 2px 12px rgba(0,95,115,.07)",border:`1.5px solid ${C.tealLight}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:38,height:38,borderRadius:12,background:C.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{g.emoji}</div><div><div style={{fontSize:13,fontWeight:700,color:C.slate}}>{g.text}</div><div style={{fontSize:11,color:C.gray}}>{g.freq}</div></div></div><div style={{fontSize:11,fontWeight:700,color:C.teal,background:C.tealLight,borderRadius:8,padding:"4px 8px"}}>🔥 {g.streak}</div></div>
            <div style={{display:"flex",gap:6}}>
              {weekDays.map((d,i)=>{const state=checks[g.id][i],future=state===null,isToday=i===today;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div onClick={()=>{if(future)return;setChecks(p=>{const c={...p,[g.id]:[...p[g.id]]};c[g.id][i]=c[g.id][i]===true?false:true;return c;})}} style={{width:30,height:30,borderRadius:"50%",cursor:future?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,background:future?C.grayLight:state===true?C.green:C.coralLight,border:isToday?`2px solid ${C.coral}`:future?`1.5px dashed ${C.gray}`:state===true?`2px solid ${C.greenDark}`:`2px solid #F4A49A`,color:state===true?C.white:state===false?C.rose:C.gray}}>{state===true?"✓":state===false?"✕":""}</div><span style={{fontSize:9,color:isToday?C.coral:C.gray,fontWeight:isToday?700:400}}>{d[0]}</span></div>);})}
            </div>
            <div style={{marginTop:12,padding:"8px 10px",background:C.greenLight,borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,color:C.greenDark}}>{checks[g.id].filter(x=>x===true).length} completions</span><span style={{fontSize:11,fontWeight:700,color:C.greenDark}}>⚡ +{checks[g.id].filter(x=>x===true).length*15} XP</span></div>
          </div>
        ))}
        <div style={{background:C.tealLight,borderRadius:16,padding:14,border:`1.5px solid ${C.green}`}}><div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}><div style={{width:32,height:32,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:700,fontSize:12,flexShrink:0}}>AL</div><div><div style={{fontSize:12,fontWeight:700,color:C.teal}}>Amy (RD)</div></div></div><div style={{fontSize:12,color:C.slate,fontStyle:"italic",lineHeight:1.5}}>"You're doing amazing with your water goal! 💙"</div></div>
        <div style={{height:8}}/>
      </div>
    </div>
  );
}
